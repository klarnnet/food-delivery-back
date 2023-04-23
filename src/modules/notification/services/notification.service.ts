import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';

import { Courier } from '@entities/courier.entity';

@Injectable()
export class NotificationService {
  constructor(@InjectRepository(Courier) private _notificationRepository: Repository<Courier>) {}

async getCourier(){
    return await this._notificationRepository
    .createQueryBuilder('courier')
    .orderBy('RANDOM()')
    .getOne();
  }
   addInHistory(userId: string,foodId: number){
    return this._notificationRepository.find({where: [{id:userId}]})
  }
}
