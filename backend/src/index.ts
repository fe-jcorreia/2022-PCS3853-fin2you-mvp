import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true,
});
import { ExpressServer } from "./frameworks/http-server/app";
import { SignUpUseCaseFactory, LoginUseCaseFactory } from '@application/use-cases';
import { UserRepository } from '@adapters/repositories';
import { TypeORMDatabase, InMemoryDatabase } from '@frameworks/databases';
import { SignUpControllerFactory, LoginControllerFactory } from '@adapters/REST-controllers';
import { ExpressControllerAdapter } from '@frameworks/http';
import { BCryptEncryptionService, JWTTokenService } from '@frameworks/services';

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
    const tokenService = new JWTTokenService();

    // use cases
    const signUpUseCase = SignUpUseCaseFactory({ 
      userRepository,
      encryptionService
    });
    const loginUseCase = LoginUseCaseFactory({
      userRepository,
      encryptionService,
      tokenService
    })

    // controllers
    const signUpController = SignUpControllerFactory({
      signUpUseCase
    });
    const loginController = LoginControllerFactory({
      loginUseCase
    });

    // http server
    const expressAdapter = new ExpressControllerAdapter();
    const server = new ExpressServer({
      db: database,
      logger: { info: console.log, error: console.error },
      expressControllers: [signUpController,loginController].map(controller => ({
        method: controller.method,
        controller: expressAdapter.adaptControllerFunction(controller.controller),
        path: controller.path
      }))
    })
    await server.start();

  } catch(e) {
    console.error("Server instanciating failed",e);
  }
})();
