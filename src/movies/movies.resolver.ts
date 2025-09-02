import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './schemas/create-movie.input';
import { UpdateMovieInput } from './schemas/update-movie.input';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie)
  async createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return await this.moviesService.create(createMovieInput);
  }

  @Query(() => [Movie], { name: 'movies' })
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Query(() => Movie, { name: 'movie' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.moviesService.findOne(id);
  }

  @Mutation(() => Movie)
  async updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return await this.moviesService.update(updateMovieInput.id, updateMovieInput);
  }

  @Mutation(() => Boolean)
    async removeMovie(@Args('id', { type: () => Int }) id: number) {
    return await this.moviesService.remove(id);
  }
}
