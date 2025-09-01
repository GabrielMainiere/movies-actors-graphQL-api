import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsResolver } from './actors.resolver';

@Module({
  providers: [ActorsResolver, ActorsService],
})
export class ActorsModule {}
