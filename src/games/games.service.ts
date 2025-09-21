import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GamesService {
	constructor(
		@InjectRepository(Game)
		private readonly gameRepository: Repository<Game>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createGameDto: CreateGameDto) {
		const user = await this.userRepository.findOne({ where: { id: createGameDto.userId } });
		if (!user) throw new NotFoundException('User not found');
		const game = this.gameRepository.create({
			...createGameDto,
			user,
		});
		return this.gameRepository.save(game);
	}

	async findAll() {
		return this.gameRepository.find();
	}

	async findOne(id: number) {
		return this.gameRepository.findOne({ where: { id } });
	}

	async update(id: number, updateGameDto: UpdateGameDto) {
		await this.gameRepository.update(id, updateGameDto);
		return this.findOne(id);
	}

	async remove(id: number) {
		const result = await this.gameRepository.delete(id);
		if (result.affected) {
			return { id };
		}
		return null;
	}

	async findByUser(userId: number) {
		return this.gameRepository.find({ where: { user: { id: userId } } });
	}
}
