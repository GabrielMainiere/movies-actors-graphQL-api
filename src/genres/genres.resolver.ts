import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './schemas/create-genre.input';
import { UpdateGenreInput } from './schemas/update-genre.input';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation(() => Genre)
  async createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return await this.genresService.create(createGenreInput);
  }

  @Query(() => [Genre], { name: 'genres' })
  async findAll() {
    return await this.genresService.findAll();
  }

  @Query(() => Genre, { name: 'genre' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.genresService.findOne(id);
  }

  @Mutation(() => Genre)
  async updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return await this.genresService.update(updateGenreInput.id, updateGenreInput);
  }

  @Mutation(() => Boolean)
  async removeGenre(@Args('id', { type: () => Int }) id: number) {
    return await this.genresService.remove(id);
  }
}
