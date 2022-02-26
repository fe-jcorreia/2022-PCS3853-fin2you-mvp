import { Request, Response, NextFunction } from 'express';
import {
    IHTTPController,
    IHTTPControllerPathDescriptor,
} from '@adapters/REST-controllers';
import { IHTTPFrameworkAdapter } from './server';

export class ExpressControllerAdapter implements IHTTPFrameworkAdapter {
    adaptControllerFunction(fn: IHTTPController) {
        return async function (
            req: Request,
            res: Response,
        ) {
            console.log(req)
            const { response, statusCode } = await fn(
                req.params,
                req.body,
                req.query,
                req.headers
            );
            res.status(statusCode).json(response);
        };
    }

    adaptPath() {
        return ''
    }
}
