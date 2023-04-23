import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Favorite } from '@entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(@InjectRepository(Favorite) private _favoriteRepository: Repository<Favorite>) {}

  addFavoriteFood(userId: string, foodId: number) {
    const id = Object.values(foodId)[0];
    this._favoriteRepository.save({ foodId: id, userId });
  }
  deleteFavoriteFood(userId: string, foodId: number) {
    const id = Object.values(foodId)[0];
    this._favoriteRepository.delete({ foodId: id, userId });
  }

  findFavorite(userId: string, filter: string, search: string) {
    if (filter === 'all') {
      filter = '';
    }
    console.log(filter)
    console.log(search)

    return this._favoriteRepository.createQueryBuilder('favorite')
    .leftJoinAndSelect('favorite.food', 'food')
    .leftJoinAndSelect('favorite.user', 'user')
    .where('user.id = :id', { id: userId })
    .getMany();

  }
}
