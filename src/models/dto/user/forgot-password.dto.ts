import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail({})
  email: string;
}