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

  async findAll(): Promise<IRoleGetAll> {
    const roles = await this.prisma.role.findMany();
    return {
      status: true,
      content: {
        meta: {
          total: 2,
          pages: 2,
          page: 1,
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
