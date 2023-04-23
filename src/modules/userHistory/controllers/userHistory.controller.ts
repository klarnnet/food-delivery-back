import { GetUser } from "@core/decorators";
import { UserHistoryService } from "../services";
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('userHistory')
export class UserHistoryController {
  
  constructor(private _userHistoryService: UserHistoryService) {}

  @Get('findHistory')
  findHistory(@GetUser('sub') userId: string) {
   return this._userHistoryService.findHistory(userId);
 }
 @Post('addHistory')
 addHistory(@GetUser('sub') userId: string,@Body()  info: string ) {
  return this._userHistoryService.addHistory(userId,info);
 }
@Post('changeStatusHistory')
changeStatusHistory(@GetUser('sub') userId: string) {
 return this._userHistoryService.changeStatusHistory(userId);
}
}