import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Role } from '../roles/entities/role.entity';
    

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto) {
        const permission = this.permissionRepository.create(createPermissionDto);
        return this.permissionRepository.save(permission);
    }

    async findAll() {
        return this.permissionRepository.find();
    }

    async findOne(id: number) {
        return this.permissionRepository.findOne({ where: { id } });
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        await this.permissionRepository.update(id, updatePermissionDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.permissionRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }

    async findByRole(roleId: number) {
        const role = await this.roleRepository.findOne({
            where: { id: roleId },
            relations: ['permissions'],
        });
        if (!role) return [];
        return role.permissions;
    }
}
