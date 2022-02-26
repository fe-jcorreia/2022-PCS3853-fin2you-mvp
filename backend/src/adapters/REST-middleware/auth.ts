import { ITokenService } from '@application/ports';
import { IHTTPMiddleware } from '../ports/REST-controllers';

export const AuthenticationMiddlewareControllerFactory = ({
    tokenService,
}: {
    tokenService: ITokenService;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (req,__,query) => {
        // const token = req.
        if(!userId) throw new Error("Please provide a valid user id");

        
    };

    return {
        controller: fn,
        method: 'get',
        path: '/extracts'
    };
};

