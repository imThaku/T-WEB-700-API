import bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import {Crypto} from "./Crypto";

@Entity()
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: "USER"})
  role: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToMany(type => Crypto)
  @JoinTable()
  cryptos: Crypto[];

  async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, 10);
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

}
