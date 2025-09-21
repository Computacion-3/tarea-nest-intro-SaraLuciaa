import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Post()
	create(@Body() createGameDto: CreateGameDto) {
		return this.gamesService.create(createGameDto);
	}

	@Get()
	findAll() {
		return this.gamesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.gamesService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() updateGameDto: UpdateGameDto) {
		return this.gamesService.update(id, updateGameDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.gamesService.remove(id);
	}

	@Get('user/:userId')
	findByUser(@Param('userId') userId: number) {
		return this.gamesService.findByUser(userId);
	}
}
