import { ApiProperty } from "@nestjs/swagger";

export class UserInputDto {

    @ApiProperty({
        required: false
    })
    Id: number;

    @ApiProperty()
    Email: string;

    @ApiProperty()
    Name: string;

    @ApiProperty()
    PermissionId: number;

}