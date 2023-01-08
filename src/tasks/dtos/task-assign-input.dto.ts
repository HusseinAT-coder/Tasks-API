import { ApiProperty } from "@nestjs/swagger";

export class TaskAssignInputDto {

    @ApiProperty()
    UserId: number;

    @ApiProperty()
    TaskId: number;
}