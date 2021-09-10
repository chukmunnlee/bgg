import * as express from 'express'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import {CliOptionService} from './services/cli-option.service';

async function bootstrap() {

	const app = express();
	const nestApp = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(app))

	nestApp.init()

	const cliOptSvc = nestApp.get(CliOptionService);

	nestApp.disable('x-powered-by')
	const port = cliOptSvc.options.port;

	await nestApp.listen(port)

	console.info(`Application started on port ${port} at ${new Date()}`)
}
bootstrap();
