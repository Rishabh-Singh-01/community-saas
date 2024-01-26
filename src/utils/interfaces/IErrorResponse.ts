export interface IErrorResponse {
  status: boolean;
  errors: IErrorResponseBody[];
}

export interface IErrorResponseBody {
  param: string;
  message: string;
  code: string;
}
