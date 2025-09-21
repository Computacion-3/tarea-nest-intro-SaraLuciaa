import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rolesService.findOne(id);
    }

    @Get('permission/:id')
    findByPermission(@Param('id') id: number) {
        return this.rolesService.findByPermission(id);
    }

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Post(':roleId/permissions/:permissionId')
    addPermissionToRole(
        @Param('roleId') roleId: number,
        @Param('permissionId') permissionId: number,
    ) {
        return this.rolesService.addPermissionToRole(roleId, permissionId);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.rolesService.remove(id);
    }
}