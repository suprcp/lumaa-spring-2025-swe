import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  isComplete!: boolean;

  @Column({ name: 'userId', nullable: true })
  userId?: number;

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'userId' })
  user?: User;
}