import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/user/create.dto';
import { AuthService } from './auth.service';
import { IUserCreate } from 'src/utils/interfaces/IUser';
import { RoleExceptionFilter } from 'src/common/filters/role-exception.filter';

@Controller('v1/auth')
@UseFilters(RoleExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signup')
  signup(@Body() userSignup: CreateUserDto): Promise<IUserCreate> {
    return this.authService.signup(userSignup);
  }
}