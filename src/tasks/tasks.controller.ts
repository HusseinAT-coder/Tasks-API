import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserPayloadDetailsDto } from 'src/users/dtos/user-payload-details.dto';
import { TaskInputDto } from './dtos/task-input.dto';
import { TasksService } from './tasks.service';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {

    constructor(
        private readonly _tasksService: TasksService
    ) { }

    @Post('Create')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async Create(@Body() input: TaskInputDto, @GetUser() currentUser: UserPayloadDetailsDto): Promise<any> { //access token

        await this._tasksService.Create(input, currentUser);
    }
}
