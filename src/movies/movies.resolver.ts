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

  @Mutation(() => Movie)
  async addActorsInMovies(
    @Args('movieId', { type: () => Int }) movieId: number,
    @Args('actorsIds', { type: () => [Int] }) actorsIds: number[],
  ) {
    return this.moviesService.addActorsInMovies(movieId, actorsIds);
  }

  @Mutation(() => Movie)
  async removeActorFromMovie(
    @Args('movieId', { type: () => Int }) movieId: number,
    @Args('actorIds', { type: () => Int }) actorIds: number,
  ) {
    return this.moviesService.removeActorFromMovie(movieId, actorIds);
  }

  @Mutation(() => Movie)
  async addGenresInMovies(
    @Args('movieId', { type: () => Int }) movieId: number,
    @Args('genreIds', { type: () => [Int] }) genreIds: number[],
  ) {
    return this.moviesService.addGenresInMovies(movieId, genreIds);
  }
}
