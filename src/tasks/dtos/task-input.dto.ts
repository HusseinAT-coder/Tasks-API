import { ApiProperty } from "@nestjs/swagger";

export class TaskInputDto {

    @ApiProperty()
    Title: string;

    @ApiProperty({
        required: false
    })
    Description: string;

    @ApiProperty()
    StatusId: number;

    @ApiProperty({
        required: false
    })
    AssigneeId: number;
}