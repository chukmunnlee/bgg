import { Controller, Get, HttpCode, InternalServerErrorException } from '@nestjs/common';
import {BggService} from './bgg.service';
import {Version} from './models';

@Controller()
export class InfoController {

	constructor(private bggSvc: BggService) { }

	@Get('health')
	@HttpCode(200)
	getHealth(): Promise<any> {
		try {
			return this.bggSvc.check()
		} catch (err) {
			throw new InternalServerErrorException(err)
		}
	}

	@Get('version')
	getVersion() {
		return { version: 'v0.1' } as Version
	}
}
