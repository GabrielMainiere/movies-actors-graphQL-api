import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  name: string;

  @Field()
  synopsis: string;

  @Field(() => Float)
  duration: number;
}