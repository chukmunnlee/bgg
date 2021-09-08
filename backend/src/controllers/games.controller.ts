import { BadRequestException, Controller, Get, HttpCode, InternalServerErrorException, Query } from '@nestjs/common';

import {BggService} from 'src/services/bgg.service';
import {CliOptionService} from 'src/services/cli-option.service';
import {ControllerBase} from './base.controller';

import { GetGame, GetGames, GetNumberOfGames } from 'common/models/response'

@Controller('games')
export class GamesController extends ControllerBase {

	constructor(private bggSvc: BggService, cliOpts: CliOptionService) { 
		super(cliOpts)
	}

	@Get('search')
	@HttpCode(200)
	public async getGamesByName(@Query('q') q: string, @Query('limit') l = '20'
			, @Query('offset') o = '0'): Promise<GetGames> {
		const offset = parseInt(o)
		const limit = parseInt(l)
		if (!q)
			throw new BadRequestException({ error: 'Missing query string q' }, 'Missing search parameter q')

		try {
			const result = await this.bggSvc.selectGamesByName(q, limit, offset)
			const total = await this.bggSvc.seletGameCount();
			return {
				games: result.map(v => ({ name: v.name, url: `${this.prefix}/game/${v.gid}` } as GetGame)),
				offset, limit, total
			}

		} catch (error) {
			throw new InternalServerErrorException(error
				, `selectGameSummary(limit=${limit}, offset=${offset})`)
		}
	}

	@Get()
	@HttpCode(200)
	public async getGames(@Query('limit') l = '20', @Query('offset') o = '0'): Promise<GetGames> {
		const offset = parseInt(o)
		const limit = parseInt(l)
		try {
			const result = await this.bggSvc.selectGameSummary(limit, offset)
			const total = await this.bggSvc.seletGameCount();
			return {
				games: result.map(v => ({ name: v.name, url: `${this.prefix}/game/${v.gid}` })),
				offset, limit, total
			}

		} catch (error) {
			throw new InternalServerErrorException(error
				, `selectGameSummary(limit=${limit}, offset=${offset})`)
		}
	}

	@Get('total')
	@HttpCode(200)
	public async getNumberOfGames(): Promise<GetNumberOfGames> {
		try {
			const total = await this.bggSvc.seletGameCount();
			return { total }
		} catch (error) {
			throw new InternalServerErrorException(error, `selectGameCount()`)
		}
	}
}
