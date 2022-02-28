import { ITokenService } from '@application/ports';
import { IHTTPMiddleware, IHTTPMiddlewareControllerDescriptor } from '../ports/REST-controllers';
import { MissingTokenError, MalformedTokenError } from '@common/errors';

export const AuthenticationMiddlewareControllerFactory = ({
    tokenService,
}: {
    tokenService: ITokenService;
}): IHTTPMiddlewareControllerDescriptor => {
    const fn: IHTTPMiddleware = async (req, headers) => {
        if(!headers.authorization) throw new MissingTokenError();
        const auth = headers.authorization.split(' ');
        if(auth[0] !== "Bearer") throw new MalformedTokenError();
        const token = auth[1];
        const user = await tokenService.verify(token);
        req.user = user;
    };

    return {
        controller: fn,
    };
};

