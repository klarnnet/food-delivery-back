import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserHistory } from './history.entity';


@Entity('courier')
export class Courier {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @Column()
  phone: string;

  @OneToMany(() => UserHistory, userHistory => userHistory.courier)
  courierConnection: Promise<UserHistory[]>;
}