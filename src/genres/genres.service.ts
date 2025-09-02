import { Injectable, NotFoundException } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './schemas/create-genre.input';
import { UpdateGenreInput } from './schemas/update-genre.input';

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async create(createGenreInput: CreateGenreInput): Promise<Genre> {
    return this.genresRepository.create(createGenreInput);
  }

  async findAll(): Promise<Genre[]> {
    const genres = await this.genresRepository.findAll();
    if (!genres || genres.length === 0) throw new NotFoundException('No genres found.');
    return genres;
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genresRepository.findOne(id);
    if (!genre) throw new NotFoundException(`Genre with ID ${id} not found.`);
    return genre;
  }

  async update(id: number, updateGenreInput: UpdateGenreInput): Promise<Genre> {
    const updated = await this.genresRepository.update(id, updateGenreInput);
    if (!updated) throw new NotFoundException(`Genre with ID ${id} not found. Unable to update.`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.genresRepository.remove(id);
    if (!deleted) throw new NotFoundException(`Genre with ID ${id} not found. Unable to delete.`);
    return deleted;
  }
}
