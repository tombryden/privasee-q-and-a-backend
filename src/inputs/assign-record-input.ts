import { IsEmail } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class AssignRecordInput {
  @Field(() => [ID])
  recordIds!: string[];

  @Field()
  @IsEmail({}, { message: "Assignee must be an email" })
  assignee!: string;
}
