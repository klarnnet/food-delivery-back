import { ApiProperty } from '@nestjs/swagger';

import type { User } from '@entities/user.entity';

import { UserDto } from './response.dto';

export class UsersDto {
  @ApiProperty({ type: Number, default: 1 })
  page: number;

  @ApiProperty({ type: Number, default: 1 })
  pages: number;

  @ApiProperty({ type: Number, default: 1 })
  total: number;

  @ApiProperty({ type: UserDto, isArray: true })
  users: User[];
}
