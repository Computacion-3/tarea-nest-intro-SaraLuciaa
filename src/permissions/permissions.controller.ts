import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}
    @Get('role/:roleId')
    findByRole(@Param('roleId') roleId: number) {
        return this.permissionsService.findByRole(roleId);
    }

    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }

    @Get()
    findAll() {
        return this.permissionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.permissionsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionsService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.permissionsService.remove(id);
    }
}
