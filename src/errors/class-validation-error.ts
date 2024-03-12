import { ValidationError } from "class-validator";
import { GraphQLError } from "graphql";

export class ClassValidationError extends Error {
  constructor(errors: ValidationError[]) {
    const firstErrorMessage = errors[0]?.constraints
      ? Object.values(errors[0].constraints)[0]
      : "Unknown error";

    super(firstErrorMessage);
  }

  getGraphQLError() {
    return new GraphQLError(this.message, {
      extensions: { code: "BAD_REQUEST" },
    });
  }
}
