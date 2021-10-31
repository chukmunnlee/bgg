import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { Counter } from 'prom-client'

import {BggService} from 'src/services/bgg.service';
import {CliOptionService} from 'src/services/cli-option.service';
import { ControllerBase} from './base.controller'
import {GetGameByGid, InsertGame} from 'common/models/response';
import {Game} from 'common/models/entity';
import {InjectMetric} from '@willsoto/nestjs-prometheus';
import {METRIC_API_INVOCATIONS} from 'src/utils';

@Controller('api/game')
export class GameController extends ControllerBase {

	constructor(private bggSvc: BggService,  
			@InjectMetric(METRIC_API_INVOCATIONS) private metricApiInvoke: Counter<string>,
			cliOpts: CliOptionService) { 
		super(cliOpts)
	}

	@Get(':gid')
	@HttpCode(200)
	public async getGameById(@Param('gid') gid: number): Promise<GetGameByGid> {
		const game = await this.bggSvc.selectGameByGid(gid)
		const labels = { 
			instanceName: this.cliOpt.options['name'],
			path: `${this.prefix}/api/game/${gid}`,
			method: 'GET',
			code: 200
		}
		if (!game) {
			labels.code = 404
			this.metricApiInvoke.inc(labels)
			throw new NotFoundException({ gid }, `No game with ${gid} exists`)
		}
		this.metricApiInvoke.inc(labels)
		return game
	}

	@Post()
	@HttpCode(201)
	public async insertGame(@Body() game: Game): Promise<InsertGame> {
		const gid = await this.bggSvc.insertGame(game)
		const labels = { 
			instanceName: this.cliOpt.options['name'],
			path: `${this.prefix}/api/game`,
			method: 'POST',
			code: 201
		}
		this.metricApiInvoke.inc(labels)
		return { gid } as InsertGame
	}
}
