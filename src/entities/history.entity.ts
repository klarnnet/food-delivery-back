import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Courier } from './courier.entity';

@Entity('userHistory')
export class UserHistory {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ default: 'in progress' })
  status: string;

  @Column({ default: 'Minsk' })
  adress: string;


  @Column()
  timestamp: Date;

  @Column()
  time: string;

  @ManyToOne(() => Courier, courier => courier.courierConnection, { cascade: true, eager: true })
  @JoinColumn({ name: 'courierId' })
  courier: Promise<Courier>;
  @Column() public courierId: string;

  @ManyToOne(() => User, user => user.userHistoryConnection, { cascade: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;
  @Column() public userId: string;
}