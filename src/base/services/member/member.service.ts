import { IMemberCreate, IMemberDelete } from 'src/utils/interfaces/IMember';
import { IUtilsUserFromRequest } from 'src/utils/interfaces/IUtils';
import { UserService } from '../user/user.service';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import {
  ServiceConstants,
  Constants,
  BusinessConstants,
} from 'src/utils/constants';
import { Build } from 'src/utils/helpers/build.helper';
import { CommunityService } from '../community/community.service';
import { RoleService } from '../role/role.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from 'src/common/dtos/member/create.dto';
import { Snowflake } from '@theinternetfolks/snowflake';

@Injectable()
export class MemberService {
  constructor(
    private readonly userService: UserService,
    private readonly communityService: CommunityService,
    private readonly roleService: RoleService,
    private readonly prisma: PrismaService,
  ) {}

  async create(
    { community, user, role }: CreateMemberDto,
    { sub }: IUtilsUserFromRequest,
  ): Promise<IMemberCreate> {
    const prevUser = await this.userService.findById(user);
    if (!prevUser) {
      const valErrs = [
        Build.validationError(
          'user',
          ServiceConstants.USER_NOT_FOUND,
          Constants.RESOURCE_EXISTS,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    const prevCommunity = await this.communityService.findById(community);
    if (!prevCommunity) {
      const valErrs = [
        Build.validationError(
          'community',
          ServiceConstants.COMMUNITY_NOT_FOUND,
          Constants.RESOURCE_NOT_FOUND,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    const prevRole = await this.roleService.findById(role);
    if (!prevRole) {
      const valErrs = [
        Build.validationError(
          'role',
          ServiceConstants.ROLE_NOT_FOUND,
          Constants.RESOURCE_NOT_FOUND,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    const prevMember = await this.prisma.member.findMany({
      where: {
        community,
        user,
      },
    });
    if (prevMember.length) {
      const valErrs = [
        Build.validationError(
          'user',
          ServiceConstants.MEMBER_ALREADY_EXISTS,
          Constants.RESOURCE_EXISTS,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    const signedInUserDetails = await this.prisma.member.findFirst({
      where: {
        community,
        user: sub,
      },
      include: {
        roleRln: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (
      !signedInUserDetails ||
      !signedInUserDetails.roleRln ||
      !signedInUserDetails.roleRln.name ||
      signedInUserDetails.roleRln.name !== BusinessConstants.COMMUNITY_ADMIN
    ) {
      const valErrs = [
        Build.validationError(
          'user',
          ServiceConstants.UNAUTH_PERFORM_ACTION,
          Constants.NOT_ALLOWED,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    const newMember = await this.prisma.member.create({
      data: {
        id: Snowflake.generate(),
        community,
        user,
        role,
      },
    });

    return {
      status: true,
      content: {
        data: {
          ...newMember,
        },
      },
    };
  }

  async deleteUsingId(id: string): Promise<IMemberDelete> {
    const prevMember = await this.prisma.member.findUnique({
      where: {
        id,
      },
    });
    if (!prevMember) {
      const valErrs = [
        Build.validationError(
          'member',
          ServiceConstants.MEMBER_NOT_FOUND,
          Constants.RESOURCE_NOT_FOUND,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    await this.prisma.member.delete({
      where: {
        id,
      },
    });

    return {
      status: true,
    };
  }
}
