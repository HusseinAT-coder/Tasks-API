import { ApiProperty } from "@nestjs/swagger";

export class UserCredentialsDto {

    @ApiProperty()
    Email: string;

    @ApiProperty()
    Password: string;
}