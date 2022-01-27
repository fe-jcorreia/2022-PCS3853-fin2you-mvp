import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true,
});
import { ExpressServer } from "./frameworks/http-server/app";
import { SignUpUseCaseFactory } from '@application/use-cases';
import { UserRepository } from '@adapters/repositories';
import { TypeORMDatabase, InMemoryDatabase } from '@frameworks/databases';
import { SignUpControllerFactory } from '@adapters/REST-controllers';
import { ExpressControllerAdapter } from '@frameworks/http';
import { BCryptEncryptionService } from '@frameworks/services';

(async () => {
  try {
    const database = new InMemoryDatabase({ 
      dbConnectionName: process.env.NODE_ENV,
      logger: { info: console.log, error: console.error }
    });
    await database.connect();

    // services
    const userRepository = new UserRepository({ db: database });
    const encryptionService = new BCryptEncryptionService();

    // use cases
    const signUpUseCase = SignUpUseCaseFactory({ 
      userRepository,
      encryptionService
    });

    // controllers
    const controller = SignUpControllerFactory({
      signUpUseCase
    });

    // http server
    const expressAdapter = new ExpressControllerAdapter();
    const server = new ExpressServer({
      db: database,
      logger: { info: console.log, error: console.error },
      expressControllers: [{
        method: controller.method,
        controller: expressAdapter.adaptControllerFunction(controller.controller),
        path: controller.path
      }]
    })
    await server.start();

  } catch(e) {
    console.error("Server instanciating failed",e);
  }
})();
