import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('promoCode')
export class PromoCode {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  percent: number;
}