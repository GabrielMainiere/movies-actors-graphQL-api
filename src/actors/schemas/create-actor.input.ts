import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateActorInput {
  @Field()
  name: string;

  @Field()
  birthdate: Date;
}