import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './entities/movie.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { MovieActors } from './entities/movie_actor.entity';
import { MovieGenres } from './entities/movie_genres.entity';
import { CreateMovieInput } from './schemas/create-movie.input';
import { UpdateMovieInput } from './schemas/update-movie.input';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectModel(Movie)
    private readonly movieModel: typeof Movie,
    @InjectModel(MovieActors)
    private readonly movieActorsModel: typeof MovieActors,
    @InjectModel(MovieGenres)
    private readonly movieGenresModel: typeof MovieGenres,
  ) {}

  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    const { name, synopsis, duration } = createMovieInput;
    return this.movieModel.create({ name, synopsis, duration });
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.findAll({
      include: [{ model: Actor }, { model: Genre }],
    });
  }

  async findOne(id: number): Promise<Movie | null> {
    return this.movieModel.findByPk(id, {
      include: [{ model: Actor }, { model: Genre }],
    });
  }

  async update(id: number, updateMovieInput: UpdateMovieInput): Promise<Movie | null> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) return null;
    const { name, synopsis, duration } = updateMovieInput;
    return movie.update({
      name: name ?? movie.name,
      synopsis: synopsis ?? movie.synopsis,
      duration: duration ?? movie.duration,
    });
  }

  async remove(id: number): Promise<boolean> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) return false;
    await movie.destroy();
    return true;
  }
}