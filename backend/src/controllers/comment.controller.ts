import { Controller, Get, HttpCode, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';

import { ControllerBase } from './base.controller'
import { BggService } from '../services/bgg.service'
import { CliOptionService } from '../services/cli-option.service'
import {GetCommentByCid} from '../models/response'

@Controller('comment')
export class CommentController extends ControllerBase {

	constructor(private bggSvc: BggService, cliOpts: CliOptionService) { 
		super(cliOpts)
	}

	@Get(':cid')
	@HttpCode(200)
	public async getCommentByCid(@Param('cid') cid: string): Promise<GetCommentByCid> {
		try {
			const result = await this.bggSvc.selectCommentByCid(cid)
			if (!result)
				throw new NotFoundException({ cid }, `No comment with ${cid} exists`)
			return result
		} catch(error) {
			throw new InternalServerErrorException(error
				, `selectCommentByGid(cid=${cid})`)
		}
	}
}
