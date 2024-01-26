import {
  IsEmail,
  IsString,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { Constants, ServiceConstants } from 'src/utils/constants';
import { Dtos } from 'src/utils/helpers/dtos.helper';

export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: (args: ValidationArguments) =>
      Dtos.msgvalidateFn(args, ServiceConstants.INPUT_OVER_TWO_CHARS),
    context: {
      code: Constants.INVALID_INPUT,
    },
  })
  name: string;

  @IsString()
  @MinLength(6, {
    message: (args: ValidationArguments) =>
      Dtos.msgvalidateFn(args, ServiceConstants.INPUT_OVER_SIX_CHARS),
    context: {
      code: Constants.INVALID_INPUT,
    },
  })
  password: string;

  @IsEmail()
  @MinLength(2, {
    message: (args: ValidationArguments) =>
      Dtos.msgvalidateFn(args, ServiceConstants.INPUT_OVER_TWO_CHARS),
    context: {
      code: Constants.INVALID_INPUT,
    },
  })
  email: string;
}
