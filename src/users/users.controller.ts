import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { UserDetailsDto } from './dtos/user-details.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
import { UserInputDto } from './dtos/user-input.dto';
import { UserRegisterInputDto } from './dtos/user-register-input.dto';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {

    constructor(
        private readonly _userService: UsersService
    ) { }

    @Get()
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Get(@Query('Id') id: number): Promise<UserDetailsDto> {
        return await this._userService.Get(id)
    }

    @Post('list')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async GetList(@Body() filter: UserFilterDto): Promise<UserDetailsDto[]> {
        return await this._userService.GetList(filter)
    }

    @Post('register')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Register(@Body() input: UserRegisterInputDto) {
        return await this._userService.Register(input);
    }

    @Post('update')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Update(@Body() input: UserInputDto) {
        return await this._userService.Update(input);
    }
}
