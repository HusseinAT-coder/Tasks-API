import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { UsersService } from '../users/users.service';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private readonly _prismaService: PrismaService,
        private readonly _jwtService: JwtService
    ) { }

    async Login(input: UserCredentialsDto): Promise<string> {

        const email = input.Email.toLowerCase();

        //get user
        const user = await this._prismaService.user.findUnique({
            where: {
                Email: email
            }
        })

        if (!user) throw new NotFoundException('User not found')

        //check password
        const checkPassword = await bcrypt.compare(input.Password, user.Password)

        if (!checkPassword) throw new UnauthorizedException('Please check your credentials')

        const payload = {
            Id: user.Id,
            Email: email
        }

        const accessToken = await this._jwtService.sign(payload)

        return accessToken
    }
}
