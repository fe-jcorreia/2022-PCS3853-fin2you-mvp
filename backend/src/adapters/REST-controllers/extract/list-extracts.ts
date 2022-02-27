import { IGetExtractsUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../../ports/REST-controllers';

export const GetExtractsControllerFactory = ({
    getExtractsUseCase,
}: {
    getExtractsUseCase: IGetExtractsUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_,__,query, { user }) => {
        console.log(user);
        const userId = query.userId;
        if(!userId) throw new Error("Please provide a valid user id");

        const resp = await getExtractsUseCase.execute({
            userId,
        });

        return {
            response: resp,
            statusCode: 200,
        };
    };

    return {
        middleware: "auth",
        controller: fn,
        method: 'get',
        path: '/extracts'
    };
};

