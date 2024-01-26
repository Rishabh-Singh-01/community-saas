import { IsString, MinLength, ValidationArguments } from 'class-validator';
import { Constants, ServiceConstants } from 'src/utils/constants';

export class CreateRoleDto {
  @IsString()
  @MinLength(2, {
    message: (args: ValidationArguments) => {
      const targetCh = args.property.at(0).toUpperCase();
      const targetRemain = args.property.slice(1);
      return `${targetCh}${targetRemain} ${ServiceConstants.INPUT_OVER_TWO_CHARS}`;
    },
    context: {
      code: Constants.INVALID_INPUT,
    },
  })
  name: string;
}
