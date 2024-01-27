import { Injectable } from '@nestjs/common';
import { Snowflake } from '@theinternetfolks/snowflake';
import { CreateRoleDto } from 'src/common/dtos/role/create.dto';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { Constants, ServiceConstants } from 'src/utils/constants';
import { Build } from 'src/utils/helpers/build.helper';
import { IRoleCreate, IRoleGetAll } from 'src/utils/interfaces/IRole';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(pageNo?: string): Promise<IRoleGetAll> {
    const { skip, page } = Build.paginate(pageNo);
    const total = await this.prisma.role.count();
    const pages = Math.ceil(total / Constants.DEFAULT_PAGINATION);
    const roles = await this.prisma.role.findMany({
      skip,
      take: Constants.DEFAULT_PAGINATION,
    });
    return {
      status: true,
      content: {
        meta: {
          total,
          pages,
          page,
        },
        data: roles,
      },
    };
  }

  async create({ name }: CreateRoleDto): Promise<IRoleCreate> {
    const prevRole = await this.prisma.role.findUnique({
      where: {
        name,
      },
    });
    if (prevRole) {
      const valErrs = [
        Build.validationError(
          'name',
          ServiceConstants.ROLE_ALREADY_EXISTS,
          Constants.RESOURCE_EXISTS,
        ),
      ];
      throw new ValidationException(valErrs);
    }

    const data = await this.prisma.role.create({
      data: {
        id: Snowflake.generate(),
        name,
      },
    });
    return {
      status: true,
      content: {
        data,
      },
    };
  }
}
