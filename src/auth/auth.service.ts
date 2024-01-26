import { Injectable } from '@nestjs/common';
import { UserService } from 'src/base/services/user/user.service';
import { CreateUserDto } from 'src/common/dtos/user/create.dto';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { ServiceConstants, Constants } from 'src/utils/constants';
import { Build } from 'src/utils/helpers/build.helper';
import { IUserCreate } from 'src/utils/interfaces/IUser';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from 'src/common/dtos/user/signin.dto';
import { comparePasswordHelper } from 'src/utils/helpers/manage-password.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUser: CreateUserDto): Promise<IUserCreate> {
    const user = await this.userService.findByEmail(createUser.email);
    if (user) {
      const valErrs = [
        Build.validationError(
          'email',
          ServiceConstants.EMAIL_ALREADY_EXISTS,
          Constants.RESOURCE_EXISTS,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    const newUser = await this.userService.createUser(createUser);
    const payload = { sub: newUser.id, username: newUser.name };
    const access_token = await this.jwtService.signAsync(payload);
    const userWithoutPassword = Build.exclude(newUser, 'password');
    return {
      status: true,
      content: {
        data: userWithoutPassword,
        meta: {
          access_token,
        },
      },
    };
  }

  async signin(signinUserDetails: SigninUserDto): Promise<IUserCreate> {
    // finding whether user exists or not
    const user = await this.userService.findByEmail(signinUserDetails.email);
    if (!user) {
      const valErrs = [
        Build.validationError(
          'email',
          ServiceConstants.PROVIDE_VALID_EMAIL,
          Constants.INVALID_INPUT,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    // check whether password is correct or not
    const isPasswordCorrect = await comparePasswordHelper(
      signinUserDetails.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      const valErrs = [
        Build.validationError(
          'password',
          ServiceConstants.INVALID_CREDENTIALS,
          Constants.INVALID_CREDENTIALS,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    // return the response
    const payload = { sub: user.id, username: user.name };
    const access_token = await this.jwtService.signAsync(payload);
    const userWithoutPassword = Build.exclude(user, 'password');
    return {
      status: true,
      content: {
        data: userWithoutPassword,
        meta: {
          access_token,
        },
      },
    };
  }
}
