import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers';
import { AuthService } from './services';
import { AtStrategy, LocalStrategy, RtStrategy } from './strategies';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { UsersService } from '@shared/users/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AtStrategy, RtStrategy],
})
export class AuthModule {}
