import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterInputDto {

    @ApiProperty()
    Email: string;

    @ApiProperty()
    Name: string;

    @ApiProperty()
    Password: string;
}