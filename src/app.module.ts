import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './base/modules/role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './base/modules/user/user.module';
import { CommunityModule } from './base/modules/community/community.module';
import { MemberModule } from './base/modules/member/member.module';

@Module({
  imports: [
    PrismaModule,
    RoleModule,
    AuthModule,
    UserModule,
    CommunityModule,
    MemberModule,
  ],
})
export class AppModule {}
