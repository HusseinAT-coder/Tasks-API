import { Injectable, ConflictException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UserPayloadDetailsDto } from 'src/users/dtos/user-payload-details.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TaskInputDto } from './dtos/task-input.dto';

@Injectable()
export class TasksService {

    constructor(
        private readonly _prismaService: PrismaService
    ) { }

    async Create(input: TaskInputDto, currentUser: UserPayloadDetailsDto) {

        const checkTask = await this._prismaService.task.findUnique({
            where: <Task>{
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
}
