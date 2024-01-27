import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MemberController } from 'src/base/controllers/member/member.controller';
import { MemberService } from 'src/base/services/member/member.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { CommunityModule } from '../community/community.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CommunityModule, RoleModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
