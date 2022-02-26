import { ILoginUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../../ports/REST-controllers';

export const LoginControllerFactory = ({
    loginUseCase,
}: {
    loginUseCase: ILoginUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body) => {
        const email = body.email;
        const password = body.password;

        const resp = await loginUseCase.execute({
            email,
            password
        });

        return {
            response: resp,
            statusCode: 201,
        };
    };

    return {
        controller: fn,
        method: 'post',
        path: '/login'
    };
};

