import axios from "axios";
import { AIRTABLE_BASE, AIRTABLE_TABLE } from "../vars";
import { plainToInstance } from "class-transformer";
import { Record } from "../models/record";
import { CreateRecordInput } from "../inputs/create-record-input";
import { validate } from "class-validator";
import { ClassValidationError } from "../errors/class-validation-error";
import { AssignRecordInput } from "../inputs/assign-record-input";
import { UpdateRecordInput } from "../inputs/update-record-input";

/**
 * Pulls data from Airtable and converts into the Record model
 */
export class RecordService {
  /**
   * Maps {records: [{id: abc, fields: {id: abc}}]} to record.fields Record[]
   * @param rawRecords Response given from airtable multi record response
   * @returns
   */
  private convertRecordsRespToRecordsInstance(rawRecords: Array<any>) {
    const recordFields = rawRecords.map((r) => r.fields);
    const records = plainToInstance(Record, recordFields as Record[]);

    return records;
  }

  /**
   * List all records in the question & answers spreadsheet.
   * Not the most efficient method, but works for type safety.
   * Sorted by created date
   */
  async listAll(): Promise<Record[]> {
    const resp = await axios.get(`/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
      params: {
        sort: [
          {
            field: "Updated At",
            direction: "desc",
          },
        ],
      },
    });

    return this.convertRecordsRespToRecordsInstance(resp.data.records);
  }

  /**
   * Get one record
   * @param recordId
   */
  async getOne(recordId: string): Promise<Record> {
    const resp = await axios.get(
      `/${AIRTABLE_BASE}/${AIRTABLE_TABLE}/${recordId}`
    );

    const record = plainToInstance(Record, resp.data.fields);

    return record;
  }

  /**
   * Create a new record
   * @param createRecordInput
   */
  async create(createRecordInput: CreateRecordInput): Promise<Record> {
    const {
      question,
      questionDescription,
      answer,
      assignee,
      createdBy,
      properties,
    } = createRecordInput;

    // should really use better error handling, but ok for this exercise
    const errors = await validate(createRecordInput);
    if (errors.length > 0) throw new ClassValidationError(errors);

    const resp = await axios.post(`/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
      fields: {
        Question: question,
        "Question Description": questionDescription,
        Answer: answer,
        "Assigned To": assignee,
        "Updated By": createdBy,
        "Created By": createdBy,
        _companyId: 63297,
        "Company Name": "Test Company Limited",
        Properties: properties,
      },
    });

    const record = plainToInstance(Record, resp.data.fields);
    return record;
  }

  /**
   * Sets the 'Assigned To' email for each record id
   * @param assignRecordInput Array of record IDS to bulk assign
   */
  async assignRecords(assignRecordInput: AssignRecordInput): Promise<Record[]> {
    const { recordIds, assignee } = assignRecordInput;

    const errors = await validate(assignRecordInput);
    if (errors.length > 0) throw new ClassValidationError(errors);

    // https://api.airtable.com/v0/{baseId}/{tableIdOrName} - wants format in records: [{id: abc, fields: {field1: "example"}}]
    const patchBody = recordIds.map((id) => ({
      id,
      fields: { "Assigned To": assignee },
    }));

    const resp = await axios.patch(`/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
      records: patchBody,
    });
    return this.convertRecordsRespToRecordsInstance(resp.data.records);
  }

  async updateRecord(updateRecordInput: UpdateRecordInput) {
    const { recordId, question, answer, questionDescription, properties } =
      updateRecordInput;

    const errors = await validate(updateRecordInput);
    if (errors.length > 0) throw new ClassValidationError(errors);

    if (!question && !answer)
      throw new Error("Request must contain a question or an answer");

    const resp = await axios.patch(
      `/${AIRTABLE_BASE}/${AIRTABLE_TABLE}/${recordId}`,
      {
        fields: {
          Question: question,
          Answer: answer,
          "Question Description": questionDescription,
          Properties: properties,
        },
      }
    );

    const record = plainToInstance(Record, resp.data.fields);

    return record;
  }
}
