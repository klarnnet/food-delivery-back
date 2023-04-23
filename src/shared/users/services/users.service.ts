import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import type { CreateUserDto } from '@models/dto/user/create.dto';
import { User } from '@entities/user.entity';
import type { ChangeUserDto } from '@models/dto/user/change-user-data.dto';
import { Config } from '@core/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _usersRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User> {
    return this._usersRepository.findOne({
      where: { id },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this._usersRepository.save({ ...data });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this._usersRepository.findOneBy({ email });
  }

  async findManyById(ids: string[]): Promise<User[]> {
    return this._usersRepository.find({
      where: {
        id: In(ids),
      },
    });
  }


  async updateRefreshToken(id: string, data: any): Promise<void> {
    this._usersRepository.update(id, data);
  }

  async deleteRefreshToken(id: string): Promise<void> {
    this._usersRepository.update(id, { refreshToken: null });
  }

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, Config.get.hashSalt);
  }
  
  async changeUserData(userId:string, changeUserDto:ChangeUserDto): Promise<void> {

    await this._usersRepository.update(userId,{
      image: changeUserDto.image,

    });
  }

  async changeAbout(userId:string, changeUserDto:string): Promise<void> {
    const username = Object.values(changeUserDto)[0];
    const email = Object.values(changeUserDto)[1];
   
    console.log(username)
    await this._usersRepository.update(userId,{
      username: username,
      email: email,

    });
  }

  async changePassword(userId:string, changeUserDto:string): Promise<void> {
    const password = Object.values(changeUserDto)[0];
    const changePassword = Object.values(changeUserDto)[1];

    const user = await this._usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }
    console.log(password)
    const userChangePassword = await this.hashData(changePassword);
    await this._usersRepository.update(userId,{
      password: userChangePassword,

    });
  }
}
