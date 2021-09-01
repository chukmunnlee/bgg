import { Controller, Get, InternalServerErrorException, Param, Query } from '@nestjs/common';

import {ControllerBase} from './base.controller';

import {BggService} from 'src/services/bgg.service';
import {CliOptionService} from 'src/services/cli-option.service';
import {GetCommentsByGid} from 'src/models/response';

@Controller('comment')
export class CommentController extends ControllerBase {

	constructor(private bggSvc: BggService, private cliOpts: CliOptionService) { 
		super(cliOpts)
	}

	@Get('game/:gid')
	public async getCommentsByGameId(@Param('gid') i: string,
			@Query('limit') l = '20', @Query('offset') o = '0'): Promise<GetCommentsByGid> {
		const limit = parseInt(l)
		const offset = parseInt(o)
		const gid = parseInt(i)
		try {
			const comments = await this.bggSvc.selectCommentByGid(gid, limit, offset)
			const total = await this.bggSvc.selectCommentByGidCount(gid)
			return {
				comments, total, limit, offset
			} 
		} catch (error) {
			throw new InternalServerErrorException(error
				, `selectCommentByGid(gid=${gid}, limit=${limit}, offset=${offset})`)
		}
	}

}
