import { ValidationError } from 'class-validator';
import { Constants } from '../constants';

export class Build {
  public static validationError(
    property: string,
    message: string,
    code: Constants,
  ): ValidationError {
    return {
      property,
      constraints: {
        prop: message,
      },
      contexts: {
        prop: {
          code,
        },
      },
    };
  }

  // public static exclude<User, Key extends keyof User>(
  //   user: User,
  //   keys: Key[],
  // ): Omit<User, Key> {
  //   return Object.fromEntries(
  //     Object.entries(user).filter(([key]) => !keys.includes(key)),
  //   );
  // }

  public static exclude(user, ...keys) {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  public static paginate(pageNo?: string): { skip: number; page: number } {
    // TODO: handle the pageNo and parseInt issues in robust manner;
    let page: number = 1;
    if (pageNo) {
      try {
        const temp = parseInt(pageNo);
        if (temp > 0) page = temp;
      } catch {}
    }

    const skip = (page - 1) * Constants.DEFAULT_PAGINATION;
    return { skip, page };
  }
}
