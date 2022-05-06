import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field({ nullable: true })
  replyTo?: string;
  @Field()
  text: string;
  @Field()
  experiment: string;
  author: string;
}
