import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActorsModule } from './actors/actors.module';
import { GenresModule } from './genres/genres.module';
import { MoviesModule } from './movies/movies.module';
import { Actor } from './actors/entities/actor.entity';
import { Genre } from './genres/entities/genre.entity';
import { Movie } from './movies/entities/movie.entity';
import { MovieActors } from './movies/entities/movie_actor.entity';
import { MovieGenres } from './movies/entities/movie_genres.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'postgres',
      models: [Actor, Genre, Movie, MovieActors, MovieGenres],
      autoLoadModels: true,
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),

    ActorsModule,
    GenresModule,
    MoviesModule,
  ],
})
export class AppModule {}
