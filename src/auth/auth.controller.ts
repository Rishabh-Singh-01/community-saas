import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/user/create.dto';
import { AuthService } from './auth.service';
import { IUserCreate, IUserGet } from 'src/utils/interfaces/IUser';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';
import { SigninUserDto } from 'src/common/dtos/user/signin.dto';
import { AuthGuard } from './guards/auth.guard';
import { IUtilsUserFromRequest } from 'src/utils/interfaces/IUtils';

@Controller('v1/auth')
@UseFilters(ValidationExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signup')
  signup(@Body() userSignup: CreateUserDto): Promise<IUserCreate> {
    return this.authService.signup(userSignup);
  }

  @HttpCode(200)
  @Post('signin')
  signin(@Body() userSignin: SigninUserDto): Promise<IUserCreate> {
    return this.authService.signin(userSignin);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req): Promise<IUserGet> {
    const user = req.user as IUtilsUserFromRequest;
    return this.authService.getUser(user);
  }
}
