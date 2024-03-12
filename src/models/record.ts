import { Expose } from "class-transformer";
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
  companyName!: string;

  @Field()
  @Expose({ name: "Question" })
  question!: string;

  @Field({ nullable: true })
  @Expose({ name: "Answer" })
  answer?: string;

  @Field()
  @Expose({ name: "Updated By" })
  updatedBy!: string;

  @Field()
  @Expose({ name: "Updated At" })
  updatedAt!: Date;

  @Field()
  @Expose({ name: "Created By" })
  createdBy!: string;

  @Field()
  @Expose({ name: "Created At" })
  createdAt!: Date;

  @Field({ nullable: true })
  @Expose({ name: "Assigned To" })
  assignedTo?: string;

  @Field({ nullable: true })
  @Expose({ name: "Properties" })
  properties?: string;

  @Field({ nullable: true })
  @Expose({ name: "Question Description" })
  questionDescription?: string;
}
