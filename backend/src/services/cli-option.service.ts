import * as cli from 'command-line-args'
import { CommandLineOptions, OptionDefinition} from 'command-line-args'

import { Injectable } from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';

export const cliOpts: OptionDefinition[] = [
	{ name: 'port', type: Number },
	{ name: 'prefix', type: String },
	{ name: 'cors', type: Boolean },
	{ name: 'dbHost', type: String },
	{ name: 'dbPort', type: Number },
	{ name: 'dbUser', type: String },
	{ name: 'dbPassword', type: String },
]

@Injectable()
export class CliOptionService {

	options?: CommandLineOptions

	constructor() { 

		const opt = cli(cliOpts)

		if (!opt['port'])
			opt['port'] = parseInt(process.env.PORT) || 3000

		if (!opt['dbHost'])
			opt['dbHost'] = process.env.DB_HOST || 'localhost'

		if (!opt['dbPort'])
			opt['dbPort'] = parseInt(process.env.DB_PORT) || 3306

		if (!opt['dbUser'])
			opt['dbUser'] = process.env.DB_USER || 'fred'

		if (!opt['dbPassword'])
			opt['dbPassword'] = process.env.DB_PASSWORD || 'fred'

		this.options = opt
	}

	configure(app: NestExpressApplication) {
	}
}
