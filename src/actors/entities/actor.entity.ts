import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Actor {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
