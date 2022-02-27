import { ITokenService } from '@application/ports';
import { IHTTPMiddleware, IHTTPMiddlewareControllerDescriptor } from '../ports/REST-controllers';

export const AuthenticationMiddlewareControllerFactory = ({
    tokenService,
}: {
    tokenService: ITokenService;
}): IHTTPMiddlewareControllerDescriptor => {
    const fn: IHTTPMiddleware = async (req, headers) => {
        const auth = headers.authentication.split(' ');
        if(auth[0] !== "Bearer") throw new Error("Malformed token");
        const token = auth[1];
        const user = await tokenService.verify(token);
        req.user = user;
    };

    return {
        controller: fn,
    };
};

