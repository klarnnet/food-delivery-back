import { FoodService } from './../services/food.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('food')
export class FoodController {
  
  constructor(private _foodService: FoodService) {}

  @Get('filter')
   filterFood( @Query('filter') filter:string,@Query('search') search:string) {
    return this._foodService.filterFood(filter,search);
  }

  @Get('getPromoCode')
  checkPromoCode(@Query('code') code:string) {
    console.log(code)
    return this._foodService.checkPromoCode(code);
 }

}