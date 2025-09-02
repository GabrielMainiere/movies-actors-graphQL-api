import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './schemas/create-genre.input';
import { UpdateGenreInput } from './schemas/update-genre.input';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class GenresRepository {
  constructor(
    @InjectModel(Genre)
    private readonly genreModel: typeof Genre,
  ) {}

  async create(createGenreInput: CreateGenreInput): Promise<Genre> {
    return await this.genreModel.create(createGenreInput as CreationAttributes<Genre>);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreModel.findAll();
  }

  async findOne(id: number): Promise<Genre | null> {
    return await this.genreModel.findByPk(id);
  }

  async update(id: number, updateGenreInput: UpdateGenreInput): Promise<Genre | null> {
    const genre = await this.genreModel.findByPk(id);
    if (!genre) return null;
    return genre.update(updateGenreInput);
  }

  async remove(id: number): Promise<boolean> {
    const genre = await this.genreModel.findByPk(id);
    if (!genre) return false;
    await genre.destroy();
    return true;
  }
}
