import { BadRequestException, Controller, Get, HttpCode, InternalServerErrorException, Query } from '@nestjs/common';
import {InjectMetric} from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client'

import {BggService} from 'src/services/bgg.service';
import {CliOptionService} from 'src/services/cli-option.service';
import {ControllerBase} from './base.controller';

import { GetGame, GetGames, GetNumberOfGames } from 'common/models/response'
import {METRIC_BGG_API_REQUEST} from 'src/utils';

@Controller('api/games')
export class GamesController extends ControllerBase {

	constructor(private bggSvc: BggService,
			@InjectMetric(METRIC_BGG_API_REQUEST) private metricApiInvoke: Counter<string>,
			cliOpts: CliOptionService) { 
		super(cliOpts)
	}

	@Get('search')
	@HttpCode(200)
	public async getGamesByName(@Query('q') q: string, @Query('limit') l = '20'
			, @Query('offset') o = '0'): Promise<GetGames> {

		const limit = parseInt(l)
		const offset = parseInt(o)

		const labels = { 
			instanceName: this.cliOpt.options['name'],
			path: `${this.prefix}/api/game/search`,
			method: 'GET',
			code: 200
		}

		if (!q) {
			labels.code = 400
			this.metricApiInvoke.inc(labels)
			throw new BadRequestException({ error: 'Missing query string q' }, 'Missing search parameter q')
		}

		try {
			const result = await this.bggSvc.selectGamesByName(q, limit, offset)
			const total = await this.bggSvc.seletGamesCountByName(q);
			return {
				games: result.map(v => ({ name: v.name, url: `/game/${v.gid}` } as GetGame)),
				offset, limit, total
			}
		} catch (error) {
			labels.code = 500
			throw new InternalServerErrorException(error
				, `selectGameSummary(limit=${limit}, offset=${offset})`)
		} finally {
			this.metricApiInvoke.inc(labels)
		}
	}

	@Get()
	@HttpCode(200)
	public async getGames(@Query('limit') l = '20', @Query('offset') o = '0'): Promise<GetGames> {
		const offset = parseInt(o)
		const limit = parseInt(l)
		const labels = { 
			instanceName: this.cliOpt.options['name'],
			path: `${this.prefix}/api/game`,
			method: 'GET',
			code: 200
		}
		try {
			const result = await this.bggSvc.selectGameSummary(limit, offset)
			const total = await this.bggSvc.seletGamesCount();
			return {
				games: result.map(v => ({ name: v.name, url: `/game/${v.gid}` })),
				offset, limit, total
			}
		} catch (error) {
			labels.code = 500
			throw new InternalServerErrorException(error
				, `selectGameSummary(limit=${limit}, offset=${offset})`)
		} finally {
			this.metricApiInvoke.inc(labels)
		}
	}

	@Get('total')
	@HttpCode(200)
	public async getNumberOfGames(): Promise<GetNumberOfGames> {
		const labels = { 
			instanceName: this.cliOpt.options['name'],
			path: `${this.prefix}/api/game/total`,
			method: 'GET',
			code: 200
		}
		try {
			const total = await this.bggSvc.seletGamesCount();
			return { total }
		} catch (error) {
			labels.code = 500
			throw new InternalServerErrorException(error, `selectGameCount()`)
		} finally {
			this.metricApiInvoke.inc(labels)
		}
	}
}
