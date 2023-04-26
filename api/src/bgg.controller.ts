import { Controller, Get, HttpCode, InternalServerErrorException, Param, Query } from '@nestjs/common';
import {BggService} from './bgg.service';
import {Game} from './models';

@Controller()
export class BggController {

	constructor(private bggSvc: BggService) { }

	@Get('game/:gameId')
	@HttpCode(200)
	getGameById(@Param('gameId') gameId: string): Promise<Game> {
		try {
			return this.bggSvc.getGame(parseInt(gameId))
		} catch (err) {
			console.error('Error: getGame ', err)
			throw err
		}
	}

	@Get('games')
	@HttpCode(200)
	getGames(@Query('limit') limit = '20', @Query('offset') offset = '0'): Promise<Game[]> {
		try {
			return this.bggSvc.getGames(parseInt(limit), parseInt(offset))
		} catch (err) {
			console.error('Error: getGames ', err)
			throw new InternalServerErrorException(err)
		}
	}

	@Get('comments/:user/user')
	@HttpCode(200)
	getCommentsByUser(@Param('user') user: string, @Query('limit') limit = '20') {
		try {
			return this.bggSvc.findCommentsByUser(user, parseInt(limit))
		} catch (err) {
			console.error('Error: getComments ', err)
			throw new InternalServerErrorException(err)
		}
	}

	@Get('comments/:gameId/game')
	@HttpCode(200)
	getCommentsByGame(@Param('gameId') gameId: string, @Query('limit') limit = '20') {
		try {
			return this.bggSvc.findCommentsByGame(parseInt(gameId), parseInt(limit))
		} catch (err) {
			console.error('Error: getComments ', err)
			throw new InternalServerErrorException(err)
		}
	}
}
