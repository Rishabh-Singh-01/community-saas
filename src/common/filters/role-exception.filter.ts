import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { Constants } from 'src/utils/constants';
import { IErrorResponseBody } from 'src/utils/interfaces/IErrorResponse';
import { IValidationException } from 'src/utils/interfaces/IValidationException';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class RoleExceptionFilter
  implements ExceptionFilter<ValidationException>
{
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errs: IValidationException[] = (
      exception.getResponse() as unknown as any
    ).message as IValidationException[];
    const errors: IErrorResponseBody[] = [];
    for (let i = 0; i < errs.length; i++) {
      const err = errs[i];
      for (const prop in err.constraints) {
        errors.push({
          param: err.property,
          message: err.constraints[prop],
          code: err?.contexts?.[prop]?.code || Constants.GENERIC_CODE,
        });
      }
    }
    response.status(status).json({
      status: false,
      errors,
    });
  }
}
