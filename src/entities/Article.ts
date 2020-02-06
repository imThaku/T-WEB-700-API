import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class Article {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column({nullable: true})
  URL: string;

  @Column({nullable: true})
  author: string;

  @Column({nullable: true})
  content: string;

  @Column({nullable: true})
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}
