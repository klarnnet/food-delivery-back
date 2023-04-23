import { FavoriteController } from './controllers';
import { Module } from '@nestjs/common';
import { FavoriteService } from './services';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}