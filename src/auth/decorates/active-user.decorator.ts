import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserType } from '../interfaces/active-user-type.interface';

export const ActiveUser = createParamDecorator(
    (field: keyof ActiveUserType, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        // console.log(request);

        const user: ActiveUserType = request.user;

        // console.log(user);

        return field ? user?.[field] : user;
    },
);
