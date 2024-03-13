import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Record } from "../models/record";
import { RecordService } from "../services/record-service";
import { CreateRecordInput } from "../inputs/create-record-input";
import { ClassValidationError } from "../errors/class-validation-error";
import { AssignRecordInput } from "../inputs/assign-record-input";
import { UpdateRecordInput } from "../inputs/update-record-input";

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
    // example of class validator error handling properly with custom code extension, this could be moved into a func
    try {
      return await this.recordService.create(createRecordInput);
    } catch (err) {
      if (err instanceof ClassValidationError) {
        throw err.getGraphQLError();
      }

      throw err;
    }
  }

  @Mutation(() => [Record], { description: "Bulk assign records to an email" })
  async assignRecords(
    @Arg("assignRecordInput") assignRecordInput: AssignRecordInput
  ) {
    try {
      return await this.recordService.assignRecords(assignRecordInput);
    } catch (err) {
      if (err instanceof ClassValidationError) {
        throw err.getGraphQLError();
      }

      throw err;
    }
  }

  @Mutation(() => Record, {
    description: "Update records with new information",
  })
  async updateRecord(
    @Arg("updateRecordInput")
    updateRecordInput: UpdateRecordInput
  ) {
    try {
      return await this.recordService.updateRecord(updateRecordInput);
    } catch (err) {
      if (err instanceof ClassValidationError) {
        throw err.getGraphQLError();
      }

      throw err;
    }
  }
}
