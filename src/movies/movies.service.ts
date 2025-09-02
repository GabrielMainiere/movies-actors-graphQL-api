import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './schemas/create-movie.input';
import { UpdateMovieInput } from './schemas/update-movie.input';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    return await this.moviesRepository.create(createMovieInput);
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.moviesRepository.findAll();
    if (movies.length === 0) throw new NotFoundException(`No movies in database.`)
    return await this.moviesRepository.findAll();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);
    return movie;
  }

  async update(id: number, updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const movie = await this.moviesRepository.update(id, updateMovieInput);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found. Unable to update.`);
    return movie;
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.moviesRepository.remove(id);
    if (!deleted) throw new NotFoundException(`Movie with ID ${id} not found. Unable to delete.`);
    return deleted;
  }
}