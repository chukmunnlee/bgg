import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';

import {BggService} from 'src/services/bgg.service';
import {CliOptionService} from 'src/services/cli-option.service';
import { ControllerBase} from './base.controller'
import {GetGameByGid, InsertGame} from 'common/models/response';
import {Game} from 'common/models/entity';

@Controller('api/game')
export class GameController extends ControllerBase {

	constructor(private bggSvc: BggService, cliOpts: CliOptionService) { 
		super(cliOpts)
	}

	@Get(':gid')
	@HttpCode(200)
	public async getGameById(@Param('gid') gid: number): Promise<GetGameByGid> {
		const game = await this.bggSvc.selectGameByGid(gid)
		if (!game)
			throw new NotFoundException({ gid }, `No game with ${gid} exists`)
		return game
	}

	@Post()
	@HttpCode(201)
	public async insertGame(@Body() game: Game): Promise<InsertGame> {
		const gid = await this.bggSvc.insertGame(game)
		return { gid } as InsertGame
	}
}
