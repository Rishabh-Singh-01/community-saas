import { Module } from '@nestjs/common';
import { RoleController } from 'src/base/controllers/role/role.controller';
import { RoleService } from 'src/base/services/role/role.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
