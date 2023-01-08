import { ApiProperty } from "@nestjs/swagger";

export class TaskInputDto {

    @ApiProperty({
        required: false
    })
    Id: number

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