import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  replyTo: string;
  @Field()
  text: string;
  @Field()
  experiment: string;
}
