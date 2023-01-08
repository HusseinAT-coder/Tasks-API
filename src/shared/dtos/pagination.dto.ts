import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {

    @ApiProperty()
    PageSize: number;

    @ApiProperty()
    PageNumber: number;
}