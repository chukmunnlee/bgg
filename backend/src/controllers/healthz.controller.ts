import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('healthz')
export class HealthzController {

	@Get()
	@HttpCode(200)
	public getHealthz() {
		return { timestamp: (new Date()).getTime() }
	}
}
