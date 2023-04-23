import { FoodController } from './controllers';
import { Module } from '@nestjs/common';
import { FoodService } from './services';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}