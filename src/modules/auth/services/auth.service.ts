import { Injectable } from '@nestjs/common';
import { BadRequestException, ConflictException } from '@nestjs/common/exceptions';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { JwtService } from '@nestjs/jwt';
import type { CreateUserDto } from '@models/dto/user/create.dto';
import type { IResetLink, Token, UserType } from '@models/types';
import { Config } from '@core/config';
import { UsersService } from '@shared/users/services';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/user.entity';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private _usersRepository: Repository<User>,
    private _usersService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserType> {
    const user = await this._usersService.findOneByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...userData } = user;

        return userData;
      }
    }

    return null;
  }

  async login(mail: string): Promise<Token> {
    const { id, email, username } = await this._usersService.findOneByEmail(mail);
    const tokens = await this.getTokens({ id, email, username });

    await this.updateUserRt(id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    const user = await this._usersService.findOneById(userId);

    if (user && user.refreshToken) {
      await this._usersService.deleteRefreshToken(userId);
    } else {
      throw new ForbiddenException();
    }
  }

  async createUser(data: CreateUserDto): Promise<void> {
    const user = await this._usersService.findOneByEmail(data.email);

    if (user) {
      throw new ConflictException('User with such email already exists');
    }

    const hashedPassword = await this.hashData(data.password);

    await this._usersService.create({ ...data, password: hashedPassword });
  }

  async refreshToken(rt: string, userId: string): Promise<Token> {
    const user = await this._usersService.findOneById(userId);

    if (user) {
      const isTokenMatch = await bcrypt.compare(rt, user.refreshToken);

      if (isTokenMatch) {
        const tokens = await this.getTokens({ id: user.id, email: user.email, username: user.username });

        await this.updateUserRt(userId, tokens.refreshToken);

        return tokens;
      }
    }

    throw new ForbiddenException();
  }

  async updateUserRt(userId: string, rt: string): Promise<void> {
    const hashRt = await this.hashData(rt);

    await this._usersService.updateRefreshToken(userId, { refreshToken: hashRt });
  }

  async getTokens(data: UserType): Promise<Token> {
    const payload = { sub: data.id, email: data.email };
    const [atConfig, rtConfig] = [Config.get.AccessTokenOptions, Config.get.RefreshTokenOptions];
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(payload, { secret: atConfig.secret, expiresIn: atConfig.signOptions.expiresIn }),
      this._jwtService.signAsync(payload, { secret: rtConfig.secret, expiresIn: rtConfig.signOptions.expiresIn }),
    ]);

    return { accessToken, refreshToken };
  }

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, Config.get.hashSalt);
  }

  async forgotPassword(email: string): Promise<IResetLink> {
    const e = Object.values(email)[0];
    const user = await this._usersService.findOneByEmail(e);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const token = (await this.getTokens({ id: user.id, email: user.email, username: user.username })).accessToken;
    const url = `http://localhost:3000/reset-password/${token}`;
    return { link: url };
  }
  async changePassword(userId: string, password: string): Promise<void> {
    const newPassword = await this.hashData(Object.values(password)[0]);
    await this._usersRepository.update(userId, { password: newPassword });
  }
}
