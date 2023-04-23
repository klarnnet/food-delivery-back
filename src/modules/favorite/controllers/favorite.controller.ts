import { GetUser } from "@core/decorators";
import { FavoriteService } from "../services";
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('favorite')
export class FavoriteController {
  
  constructor(private _favoriteService: FavoriteService) {}

  @Post('add')
  addFavoriteFood(@GetUser('sub') userId: string, @Body() foodId: number) {
    return this._favoriteService.addFavoriteFood(userId,foodId);
  }

  @Post('delete')
  deleteFavoriteFood(@GetUser('sub') userId: string, @Body() foodId: number) {
    return this._favoriteService.deleteFavoriteFood(userId,foodId);
  }

  @Get('findFavorite')
  findFavorite(@GetUser('sub') userId: string,@Query('filter') filter:string,@Query('search') search:string) {
   return this._favoriteService.findFavorite(userId,filter,search);
 }
}