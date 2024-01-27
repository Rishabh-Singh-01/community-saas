import { Injectable } from '@nestjs/common';
import { Snowflake } from '@theinternetfolks/snowflake';
import { CreateCommunityDto } from 'src/common/dtos/community/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BusinessConstants, Constants } from 'src/utils/constants';
import {
  ICommunityCreate,
  ICommunityGetAll,
} from 'src/utils/interfaces/ICommunity';
import { IUtilsUserFromRequest } from 'src/utils/interfaces/IUtils';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { name }: CreateCommunityDto,
    { sub }: IUtilsUserFromRequest,
  ): Promise<ICommunityCreate> {
    const community = await this.prisma.community.create({
      data: {
        id: Snowflake.generate(),
        name,
        slug: `${name}-${Snowflake.generate()}`,
        owner: sub,
      },
    });

    // Creating the community admin member from community creator user
    const adminRole = await this.prisma.role.findFirst({
      where: {
        name: BusinessConstants.COMMUNITY_ADMIN,
      },
    });
    await this.prisma.member.create({
      data: {
        id: Snowflake.generate(),
        community: community.id,
        user: sub,
        role: adminRole.id,
      },
    });

    return {
      status: true,
      content: {
        data: community,
      },
    };
  }

  findById(id: string) {
    return this.prisma.community.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(pageNo?: string): Promise<ICommunityGetAll> {
    // TODO: handle the pageNo and parseInt issues in robust manner;
    let page: number = 1;
    if (pageNo) {
      try {
        const temp = parseInt(pageNo);
        if (temp > 0) page = temp;
      } catch {}
    }

    const skip = (page - 1) * Constants.DEFAULT_PAGINATION;
    const total = await this.prisma.community.count();
    const pages = Math.ceil(total / Constants.DEFAULT_PAGINATION);
    const communities = await this.prisma.community
      .findMany({
        skip,
        take: Constants.DEFAULT_PAGINATION,
        include: {
          userRln: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .then((comms) =>
        comms.map(({ userRln, ...com }) => ({ ...com, owner: userRln })),
      );
    return {
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
        data: communities,
      },
    };
  }
}
