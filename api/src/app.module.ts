import { Module } from '@nestjs/common';
import { BggController } from './bgg.controller';
import { BggService } from './bgg.service';
import { InfoController } from './info.controller';

@Module({
  imports: [],
  controllers: [ BggController, InfoController ],
  providers: [ BggService ],
})
export class AppModule {}
