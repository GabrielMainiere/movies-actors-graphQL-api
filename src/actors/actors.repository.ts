import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Actor } from './entities/actor.entity';
import { CreateActorInput } from './schemas/create-actor.input';
import { UpdateActorInput } from './schemas/update-actor.input';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ActorsRepository {
  constructor(
    @InjectModel(Actor)
    private readonly actorModel: typeof Actor,
  ) {}

  async create(createActorInput: CreateActorInput): Promise<Actor> {
    return await this.actorModel.create(createActorInput as CreationAttributes<Actor>);
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorModel.findAll();
  }

  async findOne(id: number): Promise<Actor | null> {
    return await this.actorModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateActorInput: UpdateActorInput): Promise<Actor | null> {
    const actor = await this.actorModel.findByPk(id);
    if (!actor) return null;
    return await actor.update(updateActorInput);
  }

  async remove(id: number): Promise<boolean> {
    const actor = await this.actorModel.findByPk(id);
    if (!actor) return false;
    await actor.destroy();
    return true;
  }
}
