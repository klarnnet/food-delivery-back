import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty({ type: String })
  accessToken: string;

  @ApiProperty({ type: String })
  refreshToken: string;
}
