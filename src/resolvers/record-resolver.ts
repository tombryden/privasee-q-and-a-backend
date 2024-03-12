import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Record } from "../models/record";
import { RecordService } from "../services/record-service";
import { CreateRecordInput } from "../inputs/create-record-input";
import { ClassValidationError } from "../errors/class-validation-error";
import { GraphQLError } from "graphql";

@Resolver(Record)
export class RecordResolver {
  private recordService = new RecordService();

  @Query(() => [Record], { description: "List all questions and answers" })
  records() {
    return this.recordService.listAll();
  }

  @Query(() => Record, {
    description: "Get one question/answer record",
  })
  record(
    @Arg("recordId", () => ID)
    recordId: string
  ) {
    return this.recordService.getOne(recordId);
  }

  @Mutation(() => Record, {
    description: "Create a new question/answer record",
  })
  async createRecord(
    @Arg("createRecordInput") createRecordInput: CreateRecordInput
  ) {
    // example of class validator error handling properly with custom code extension
    try {
      return await this.recordService.create(createRecordInput);
    } catch (err) {
      console.log("Caught");
      if (err instanceof ClassValidationError) {
        throw err.getGraphQLError();
      }
    }
  }
}
