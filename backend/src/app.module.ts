import * as morgan from 'morgan';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthzController } from './controllers/healthz.controller';
import { BggService } from './services/bgg.service';
import { CliOptionService } from './services/cli-option.service';
import { GameController } from './controllers/game.controller';
import { GamesController } from './controllers/games.controller';
import { CommentController } from './controllers/comment.controller';

@Module({
	imports: [],
	controllers: [ HealthzController, GameController, GamesController, CommentController],
	providers: [BggService, CliOptionService],
})
export class AppModule implements NestModule {

	configure(cons: MiddlewareConsumer) {
		cons.apply(morgan('common')).forRoutes('/')
	}
}
