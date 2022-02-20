import express, { Express, RequestHandler } from 'express';
import 'express-async-errors';
import { NotFoundError } from '@iagosrm/common';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import { Server as WSServer } from 'socket.io';
import { errorHandler, startPolyglot } from '@iagosrm/common';
import { Messages } from '@common/locales';
import {
    Server as AbstractServer,
    IHTTPServerConstructorParams,
} from './server';
import { IHTTPControllerDescriptor } from '@adapters/REST-controllers';

interface IExpressConstructorParams extends IHTTPServerConstructorParams {
    nonAuthenticatedControllers: IHTTPControllerDescriptor<RequestHandler>[];
    authenticatedControllers: IHTTPControllerDescriptor<RequestHandler>[];

}

export class ExpressServer extends AbstractServer {
    _app: Express;
    baseUrn = 'api/v1';
    _logger: any;
    _io: WSServer;

    constructor({ db, logger, nonAuthenticatedControllers, authenticatedControllers}: IExpressConstructorParams) {
        
        super({ db, logger });
        this._app = express();
        this.setupServer(this._app);

        // CORS
        const allowlist = process.env.CORS_ALLOW?.split(' ');
        const corsOptionsDelegate = function (req, callback) {
            let corsOptions;
            if (allowlist?.indexOf(req.header('Origin')) !== -1) {
                corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
            } else {
                corsOptions = { origin: false }; // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        };
        this._app.use(cors(corsOptionsDelegate));

        //Middleware
        this._app.use(json());
        this._app.use(startPolyglot(Messages));

        // Security
        this._app.use(helmet());
        this._app.disable('x-powered-by');

        nonAuthenticatedControllers.forEach((descriptor) => {
            this._app[descriptor.method](
                descriptor.path,
                descriptor.controller
            );
        });

        authenticatedControllers.forEach((descriptor) => {
            this._app[descriptor.method](
                descriptor.path,
                descriptor.controller
            );
        });

        this._app.all('*', () => {
            throw new NotFoundError();
        });

        this._app.use(errorHandler);
    }
}
