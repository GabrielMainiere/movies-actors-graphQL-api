import { Injectable } from '@nestjs/common';
import { CreateGenreInput } from './schemas/create-genre.input';
import { UpdateGenreInput } from './schemas/update-genre.input';

@Injectable()
export class GenresService {
  create(createGenreInput: CreateGenreInput) {
    return 'This action adds a new genre';
  }

  findAll() {
    return `This action returns all genres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreInput: UpdateGenreInput) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
