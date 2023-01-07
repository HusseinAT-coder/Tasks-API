import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    user: User;
    
    constructor(
        // private _jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<string> { //we know that the payload is valid

        // console.log(this.user)

        const { Email } = payload; //payload contains Email

        return Email;
        // const user: User = await this._usersRepository.findOne({ relations: ['UserRoles'], where: { Email, IsDeleted: false } });

    }// passport will inject it in request object of our controller

 
}