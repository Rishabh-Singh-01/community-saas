import { ValidationArguments } from 'class-validator';

export class Dtos {
  public static msgvalidateFn(args: ValidationArguments, extraMsg: string) {
    const targetCh = args.property.at(0).toUpperCase();
    const targetRemain = args.property.slice(1);
    return `${targetCh}${targetRemain} ${extraMsg}`;
  }
}
