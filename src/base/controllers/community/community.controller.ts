import {
  Body,
  Controller,
  Get,
  HttpCode,
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
} from 'src/utils/interfaces/ICommunity';
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
    page: string,
  ): Promise<ICommunityGetAll> {
    return this.communityService.findAll(page);
  }
}
