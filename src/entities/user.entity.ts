import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Favorite } from './favorite.entity';
import { UserHistory } from './history.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ default: null })
  refreshToken: string;

  @Column({ default: null })
  creditCard: string;

  @Column({ default: null })
  image: string;

  @OneToMany(() => Favorite, favorite => favorite.user)
  userConnection: Promise<Favorite[]>;

  @OneToMany(() => UserHistory, userHistory => userHistory.user)
  userHistoryConnection: Promise<UserHistory[]>;
}
