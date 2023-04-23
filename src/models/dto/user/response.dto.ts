import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ default: '12357b4c-de42-4d3b-bc64-8d6d700f8dd6' })
  id: string;

  @ApiProperty({ default: 'user@mail.com' })
  email: string;

  @ApiProperty({ default: 'User123' })
  username: string;

  @ApiProperty({ default: 'public/profiles/avatar.jpg' })
  profile: string | null;
}
