import { Controller, Get, HttpCode, InternalServerErrorException, Param, Query } from '@nestjs/common';

import {ControllerBase} from './base.controller';

import {BggService} from 'src/services/bgg.service';
import {CliOptionService} from 'src/services/cli-option.service';
import {GetCommentsByGid, GetNumberofCommentsByGid} from 'common/models/response';

@Controller('comments')
export class CommentsController extends ControllerBase {

	constructor(private bggSvc: BggService, cliOpts: CliOptionService) { 
		super(cliOpts)
	}

	@Get('game/:gid')
	@HttpCode(200)
	public async getCommentsByGameId(@Param('gid') i: string,
			@Query('limit') l = '20', @Query('offset') o = '0'): Promise<GetCommentsByGid> {
		const limit = parseInt(l)
		const offset = parseInt(o)
		const gid = parseInt(i)
		try {
			const comments = await this.bggSvc.selectCommentSummaryByGid(gid, limit, offset)
			const total = await this.bggSvc.selectCommentByGidCount(gid)
			return {
				total, limit, offset, gid,
				comments: comments.map(v => ({user: v.user, url: `${this.prefix}/comment/${v.cid}`}))
			} 
		} catch (error) {
			throw new InternalServerErrorException(error
				, `selectCommentByGid(gid=${gid}, limit=${limit}, offset=${offset})`)
		}
	}

	@Get('game/:gid/total')
	@HttpCode(200)
	public async getCommentsByGameIdCount(@Param('gid') i: string): Promise<GetNumberofCommentsByGid> {
		const gid = parseInt(i)
		try {
			const total = await this.bggSvc.selectCommentByGidCount(gid)
			return { total, gid }
		} catch(error) {
			throw new InternalServerErrorException(error
				, `selectCommentByGidCount(gid=${gid})`)
		}
	}

}
