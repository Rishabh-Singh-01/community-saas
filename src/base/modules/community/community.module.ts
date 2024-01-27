import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CommunityController } from 'src/base/controllers/community/community.controller';
import { CommunityService } from 'src/base/services/community/community.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CommunityController],
  providers: [CommunityService],
  exports: [CommunityService],
})
export class CommunityModule {}
