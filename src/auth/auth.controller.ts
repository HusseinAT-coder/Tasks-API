import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dtos/user-credentials.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    /**
     *
     */
    constructor(private readonly _authSerive: AuthService) {
    }


    @Post('login')
    async Login(@Body() input: UserCredentialsDto): Promise<string>{ //access token

        return await this._authSerive.Login(input);
    }
}
