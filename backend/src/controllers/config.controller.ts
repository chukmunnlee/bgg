import { Controller, Get, HttpCode } from '@nestjs/common';
import {GetConfig} from 'common/models/response';
import { CliOptionService } from '../services/cli-option.service'

@Controller('config')
export class ConfigController {

	constructor(private cliOptSvc: CliOptionService) { }

	@Get()
	@HttpCode(200)
	public getConfig(): GetConfig {
		return {
			name: this.cliOptSvc.options['name'], 
			prefix: this.cliOptSvc.options['prefix'] || 'not set',
			cors: this.cliOptSvc.options['cors'] || false,
			client: this.cliOptSvc.options['client'] || 'not set',
			clientRoot: this.cliOptSvc.options['clientRoot'] || 'not set',
			dbHost: this.cliOptSvc.options['dbHost'] || 'not-set',
			dbUser: this.cliOptSvc.options['dbUser'] || 'not-set',
			version: this.cliOptSvc.options['version']
		} as GetConfig
	}

}
