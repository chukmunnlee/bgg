import { Controller, Get, HttpCode, NotFoundException, Param } from '@nestjs/common';

import {BggService} from 'src/services/bgg.service';
import {CliOptionService} from 'src/services/cli-option.service';
import { ControllerBase} from './base.controller'
import {GetGameByGid} from 'src/models/response';

@Controller('game')
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
}
