import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActorsService } from './actors.service';
import { Actor } from './entities/actor.entity';
import { CreateActorInput } from './schemas/create-actor.input';
import { UpdateActorInput } from './schemas/update-actor.input';

@Resolver(() => Actor)
export class ActorsResolver {
  constructor(private readonly actorsService: ActorsService) {}

  @Mutation(() => Actor)
  async createActor(@Args('createActorInput') createActorInput: CreateActorInput) {
    return await this.actorsService.create(createActorInput);
  }

  @Query(() => [Actor], { name: 'actors' })
  async findAll() {
    return await this.actorsService.findAll();
  }

  @Query(() => Actor, { name: 'actor' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.actorsService.findOne(id);
  }

  @Mutation(() => Actor)
  async updateActor(@Args('updateActorInput') updateActorInput: UpdateActorInput) {
    return await this.actorsService.update(updateActorInput.id, updateActorInput);
  }

  @Mutation(() => Boolean)
  async removeActor(@Args('id', { type: () => Int }) id: number) {
    return await this.actorsService.remove(id);
  }
}
