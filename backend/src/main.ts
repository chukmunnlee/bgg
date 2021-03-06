import * as express from 'express'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import {CliOptionService} from './services/cli-option.service';
import {BggService} from './services/bgg.service';
import {createInterceptor, TracingInterceptor} from './services/tracing.interceptor';

async function bootstrap() {

	const app = express();
	const nestApp = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(app))

	nestApp.init()

	const cliOptSvc = nestApp.get(CliOptionService);
	const bggSvc = nestApp.get(BggService);
	bggSvc.onApplicationBootstrap()

	cliOptSvc.configure(nestApp)

	const port = cliOptSvc.options.port;

	nestApp.useGlobalInterceptors(createInterceptor(cliOptSvc.options.name || 'not-set'));

	createInterceptor('abc')

	bggSvc.ping()
		.then(() => nestApp.listen(port))
		.then(() => {
			console.info(`Application started on port ${port} at ${new Date()}`)
		})
		.catch(error => {
			console.error('Cannot start application\n', error)
		})

}
bootstrap();
