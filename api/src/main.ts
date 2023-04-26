import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'

import * as morgan from 'morgan'

import { AppModule } from './app.module';
import { env } from './utils'

async function bootstrap() {

	const PORT = parseInt(env('PORT', 3000))

	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.enableCors()
	app.setGlobalPrefix("/api")
	app.disable('x-powered-by')

	app.use(morgan('common'))

	app.listen(PORT)
		.then(() => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})
		.catch(error => {
			console.error('Error: ', error)
		})
}

bootstrap();
