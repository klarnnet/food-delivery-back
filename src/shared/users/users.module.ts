import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UsersService } from './services';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}