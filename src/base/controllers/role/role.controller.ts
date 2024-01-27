import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { RoleService } from 'src/base/services/role/role.service';
import { CreateRoleDto } from 'src/common/dtos/role/create.dto';
import { ValidationExceptionFilter } from 'src/common/filters/validation-exception.filter';
import { IRoleCreate, IRoleGetAll } from 'src/utils/interfaces/IRole';

@Controller('/v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  findAll(@Query('page') page?: string): Promise<IRoleGetAll> {
    return this.roleService.findAll(page);
  }

  @HttpCode(200)
  @Post()
  @UseFilters(ValidationExceptionFilter)
  create(@Body() createRole: CreateRoleDto): Promise<IRoleCreate> {
    return this.roleService.create(createRole);
  }
}
