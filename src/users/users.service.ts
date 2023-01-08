import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserRegisterInputDto } from './dtos/user-register-input.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserDetailsDto } from './dtos/user-details.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
import { SharedService } from '../shared/shared.service';
import { UserInputDto } from './dtos/user-input.dto';

@Injectable()
export class UsersService {

    constructor(
        private readonly _prismaService: PrismaService,
        private readonly _sharedService: SharedService
    ) { }

    async Get(id: number) {

        const user = await this._prismaService.user.findFirst({
            where: <User>{
                Id: +id,
                IsDeleted: false
            }
        })

        if (!user) throw new NotFoundException('User not found')

        return <UserDetailsDto>{
            Id: user.Id,
            Email: user.Email,
            Name: user.Name,
            PermissionId: user.PermissionId
        }
    }

    async GetList(filter: UserFilterDto) {

        const toBeSkippedObjects = this._sharedService.GetObjectsToBeSkipped(filter.PageNumber, filter.PageSize)

        const users = await this._prismaService.user.findMany({
            where: <User>{
                IsDeleted: false
            },

            skip: toBeSkippedObjects,
            take: filter.PageSize,
        })

        return users.map((user) => <UserDetailsDto>{
            Id: user.Id,
            Email: user.Email,
            Name: user.Name,
            PermissionId: user.PermissionId
        })
    }

    async Register(input: UserRegisterInputDto) {

        const email = input.Email.toLowerCase();

        //check if email exist
        const checkExistingUser = await this._prismaService.user.findFirst({
            where: {
                Email: email
            }
        })

        //if yes throw exception
        if (checkExistingUser) throw new ConflictException('Email already exists')

        //hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(input.Password, salt);

        const newUser = <User>{

            Email: email,
            Name: input.Name,

            Password: hashedPassword
        }

        return await this._prismaService.user.create({
            data: newUser
        });
    }

    async Update(input: UserInputDto) {

        const user = await this._prismaService.user.findFirst({
            where: <User>{
                Id: input.Id,
                IsDeleted: false
            }
        })

        if (!user) throw new NotFoundException('User not found')

        await this._prismaService.user.update({

            where: {
                Id: input.Id
            },

            data: {
                // Email: input.Email,
                Name: input.Name,
                PermissionId: +input.PermissionId
            }
        })
    }

}
