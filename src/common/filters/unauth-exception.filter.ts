import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Constants, ServiceConstants } from 'src/utils/constants';

@Catch(UnauthorizedException)
export class UnAuthExceptionFilter
  implements ExceptionFilter<UnauthorizedException>
{
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      status: false,
      errors: [
        {
          message: ServiceConstants.PROVIDE_SIGN_IN,
          code: Constants.NOT_SIGNEDIN,
        },
      ],
    });
  }
}
