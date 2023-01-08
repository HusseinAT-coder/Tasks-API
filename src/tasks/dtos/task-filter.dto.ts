import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "src/shared/dtos/pagination.dto";

export class TaskFilterDto extends PaginationDto {

    @ApiProperty()
    StatusId: number;

    @ApiProperty()
    AssigneeId: number;
}