import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateRecordInput {
  @Field()
  @Length(1, 1000, {
    message: "Question must be between 1 and 1000 characters",
  })
  question!: string;

  @Field({ nullable: true })
  @Length(1, 1000, {
    message: "Answer must be between 1 and 1000 characters",
  })
  answer?: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: "Assignee must be an email" })
  assignee?: string;

  @Field()
  @IsEmail({}, { message: "Created by must be an email" })
  createdBy!: string;
}
