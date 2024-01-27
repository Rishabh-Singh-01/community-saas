import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CommunityService } from 'src/base/services/community/community.service';
import { CreateCommunityDto } from 'src/common/dtos/community/create.dto';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';
import {
  ICommunityCreate,
  ICommunityGetAll,
  ICommunityGetAllCommunities,
  ICommunityGetAllMembers,
} from 'src/utils/interfaces/ICommunity';
import { IReqWithUser } from 'src/utils/interfaces/IReqWithUser';
import { IUtilsUserFromRequest } from 'src/utils/interfaces/IUtils';

@Controller('v1/community')
@UseFilters(ValidationExceptionFilter)
@UseGuards(AuthGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @HttpCode(200)
  @Post()
  create(
    @Body() communityDetails: CreateCommunityDto,
    @Request() req,
  ): Promise<ICommunityCreate> {
    const user = req.user as IUtilsUserFromRequest;
    return this.communityService.create(communityDetails, user);
  }

  @Get()
  getAll(
    @Query('page')
    page?: string,
  ): Promise<ICommunityGetAll> {
    return this.communityService.findAll(page);
  }

  @Get(':id/members')
  getAllMembers(
    @Param('id') id: string,
    @Query('page') page?: string,
  ): Promise<ICommunityGetAllMembers> {
    return this.communityService.findAllMembersUsingId(id, page);
  }

  @Get('me/owner')
  getAllMyCommunity(
    @Request() req: IReqWithUser,
    @Query('page') page?: string,
  ): Promise<ICommunityGetAllCommunities> {
    return this.communityService.findAllCommunitiesUsingId(req.user, page);
  }

  @Get('me/member')
  getAllMyJoinedCommunity(
    @Request() req: IReqWithUser,
    @Query('page') page?: string,
  ): Promise<ICommunityGetAll> {
    return this.communityService.findAllJoinedCommunitiesUsingId(
      req.user,
      page,
    );
  }
}
