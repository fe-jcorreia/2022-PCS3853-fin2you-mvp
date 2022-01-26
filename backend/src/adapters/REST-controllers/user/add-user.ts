import { IAddUserUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../ports';

export const addUserControllerFactory = ({
    addUserUseCase,
}: {
    addUserUseCase: IAddUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body) => {
        const email = body.email;
        const cpf = body.cpf;
        const name = body.name;

        console.log({body})
        await addUserUseCase.execute({
            email,
            cpf,
            name
        });

        return {
            response: '',
            statusCode: 201,
        };
    };

    return {
        controller: fn,
        method: 'post',
        path: '/user'
    };
};

export default addUserControllerFactory;
