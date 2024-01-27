import { Injectable } from '@nestjs/common';
import { Snowflake } from '@theinternetfolks/snowflake';
import { CreateCommunityDto } from 'src/common/dtos/community/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BusinessConstants, Constants } from 'src/utils/constants';
import { Build } from 'src/utils/helpers/build.helper';
import {
  ICommunityCreate,
  ICommunityGetAll,
  ICommunityGetAllCommunities,
  ICommunityGetAllMembers,
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
    const { skip, page } = Build.paginate(pageNo);
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

  async findAllMembersUsingId(
    id: string,
    pageNo?: string,
  ): Promise<ICommunityGetAllMembers> {
    const { skip, page } = Build.paginate(pageNo);
    const total = await this.prisma.member.count({
      where: {
        community: {
          equals: id,
        },
      },
    });
    const pages = Math.ceil(total / Constants.DEFAULT_PAGINATION);
    const data = await this.prisma.member
      .findMany({
        skip,
        take: Constants.DEFAULT_PAGINATION,
        where: {
          community: {
            equals: id,
          },
        },
        include: {
          userRln: {
            select: {
              id: true,
              name: true,
            },
          },
          roleRln: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .then((members) =>
        members.map(({ userRln, roleRln, ...member }) => ({
          ...member,
          user: userRln,
          role: roleRln,
        })),
      );

    return {
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
        data,
      },
    };
  }

  async findAllCommunitiesUsingId(
    { sub }: IUtilsUserFromRequest,
    pageNo?: string,
  ): Promise<ICommunityGetAllCommunities> {
    const { skip, page } = Build.paginate(pageNo);
    const total = await this.prisma.community.count({
      where: {
        owner: {
          equals: sub,
        },
      },
    });
    const pages = Math.ceil(total / Constants.DEFAULT_PAGINATION);
    const data = await this.prisma.community.findMany({
      skip,
      take: Constants.DEFAULT_PAGINATION,
      where: {
        owner: {
          equals: sub,
        },
      },
    });
    return {
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
        data,
      },
    };
  }

  async findAllJoinedCommunitiesUsingId(
    { sub }: IUtilsUserFromRequest,
    pageNo?: string,
  ): Promise<ICommunityGetAll> {
    const { skip, page } = Build.paginate(pageNo);
    const total = await this.prisma.community.count({
      where: {
        members: {
          some: {
            user: {
              equals: sub,
            },
          },
        },
      },
    });
    const pages = Math.ceil(total / Constants.DEFAULT_PAGINATION);
    const data = await this.prisma.community
      .findMany({
        skip,
        take: Constants.DEFAULT_PAGINATION,
        where: {
          members: {
            some: {
              user: {
                equals: sub,
              },
            },
          },
        },
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
        comms.map(({ userRln, ...comm }) => ({ ...comm, owner: userRln })),
      );
    return {
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
        data,
      },
    };
  }
}
