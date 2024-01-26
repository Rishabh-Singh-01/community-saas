export class Constants {
  static readonly DEFAULT_PAGINATION = 2;
  static readonly INVALID_INPUT = 'INVALID_INPUT';
  static readonly RESOURCE_EXISTS = 'RESOURCE_EXISTS';
  static readonly GENERIC_CODE = 'ERROR';
  static readonly INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
  static readonly NOT_SIGNEDIN = 'NOT_SIGNEDIN';
}

export class ServiceConstants {
  static readonly ROLE_ALREADY_EXISTS = 'Role with this name already exists';
  static readonly EMAIL_ALREADY_EXISTS =
    'User with this email address already exists';
  static readonly PROVIDE_VALID_EMAIL = 'Please provide a valid email address.';
  static readonly INVALID_CREDENTIALS =
    'The credentials you provided are invalid.';
  static readonly INPUT_OVER_TWO_CHARS = 'should be at least 2 characters.';
  static readonly INPUT_OVER_SIX_CHARS = 'should be at least 6 characters.';
  static readonly PASSWORD_SHOULD_BE_STRONG = 'Password should be strong.';
  static readonly PROVIDE_SIGN_IN = 'You need to sign in to proceed.';
}
