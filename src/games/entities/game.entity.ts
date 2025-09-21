import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	genre: string;

	@Column({ nullable: true })
	description?: string;

	@ManyToOne(() => User, user => user.games, { eager: true })
	user: User;
}