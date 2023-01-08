import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserPayloadDetailsDto } from '../users/dtos/user-payload-details.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    user: User;
    
    constructor(
        private readonly _prismaService: PrismaService,
        private readonly _jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKeyProvider: async (request, jwtToken, done) => {
                const decodedToken: any = _jwtService.decode(jwtToken);

                if (!decodedToken?.Id) {
                    return done(null, 'Not Verified');
                }

                this.user = await _prismaService.user.findUnique({ where: { Id: decodedToken?.Id } });
                done(null, this.user.Password);
            },
        });
    }

    async validate(payload: JwtPayload): Promise<UserPayloadDetailsDto> { //we know that the payload is valid

        if (!this.user) { //in case the user doesnt exists 
            throw new UnauthorizedException();
        }

        return <UserPayloadDetailsDto>{
            Id: payload.Id,
            Email: payload.Email
        }

    }// passport will inject it in request object of our controller

 
}