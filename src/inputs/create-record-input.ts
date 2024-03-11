import { Field, InputType } from "type-graphql";

@InputType()
export class CreateRecordInput {
  @Field()
  question!: string;

  @Field({ nullable: true })
  answer?: string;

  @Field({ nullable: true })
  assignee?: string;

  @Field()
  createdBy!: string;
}
