import { ValidationError } from 'class-validator';
import { Constants } from '../constants';

export class Build {
  public static validationError(
    property: string,
    message: string,
    code: Constants,
  ): ValidationError {
    return {
      property,
      constraints: {
        prop: message,
      },
      contexts: {
        prop: {
          code,
        },
      },
    };
  }
}
