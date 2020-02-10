import bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import {User} from "./User";

@Entity()
@Unique(['IDs'])
export class Crypto {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  IDs: string;

  @Column({default: 0,
  type:"float"})
  currentPrice: number;

  @Column({default: 0,
    type:"float"})
  openingPrice: number;

  @Column({default: 0,
    type:"float"})
  lowestPrice: number;

  @Column({default: 0,
    type:"float"})
  highPrice: number;

  @Column({default: 0,
    type:"float"})
  change: number;

  @Column()
  URL: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}
