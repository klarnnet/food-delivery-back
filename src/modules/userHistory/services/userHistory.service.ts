import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHistory } from '@entities/history.entity';

@Injectable()
export class UserHistoryService {
  constructor(@InjectRepository(UserHistory) private _userHistoryRepository: Repository<UserHistory>) {}

  findHistory(userId: string) {
    return this._userHistoryRepository.find({
      where: [
        {
          userId: userId,
        },
      ],
      order: {
        timestamp: 'DESC',
      },
    });
  }

  addHistory(userId: string, info: string) {
    const timestamp = new Date();
    const courierId = Object.values(info)[0];
    const addres = Object.values(info)[1];
    const time = Object.values(info)[2];
    const status = 'in progress';
    return this._userHistoryRepository.save({
      courierId: courierId,
      userId: userId,
      timestamp: timestamp,
      adress: addres,
      status: status,
      time:time
    });
  }

  changeStatusHistory(userId: string) {
    const status = 'done'
    return this._userHistoryRepository.update({userId:userId}, {status: status});
  }
}
