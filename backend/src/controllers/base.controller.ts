import {CliOptionService} from 'src/services/cli-option.service';

export class ControllerBase {

	prefix = ''

	constructor(cliOpts: CliOptionService) { 
		this.prefix = cliOpts.options['prefix'] || ''
	}
}
