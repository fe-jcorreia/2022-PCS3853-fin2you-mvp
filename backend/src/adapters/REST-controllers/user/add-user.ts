import { IAddUserUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../ports';

const addUserControllerFactory = ({
    addUserUseCase,
}: {
    addUserUseCase: IAddUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body) => {
        const email = body.email;
        const cpf = body.cpf;
        const name = body.name;

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
        path: [
            { resource: 'user', isParams: false },
        ],
    };
};

export default addUserControllerFactory;
