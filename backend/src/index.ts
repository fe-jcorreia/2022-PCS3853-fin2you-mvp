import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true,
});
import { ExpressServer } from "./frameworks/http-server/app";
import { 
  SignUpUseCaseFactory, 
  LoginUseCaseFactory,
  GetExtractsUseCaseFactory,
  CategorizeExtractsUseCaseFactory
} from '@application/use-cases';
import { 
  UserRepository,
  ExtractRepository,
  CategoryRepository
} from '@adapters/repositories';
import { 
  TypeORMDatabase, 
  // InMemoryDatabase 
} from '@frameworks/databases';
import { 
  SignUpControllerFactory, 
  LoginControllerFactory,
  CategorizeExtractsControllerFactory,
  GetExtractsControllerFactory
} from '@adapters/REST-controllers';
import { ExpressControllerAdapter } from '@frameworks/http';
import { BCryptEncryptionService, JWTTokenService, OpenBankingService } from '@frameworks/services';

(async () => {
  try {
    const database = new TypeORMDatabase({ 
      dbConnectionName: process.env.NODE_ENV,
      // logger: { info: console.log, error: console.error }
    });
    await database.connect();

    // services and repositories
    const userRepository = new UserRepository({ db: database });
    const extractsRepository = new ExtractRepository({ db: database});
    const categoriesRepository = new CategoryRepository({ db: database});
    const encryptionService = new BCryptEncryptionService();
    const tokenService = new JWTTokenService();
    const openBankingService = new OpenBankingService();

    // use cases
    const signUpUseCase = SignUpUseCaseFactory({ 
      userRepository,
      encryptionService
    });
    const loginUseCase = LoginUseCaseFactory({
      userRepository,
      encryptionService,
      tokenService
    });
    const categorizeExtractUseCase = CategorizeExtractsUseCaseFactory({
      extractsRepository,
      categoriesRepository
    });
    const getExtractsUseCase = GetExtractsUseCaseFactory({
      extractsRepository,
      openBankingService,
      userRepository
    });

    // controllers
    const signUpController = SignUpControllerFactory({
      signUpUseCase
    });
    const loginController = LoginControllerFactory({
      loginUseCase
    });
    const getExtractController = GetExtractsControllerFactory({
      getExtractsUseCase
    });
    const categorizeExtractController = CategorizeExtractsControllerFactory({
      categorizeExtractUseCase
    });

    // http server
    const expressAdapter = new ExpressControllerAdapter();
    const server = new ExpressServer({
      db: database,
      logger: { info: console.log, error: console.error },
      nonAuthenticatedControllers: [signUpController,loginController].map(controller => ({
        method: controller.method,
        controller: expressAdapter.adaptControllerFunction(controller.controller),
        path: controller.path
      })),
      authenticatedControllers: [getExtractController,categorizeExtractController].map(controller => ({
        method: controller.method,
        controller: expressAdapter.adaptControllerFunction(controller.controller),
        path: controller.path
      })),
    })
    await server.start();

  } catch(e) {
    console.error("Server instanciating failed",e);
  }
})();
