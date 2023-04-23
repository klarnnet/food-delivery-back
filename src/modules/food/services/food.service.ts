import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Food } from '@entities/food.entity';
import { PromoCode } from '@entities/promoCode.entity';

@Injectable()
export class FoodService {
  constructor(@InjectRepository(Food) private _foodRepository: Repository<Food>,
  @InjectRepository(PromoCode) private _promoCodeRepository: Repository<PromoCode>) {}

  filterFood(filter: string, search: string) {
    if (filter === 'all') {
      filter = '';
    }
    return this._foodRepository.find({
      where: [
        {
          category: filter,
          firstname: ILike(`%${search}%`),
        },
        {
          lastname: Like(`%${filter}%`),
          firstname: ILike(`%${search}%`),
        },
      ],
    });
  }

  checkPromoCode(code: string) {
    console.log(code)
    return this._promoCodeRepository.find({where: [{name: ILike(`%${code}%`),},],});}

}
