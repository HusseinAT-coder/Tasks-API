import { Body, Controller, Delete, Get, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../decorators/get-user.decorator';
import { UserPayloadDetailsDto } from '../users/dtos/user-payload-details.dto';
import { TaskAssignInputDto } from './dtos/task-assign-input.dto';
import { TaskDetailsDto } from './dtos/task-details.dto';
import { TaskFilterDto } from './dtos/task-filter.dto';
import { TaskInputDto } from './dtos/task-input.dto';
import { TasksService } from './tasks.service';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {

    constructor(
        private readonly _tasksService: TasksService
    ) { }

    @Get('get')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Get(@Query('Id') Id: number): Promise<TaskDetailsDto> { //access token

        return await this._tasksService.Get(Id);
    }

    @Post('list')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async GetList(@Body() filter: TaskFilterDto): Promise<TaskDetailsDto[]> { //access token

        return await this._tasksService.GetList(filter);
    }

    @Post('create')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Create(@Body() input: TaskInputDto): Promise<any> { //access token

        await this._tasksService.Create(input);
    }

    @Put('update')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Update(@Body() input: TaskInputDto): Promise<any> { //access token

        await this._tasksService.Update(input);
    }

    @Delete('delete')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Delete(@Query('Id') id: number): Promise<any> { //access token

        await this._tasksService.Delete(id);
    }

    @Patch('assign')
    // @UseGuards(AuthGuard())
    // @ApiBearerAuth()
    async Assign(@Body() input: TaskAssignInputDto): Promise<any> { //access token

        await this._tasksService.AssignUser(input);
    }
}
