import {
    UserDTO,
    ExtractDTO
} from '.';

export interface IUserRepository {
    getUserById: (id: string) => Promise<UserDTO | undefined>;
    getUserByEmail: (email: string) => Promise<UserDTO | undefined>;
    insertUser: (user: UserDTO) => Promise<UserDTO | undefined>;
}

export interface IExtractRepository {
    getAllFromUser: (userId: string) => Promise<ExtractDTO[] | undefined>;
    addExtracts: (extracts: ExtractDTO[]) => Promise<(ExtractDTO | undefined)[]>
    categorizeExtract: (extractID: string, extract: ExtractDTO) => Promise<ExtractDTO|undefined>;
}

export interface ICategoryRepository {
    getAllFromUser: (userId: string) => Promise<ExtractDTO[]>;
    updateCategorySum: (categoryId: string) => Promise<boolean>;
}