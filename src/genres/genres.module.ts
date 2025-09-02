import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';
import { GenresRepository } from './genres.repository';
import { Genre } from './entities/genre.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Genre]),
  ],
  providers: [GenresResolver, GenresService, GenresRepository],
})
export class GenresModule {}
