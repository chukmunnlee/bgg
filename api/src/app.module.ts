import { Module } from '@nestjs/common';
import { BggController } from './bgg.controller';
import { BggService } from './bgg.service';

@Module({
  imports: [],
  controllers: [ BggController ],
  providers: [ BggService ],
})
export class AppModule {}
