import { Injectable } from '@nestjs/common';
import { Snowflake } from '@theinternetfolks/snowflake';
import { CreateUserDto } from 'src/common/dtos/user/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
  createUser({ email, name, password }: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        id: Snowflake.generate(),
        email,
        name,
        password,
      },
    });
  }
}
