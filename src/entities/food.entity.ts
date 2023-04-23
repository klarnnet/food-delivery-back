import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Favorite } from './favorite.entity';

@Entity('food')
export class Food {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Column()
  firstname: string;
  
  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column()
  category: string;

  @Column('float')
  coast: number;

  @Column('float')
  stars: number;

  @Column('float')
  time: number;

  @Column()
  image: string;

  @Column()
  about: string;

  @OneToMany(() => Favorite, favorite => favorite.food)
  foodConnection: Promise<Favorite[]>;
}
