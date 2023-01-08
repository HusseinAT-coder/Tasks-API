import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserRegisterInputDto } from './dtos/user-register-input.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        private readonly _prismaService: PrismaService
    ) { }

    async Get() {

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

}
