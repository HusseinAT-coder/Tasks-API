import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { UserRegisterInputDto } from './dtos/user-register-input.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {

    constructor(
        private readonly _userService: UsersService
    ) { }

    @Post('register')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Register(@Body() input: UserRegisterInputDto) {
        return await this._userService.Register(input);
    }
}
