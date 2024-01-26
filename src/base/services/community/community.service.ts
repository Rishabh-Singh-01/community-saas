import { Injectable } from '@nestjs/common';
import { Snowflake } from '@theinternetfolks/snowflake';
import { CreateCommunityDto } from 'src/common/dtos/community/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Constants } from 'src/utils/constants';
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

    return {
      status: true,
      content: {
        data: community,
      },
    };
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
