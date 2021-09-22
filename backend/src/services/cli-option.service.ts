import * as cli from 'command-line-args'
import { CommandLineOptions, OptionDefinition} from 'command-line-args'

import { Injectable } from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import {NestApplication} from '@nestjs/core';

export const cliOpts: OptionDefinition[] = [
	{ name: 'port', type: Number },
	{ name: 'prefix', type: String },
	{ name: 'cors', type: Boolean },
	{ name: 'dbHost', type: String },
	{ name: 'dbPort', type: Number },
	{ name: 'dbUser', type: String },
	{ name: 'dbPassword', type: String },
	{ name: 'client', type: String },
	{ name: 'version', type: String }
]

export const parseOptions = (opt: OptionDefinition[]) => cli(opt)

@Injectable()
export class CliOptionService {

	options?: CommandLineOptions

	constructor() { 

		const opt = parseOptions(cliOpts)

		if (!opt['port'])
			opt['port'] = parseInt(process.env.PORT) || parseInt(process.env.BGG_PORT) || 3000

		if (!opt['dbHost'])
			opt['dbHost'] = process.env.BGG_DB_HOST || 'localhost'

		if (!opt['dbPort'])
			opt['dbPort'] = parseInt(process.env.BGG_DB_PORT) || 3306

		if (!opt['dbUser'])
			opt['dbUser'] = process.env.BGG_DB_USER || 'fred'

		if (!opt['dbPassword'])
			opt['dbPassword'] = process.env.BGG_DB_PASSWORD || 'fred'

		if (!opt['version'])
			opt['version'] = process.env.BGG_VERSION || 'generic'

		if ((!opt['prefix']) && process.env.BGG_PREFIX)
			opt['prefix'] = process.env.BGG_PREFIX

		if ((!opt['cors']) && process.env.BGG_CORS)
			opt['cors'] = process.env.BGG_CORS

		if ((!opt['client']) && process.env.BGG_CLIENT)
			opt['client'] = process.env.BGG_CLIENT

		this.options = opt
	}

	configure(app: NestExpressApplication) {

		if (this.options['prefix'])
			app.setGlobalPrefix(this.options['prefix'])

		if (this.options['cors'])
			app.enableCors(this.options['cors'])

		app.disable('x-powered-by')
	}
}
