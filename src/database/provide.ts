import { Sequelize } from 'sequelize-typescript';
import { Actor } from 'src/actors/entities/actor.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { MovieActors } from 'src/movies/entities/movie_actor.entity';
import { MovieGenres } from 'src/movies/entities/movie_genres.entity';

const dotenv = require('dotenv');
dotenv.config();

export const provide = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER || "postgres",
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || "postgres",
      });

      sequelize.addModels([Actor, Genre, Movie, MovieActors, MovieGenres]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
