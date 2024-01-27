export class Constants {
  static readonly DEFAULT_PAGINATION = 1;
  static readonly INVALID_INPUT = 'INVALID_INPUT';
  static readonly RESOURCE_EXISTS = 'RESOURCE_EXISTS';
  static readonly GENERIC_CODE = 'ERROR';
  static readonly INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
  static readonly NOT_SIGNEDIN = 'NOT_SIGNEDIN';
  static readonly RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND';
  static readonly NOT_ALLOWED = 'NOT_ALLOWED';
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
  static readonly MEMBER_ALREADY_EXISTS =
    'User is already added in the community.';
  static readonly COMMUNITY_NOT_FOUND = 'Community not found.';
  static readonly USER_NOT_FOUND = 'User not found.';
  static readonly ROLE_NOT_FOUND = 'Role not found.';
  static readonly UNAUTH_PERFORM_ACTION =
    'You are not authorized to perform this action.';
}

export class BusinessConstants {
  static readonly COMMUNITY_ADMIN = 'Community Admin';
}
