import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  code: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
