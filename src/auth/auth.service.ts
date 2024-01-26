import { Injectable } from '@nestjs/common';
import { UserService } from 'src/base/services/user/user.service';
import { CreateUserDto } from 'src/common/dtos/user/create.dto';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { ServiceConstants, Constants } from 'src/utils/constants';
import { Build } from 'src/utils/helpers/build.helper';
import { IUserCreate } from 'src/utils/interfaces/IUser';
import { JwtService } from '@nestjs/jwt';

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
    return {
      status: true,
      content: {
        data: newUser,
        meta: {
          access_token,
        },
      },
    };
  }
}
