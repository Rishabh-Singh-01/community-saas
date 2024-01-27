import { IsString, MinLength, ValidationArguments } from 'class-validator';
import { Constants, ServiceConstants } from 'src/utils/constants';
import { Dtos } from 'src/utils/helpers/dtos.helper';

export class CreateMemberDto {
  @IsString()
  @MinLength(2, {
    message: (args: ValidationArguments) =>
      Dtos.msgvalidateFn(args, ServiceConstants.INPUT_OVER_TWO_CHARS),
    context: {
      code: Constants.INVALID_INPUT,
    },
  })
  community: string;

  @IsString()
  @MinLength(2, {
    message: (args: ValidationArguments) =>
      Dtos.msgvalidateFn(args, ServiceConstants.INPUT_OVER_TWO_CHARS),
    context: {
      code: Constants.INVALID_INPUT,
    },
  })
  user: string;

  @IsString()
  @MinLength(2, {
    message: (args: ValidationArguments) =>
      Dtos.msgvalidateFn(args, ServiceConstants.INPUT_OVER_TWO_CHARS),
    context: {
      code: Constants.INVALID_INPUT,
    },
  })
  role: string;
}
