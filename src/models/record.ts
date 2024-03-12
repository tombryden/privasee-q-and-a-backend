import { Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Record {
  @Field(() => ID)
  @Expose()
  _recordId!: string;

  @Field(() => ID)
  @Expose()
  _companyId!: number;

  @Field()
  @Expose({ name: "Company Name" })
  @Length(1, 100, {
    message: "Company name must be between 1 and 100 characters",
  })
  companyName!: string;

  @Field()
  @Expose({ name: "Question" })
  @Length(1, 1000, {
    message: "Question must be between 1 and 1000 characters",
  })
  question!: string;

  @Field({ nullable: true })
  @Expose({ name: "Answer" })
  @Length(1, 1000, {
    message: "Answer must be between 1 and 1000 characters",
  })
  answer?: string;

  @Field()
  @Expose({ name: "Updated By" })
  @IsEmail({}, { message: "Updated by must be an email" })
  updatedBy!: string;

  @Field()
  @Expose({ name: "Updated At" })
  updatedAt!: Date;

  @Field()
  @Expose({ name: "Created By" })
  @IsEmail({}, { message: "Created by must be an email" })
  createdBy!: string;

  @Field()
  @Expose({ name: "Created At" })
  createdAt!: Date;

  @Field({ nullable: true })
  @Expose({ name: "Assigned To" })
  @IsEmail({}, { message: "Assignee must be an email" })
  assignee?: string;

  @Field({ nullable: true })
  @Expose({ name: "Properties" })
  properties?: string;

  @Field({ nullable: true })
  @Expose({ name: "Question Description" })
  questionDescription?: string;
}
