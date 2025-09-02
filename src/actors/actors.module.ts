import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsResolver } from './actors.resolver';
import { ActorsRepository } from './actors.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Actor } from './entities/actor.entity';

@Module({
  imports: [
      SequelizeModule.forFeature([Actor]),
    ],
  providers: [ActorsResolver, ActorsService, ActorsRepository],
})
export class ActorsModule {}
