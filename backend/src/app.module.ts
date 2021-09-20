import * as morgan from 'morgan';

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PostGameSchema } from 'common/models/schemas'

import { HealthzController } from './controllers/healthz.controller';
import { BggService } from './services/bgg.service';
import { CliOptionService, cliOpts, parseOptions } from './services/cli-option.service';
import { GameController } from './controllers/game.controller';
import { GamesController } from './controllers/games.controller';
import { CommentsController } from './controllers/comments.controller';
import { CommentController } from './controllers/comment.controller';
import { ConfigController } from './controllers/config.controller';
import {createJSONValidator} from './middlewares/validate-json-input';
import {Game} from 'common/models/entity';
import {JSONSchemaType} from 'ajv';

@Module({
	imports: [
		import('@nestjs/serve-static').then(m => {
			const opt = parseOptions(cliOpts)
			if (opt['client'])
				return m.ServeStaticModule.forRoot({
					rootPath: opt['client'],
					serveRoot: opt['prefix'] || ''
			})
			return m.ServeStaticModule.forRoot()
		})
	],
	controllers: [ HealthzController, GameController, GamesController, CommentsController, CommentController, ConfigController],
	providers: [BggService, CliOptionService],
})
export class AppModule implements NestModule {

	configure(cons: MiddlewareConsumer) {
		cons
			.apply(morgan('common')).forRoutes('/')
			//@ts-ignore
			.apply(createJSONValidator(PostGameSchema as JSONSchemaType<Game>))
					.forRoutes({ path: 'game', method: RequestMethod.POST })
	}
}
