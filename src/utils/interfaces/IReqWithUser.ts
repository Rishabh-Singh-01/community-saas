import { Request } from 'express';
import { IUtilsUserFromRequest } from './IUtils';

export interface IReqWithUser extends Request {
  user: IUtilsUserFromRequest;
}
