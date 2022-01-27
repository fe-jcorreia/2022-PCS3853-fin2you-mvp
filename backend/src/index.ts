import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true,
});
import { ExpressServer } from "./frameworks/http-server/app";
import { UseCaseFactory } from '@application/use-cases';
import { UserRepository } from '@adapters/repositories';
import { TypeORMDatabase, InMemoryDatabase } from '@frameworks/databases';
import { addUserControllerFactory } from '@adapters/REST-controllers';
import { ExpressControllerAdapter } from '@frameworks/http';

(async () => {
  let server: ExpressServer;
  let database;
  console.log("test")
  try {
    database = new InMemoryDatabase({ 
      dbConnectionName: process.env.NODE_ENV,
      logger: { info: console.log, error: console.error }
    });
    const connected = await database.connect();
    if(connected) {
      const userRepository = new UserRepository({ db: database });
      const useCase = UseCaseFactory({ userRepository });
      const controller = addUserControllerFactory({
        addUserUseCase: useCase
      });
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
    } else {
      console.log({database})
    }

  } catch(e) {
    console.error("Server instanciating failed",e);
  }
})();
