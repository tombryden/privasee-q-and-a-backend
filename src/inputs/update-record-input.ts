import { IsOptional, IsString, Length, Matches } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateRecordInput {
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

  @Field({ nullable: true })
  @IsString()
  @Matches(/(\w+:\w+,?)+|^$/)
  @IsOptional()
  properties?: string;

  @Field({ nullable: true })
  @Length(0, 1000, {
    message: "Question description must be between 1 and 1000 characters",
  })
  @IsOptional()
  questionDescription?: string;
}
