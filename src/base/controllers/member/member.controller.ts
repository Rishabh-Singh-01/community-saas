import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { MemberService } from 'src/base/services/member/member.service';
import { CreateMemberDto } from 'src/common/dtos/member/create.dto';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';
import { IMemberCreate, IMemberDelete } from 'src/utils/interfaces/IMember';
import { IReqWithUser } from 'src/utils/interfaces/IReqWithUser';

@Controller('v1/member')
@UseFilters(ValidationExceptionFilter)
@UseGuards(AuthGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @HttpCode(200)
  @Post()
  create(
    @Body() createMemberDetails: CreateMemberDto,
    @Request() req: IReqWithUser,
  ): Promise<IMemberCreate> {
    return this.memberService.create(createMemberDetails, req.user);
  }

  @HttpCode(200)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<IMemberDelete> {
    return this.memberService.deleteUsingId(id);
  }
}
