import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { User } from '@entities/user.entity';
import { GetUser } from '@core/decorators';
import { UserDto } from '@models/dto/user/response.dto';
import { UsersService } from '../services';
import type { ChangeUserDto } from '@models/dto/user/change-user-data.dto';
import { Config } from '@core/config';

@ApiTags('User')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Access token',
})
@Controller('user')
export class UserController {
  constructor(private _usersService: UsersService) {}

  @Get()
  @ApiOkResponse({
    description: 'Return authorized user entity',
    type: UserDto,
  })
  findOne(@GetUser('sub') userId: string): Promise<User> {
    return this._usersService.findOneById(userId);
  }
  @Post('changeAvatar')
  @UseInterceptors(FileInterceptor('image', Config.get.MulterConfig()))
  async changeAvatar(
    @GetUser('sub') userId: string,
    @Body() body: any,
    @UploadedFile()
    file?: Express.Multer.File,
  ): Promise<void> {
    const data: ChangeUserDto = {
      image: file?.path || null,
    };
    console.log(data)

    await this._usersService.changeUserData(userId,data);
  }

  @Post('changeAbout')
  async changeAbout(
    @GetUser('sub') userId: string, @Body() changeData: string,): Promise<void> {
    await this._usersService.changeAbout(userId,changeData);
  }

  @Post('changePassword')
  async changePassword(
    @GetUser('sub') userId: string, @Body() changeData: string,): Promise<void> {
    await this._usersService.changePassword(userId,changeData);
  }

}
