import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";
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
    message: "Question description must be between 1 and 1000 characters",
  })
  @IsOptional()
  questionDescription?: string;

  @Field({ nullable: true })
  @Length(1, 1000, {
    message: "Answer must be between 1 and 1000 characters",
  })
  @IsOptional()
  answer?: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: "Assignee must be an email" })
  @IsOptional()
  assignee?: string;

  @Field()
  @IsEmail({}, { message: "Created by must be an email" })
  createdBy!: string;

  @Field({ nullable: true })
  @IsString()
  @Matches(/(\w+:\w+,?)+/)
  @IsOptional()
  properties?: string;
}
