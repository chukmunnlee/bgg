import {CliOptionService} from 'src/services/cli-option.service';

export class ControllerBase {

	cliOpt: CliOptionService = null
	prefix = ''

	constructor(cliOpts: CliOptionService) { 
		this.cliOpt = cliOpts
		this.prefix = cliOpts.options['prefix'] || ''
	}
}
