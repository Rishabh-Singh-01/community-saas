export interface IValidationException {
  property: string;
  constraints: {
    [key: string]: string;
  };
  contexts?: {
    [key: string]: {
      code: string;
    };
  };
}
