import { Request, Response, NextFunction } from 'express';
import {
    IHTTPController,
    IHTTPControllerPathDescriptor,
    IHTTPMiddleware,
} from '@adapters/REST-controllers';
import { IHTTPFrameworkAdapter } from './server';

export class ExpressControllerAdapter implements IHTTPFrameworkAdapter {
    adaptControllerFunction(fn: IHTTPController) {
        return async function (
            req: Request,
            res: Response,
        ) {
            const { response, statusCode } = await fn(
                req.params,
                req.body,
                req.query,
                {
                    user: (req as any).user
                }
            );
            res.status(statusCode).json(response);
        };
    }

    adaptMiddlewareControllerFunction(fn: IHTTPMiddleware) {
        return async function (
            req: Request,
            _: Response,
            next: NextFunction
        ) {
            await fn(req, req.headers);
            next()
        }
    }
    adaptPath() {
        return ''
    }
}
