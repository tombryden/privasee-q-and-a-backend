import { IsOptional, Length } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateQuestionAnswerInput {
  @Field(() => ID)
  recordId!: string;

  @Field({ nullable: true })
  @Length(1, 1000, {
    message: "Question must be between 1 and 1000 characters",
  })
  @IsOptional()
  question?: string;

  @Field({ nullable: true })
  @Length(0, 1000, {
    message: "Answer must be below 1000 characters",
  })
  @IsOptional()
  answer?: string;
}
