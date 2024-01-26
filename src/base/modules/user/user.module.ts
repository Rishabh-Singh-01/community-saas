import { Module } from '@nestjs/common';
import { UserController } from 'src/base/controllers/user/user.controller';
import { UserService } from 'src/base/services/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
