import { Category, Extract } from '@domain';
import {
    IUseCase,
    IUseCaseFactory,
    IExtractRepository,
    ICategoryRepository,
    ExtractDTO,
} from '../../ports';

export type CategorizeExtractsInputParams = {
    extractId: string;
    category: string;
    userId: string;
};
type Return = {
    success: boolean;
};
type Dependencies = {
    extractsRepository: IExtractRepository;
    categoriesRepository: ICategoryRepository;
};

export type ICategorizeExtractsUseCase = IUseCase<CategorizeExtractsInputParams, Return>;
export type ICategorizeExtractsUseCaseFactory = IUseCaseFactory<
    Dependencies,
    CategorizeExtractsInputParams,
    Return
>;

export const CategorizeExtractsUseCaseFactory: ICategorizeExtractsUseCaseFactory = ({
    extractsRepository,
    categoriesRepository
}) => {
    return {
        // will have to get the extracts of this category in a new call, because eager loading doesn't work with query.
        execute: async ({ userId, category: categoryName, extractId }) => {
            const categoryDTO = (await categoriesRepository.getByNameFromUser(userId, categoryName))[0];
            if(!categoryDTO) throw new Error(`Could not find a category named ${categoryName} associated with user ${userId}`);
            const newExtractDTO = await extractsRepository.getById(extractId);
            const categoryExtractDTOs = await extractsRepository.getByCategoryId(categoryDTO.id!);
            if(!newExtractDTO) throw new Error(`Could not find extract with id ${extractId}`);
            // not very idempotent :(
            if(newExtractDTO.category) throw new Error('That extract already has a category');

            console.log({categoryDTO, categoryExtractDTOs, newExtractDTO})
            // if I don't pass in user info, when I add this to db, will the unadded info be gone?
            // not using the typeorm functions here.
            const category = new Category({
                name: categoryDTO.name,
                total: categoryDTO.total,
                extracts: categoryExtractDTOs.map(dto => new Extract({id: dto.id}))
            });

            category.addNewExtract(new Extract({
                id: newExtractDTO.id,
                amount: newExtractDTO.amount
            }));

            await categoriesRepository.updateCategory({
                id: categoryDTO.id,
                total: category.total,
                extracts: [...categoryExtractDTOs, newExtractDTO]
            });
            // await extractsRepository.categorizeExtract(newExtractDTO.id!, newExtractDTO);
            // const extractDTO = await extractsRepository.
            return { success: true };
        },
    };
};
