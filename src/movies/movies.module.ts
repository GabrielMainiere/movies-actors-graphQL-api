import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { MoviesRepository } from './movies.repository';
import { Movie } from './entities/movie.entity';
import { MovieActors } from './entities/movie_actor.entity';
import { MovieGenres } from './entities/movie_genres.entity';

@Module({
  imports: [SequelizeModule.forFeature([Movie, MovieActors, MovieGenres])],
  providers: [MoviesService, MoviesResolver, MoviesRepository],
})
export class MoviesModule {}