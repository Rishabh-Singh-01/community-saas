import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseFilters,
} from '@nestjs/common';
import { RoleService } from 'src/base/services/role/role.service';
import { CreateRoleDto } from 'src/common/dtos/role/create.dto';
import { RoleExceptionFilter } from 'src/common/filters/role-exception.filter';
import { IRoleCreate, IRoleGetAll } from 'src/utils/interfaces/IRole';

@Controller('/v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  findAll(): Promise<IRoleGetAll> {
    return this.roleService.findAll();
  }

  @HttpCode(200)
  @Post()
  @UseFilters(RoleExceptionFilter)
  create(@Body() createRole: CreateRoleDto): Promise<IRoleCreate> {
    return this.roleService.create(createRole);
  }
}
