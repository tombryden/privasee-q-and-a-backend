import axios from "axios";
import { AIRTABLE_BASE, AIRTABLE_TABLE } from "../vars";
import { plainToInstance } from "class-transformer";
import { Record } from "../models/record";
import { CreateRecordInput } from "../inputs/create-record-input";

/**
 * curl "https://api.airtable.com/v0/appRlnmakjqXAYcma/tbl0BEgjWrIWS1T6o" \
                -H "Authorization: Bearer patnMmwCurgFWVmDR.3ee73b6b32ffb7a1e5f6730267e8e70c027477724198297d9b53e
3704250d745"
 */

/**
 * Pulls data from Airtable and converts into the Record model
 */
export class RecordService {
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
            field: "Created At",
            direction: "desc",
          },
        ],
      },
    });

    const rawRecords = resp.data.records; // this returns an array of records that have a fields property. Fields contains the records we want

    // loop through record.fields and push into the array
    const records: Array<Record> = [];
    for (const r of rawRecords) {
      const record = plainToInstance(Record, r.fields);

      records.push(record);
    }

    return records;
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
    const { question, answer, assignee, createdBy } = createRecordInput;

    const resp = await axios.post(`/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
      fields: {
        Question: question,
        Answer: answer,
        "Assigned To": assignee,
        "Updated By": createdBy,
        "Created By": createdBy,
        _companyId: 63297,
        "Company Name": "Test Company Limited",
      },
    });

    const record = plainToInstance(Record, resp.data.fields);
    return record;
  }
}
