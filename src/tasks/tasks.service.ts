import { Injectable, ConflictException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Task } from '@prisma/client';
import { SharedService } from '../shared/shared.service';
import { UserPayloadDetailsDto } from 'src/users/dtos/user-payload-details.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDetailsDto } from './dtos/task-details.dto';
import { TaskFilterDto } from './dtos/task-filter.dto';
import { TaskInputDto } from './dtos/task-input.dto';
import { TaskAssignInputDto } from './dtos/task-assign-input.dto';

@Injectable()
export class TasksService {

    constructor(
        private readonly _prismaService: PrismaService,
        private readonly _sharedService: SharedService
    ) { }

    async Get(Id: number): Promise<TaskDetailsDto> {

        const task = await this._prismaService.task.findFirst({
            where: {
                Id: +Id
            }
        })

        if (!task) throw new NotFoundException('Task not found')

        return <TaskDetailsDto>{
            Id: task.Id,
            Title: task.Title,
            Description: task.Description,
            StatusId: task.StatusId,
            AssigneeId: task.AssigneeId
        }
    }

    async GetList(filter: TaskFilterDto): Promise<TaskDetailsDto[]> {

        const toBeSkippedObjects = this._sharedService.GetObjectsToBeSkipped(filter.PageNumber, filter.PageSize)

        const tasks = await this._prismaService.task.findMany({

            skip: toBeSkippedObjects,
            take: filter.PageSize,
        })

        return tasks.map((task) => <TaskDetailsDto>{
            Id: task.Id,
            Title: task.Title,
            Description: task.Description,
            StatusId: task.StatusId,
            AssigneeId: task.AssigneeId
        })
    }

    async Create(input: TaskInputDto) {

        const checkTask = await this._prismaService.task.findFirst({
            where: {
                Title: input.Title
            }
        })

        if (checkTask) throw new ConflictException('Task already exists')

        const task = <Task>{

            Title: input.Title,
            Description: input.Description,

            StatusId: input.StatusId,

            AssigneeId: input.AssigneeId
        }

        //save task
        await this._prismaService.task.create({
            data: task
        })
    }

    async Update(input: TaskInputDto) {

        const task = await this._prismaService.task.findFirst({
            where: {
                Id: input.Id
            }
        })

        if (!task) throw new NotFoundException('Task not found')

        await this._prismaService.task.update({
            where: {
                Id: task.Id
            },
            data: {
                Title: input.Title,
                Description: input.Description,
                StatusId: input.StatusId,
                AssigneeId: input.AssigneeId,
            }
        })
    }

    async Delete(Id: number) {

        const task = await this._prismaService.task.findFirst({
            where: {
                Id: +Id
            }
        })

        if (!task) throw new NotFoundException('Task not found')

        await this._prismaService.task.delete({
            where: {
                Id: task.Id
            }
        })
    }

    async AssignUser(input: TaskAssignInputDto) {

        //check task
        const task = await this._prismaService.task.findFirst({
            where: {
                Id: +input.TaskId
            }
        })

        if (!task) throw new NotFoundException('Task not found')

        //check user
        const user = await this._prismaService.user.findFirst({
            where: {
                Id: +input.UserId
            }
        })

        if (!user) throw new NotFoundException('User not found')

        //update task
        await this._prismaService.task.update({
            where: {
                Id: task.Id
            },
            data: {
                AssigneeId: input.UserId
            }
        })
    }
}
