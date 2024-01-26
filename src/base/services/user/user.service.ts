import { Injectable } from '@nestjs/common';
import { Snowflake } from '@theinternetfolks/snowflake';
import { CreateUserDto } from 'src/common/dtos/user/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPasswordHelper } from 'src/utils/helpers/manage-password.helper';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  //   findOne(id: string) {
  //     //
  //   }
  async createUser({ email, name, password }: CreateUserDto) {
    const hashedPassword = await hashPasswordHelper(password);
    return this.prisma.user.create({
      data: {
        id: Snowflake.generate(),
        email,
        name,
        password: hashedPassword,
      },
    });
  }
}
