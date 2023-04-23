import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from './food.entity';
import { User } from './user.entity';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ManyToOne(() => Food, food => food.foodConnection, { cascade: true, eager: true })
  @JoinColumn({ name: 'foodId' })
  food: Promise<Food>;
  @Column() public foodId: number;

  @ManyToOne(() => User, user => user.userConnection, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;
  @Column() public userId: string;
}
