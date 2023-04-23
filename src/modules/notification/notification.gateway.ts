import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Config } from '@core/config';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from '@entities/courier.entity';
import type { Repository } from 'typeorm';
import { UserHistory } from '@entities/history.entity';

@WebSocketGateway(Config.get.GatewayOptions)
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    @InjectRepository(Courier) private _notificationRepository: Repository<Courier>,
  ) {}
  handleDisconnect(client: Socket) {
    console.log('disconect')
  }

  handleConnection(client: Socket): void {
    client.emit('conecting');


  }

  @SubscribeMessage('Notification')
  async handleNewCouirer(
    @ConnectedSocket() client: Socket,
  ) {
    const randomDelay = Math.floor(Math.random() * 10) + 10; 
    const randomCourier = await this._notificationRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
      const notificationResponse = {
        courier: randomCourier,
        delay: randomDelay + ' seconds',
      };
    client.emit('Notification', notificationResponse);
  
    setTimeout(() => {
      const delayedResponse = 'your order is done'
      client.emit('DelayedNotification', delayedResponse);
    }, randomDelay * 1000); 
  }

}
