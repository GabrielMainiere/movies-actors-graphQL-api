import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorsRepository } from './actors.repository';
import { Actor } from './entities/actor.entity';
import { CreateActorInput } from './schemas/create-actor.input';
import { UpdateActorInput } from './schemas/update-actor.input';

@Injectable()
export class ActorsService {
  constructor(private readonly actorsRepository: ActorsRepository) {}

  async create(createActorInput: CreateActorInput): Promise<Actor> {
    return await this.actorsRepository.create(createActorInput);
  }

  async findAll(): Promise<Actor[]> {
    const actors = await this.actorsRepository.findAll();
    if (!actors.length) throw new NotFoundException(`No actors found`);
    return actors;
  }

  async findOne(id: number): Promise<Actor> {
    const actor = await this.actorsRepository.findOne(id);
    if (!actor) throw new NotFoundException(`Actor with ID ${id} not found`);
    return actor;
  }

  async update(id: number, updateActorInput: UpdateActorInput): Promise<Actor> {
    const actor = await this.actorsRepository.update(id, updateActorInput);
    if (!actor) throw new NotFoundException(`Actor with ID ${id} not found. Unable to update.`);
    return actor;
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.actorsRepository.remove(id);
    if (!deleted) throw new NotFoundException(`Actor with ID ${id} not found. Unable to delete.`);
    return deleted;
  }
}
