import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GetUser, Public } from '@core/decorators';
import { LocalAuthGuard } from '@core/guards/local.guard';
import { RtAuthGuard } from '@core/guards/refresh-jwt.guard';
import { CreateUserDto } from '@models/dto/user/create.dto';
import { LoginUserDto } from '@models/dto/user/login.dto';
import { IResetLink, Token } from '@models/types';
import { AuthService } from '../services';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'User successfully created',
  })
  @ApiBadRequestResponse({ description: 'Returns object with error description when credentials are invalid' })
  @ApiConflictResponse({ description: 'Throws if user already exists' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this._authService.createUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Returns access and refresh tokens',
    type: Token,
  })
  @ApiUnauthorizedResponse({ description: 'Returns object with error description when credentials are invalid' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
    return this._authService.login(loginUserDto.email);
  }

  @Public()
  @Post('forgotPassword')
   async forgotPassword(@Body() email: string): Promise<IResetLink> {
    return this._authService.forgotPassword(email);
  }

  @Post('changePassword')
   async changePassword(@GetUser('sub') userId: string, @Body() password:string): Promise<void> {
    return this._authService.changePassword(userId,password );
  }



  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Returned when user was successfully signed out',
  })
  @ApiUnauthorizedResponse({ description: 'Throws when access token is not provided, expired or not valid' })
  async logout(@GetUser('sub') userId: string): Promise<void> {
    await this._authService.logout(userId);
  }

  @Public()
  @UseGuards(RtAuthGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Refresh token',
  })
  @ApiOkResponse({
    description: 'Returns updated access and refresh tokens',
    type: Token,
  })
  @ApiUnauthorizedResponse({
    description: 'Throws when refresh token is expired or not valid',
  })
  @Post('refresh')
  async refresh(@GetUser('sub') userId: string, @GetUser('refreshToken') rt: string): Promise<Token> {
    return this._authService.refreshToken(rt, userId);
  }
}
