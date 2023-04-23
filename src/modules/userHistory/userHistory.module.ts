import { UserHistoryController } from './controllers';
import { Module } from '@nestjs/common';
import { UserHistoryService } from './services';

@Module({
  controllers: [UserHistoryController],
  providers: [UserHistoryService],
  exports:[UserHistoryService]
})
export class UserHistoryModule {}