import { NotificationController } from './controllers';
import { Module } from '@nestjs/common';
import { NotificationService } from './services';
import { NotificationGateway } from './notification.gateway';

@Module({
  providers: [NotificationService,NotificationGateway],
  controllers: [NotificationController],

})
export class NotificationModule {}