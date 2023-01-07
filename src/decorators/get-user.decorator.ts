import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserPayloadDetailsDto } from "../users/dtos/user-payload-details.dto";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) : UserPayloadDetailsDto => {

    const req = ctx.switchToHttp().getRequest();
    
    return <UserPayloadDetailsDto>{
        Id: req.user.Id,
        Email: req.user.Email,
    }

    // return req.user; // we know that the req contains user so we r returning it
})