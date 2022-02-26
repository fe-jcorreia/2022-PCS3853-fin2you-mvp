import { ICategorizeExtractsUseCase } from '@application/use-cases';
import { IHTTPController, IHTTPControllerDescriptor } from '../../ports/REST-controllers';

export const CategorizeExtractsControllerFactory = ({
    categorizeExtractUseCase,
}: {
    categorizeExtractUseCase: ICategorizeExtractsUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (params, body) => {
        const extractId = params.extractId;
        const category = body.category;
        const userId = body.userId;

        if(!category || !userId) throw new Error("Please provide a userId and a category");
        
        const resp = await categorizeExtractUseCase.execute({
            extractId,
            category,
            userId
        });

        return {
            response: resp,
            statusCode: 201,
        };
    };

    return {
        controller: fn,
        method: 'patch',
        path: '/extracts/:extractId'
    };
};

