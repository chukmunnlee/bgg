import { Controller, Get, HttpCode, InternalServerErrorException, Param, Query } from '@nestjs/common';
import {BggService} from './bgg.service';
import {Game} from './models';

@Controller()
export class BggController {

	constructor(private bggSvc: BggService) { }

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
}
