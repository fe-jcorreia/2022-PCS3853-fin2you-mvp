import {
    IUseCase,
    IUseCaseFactory,
    IUserRepository,
    UserDTO,
    IEncryptionService,
    IOpenBankingService
} from '../ports';
import { User } from '@domain';
import { CategoryDTO } from '@/application/ports/repository/category';

export type InputParams = {
    email: string;
    cpf: string;
    name: string;
    password: string;
};
type Return = void;
type Dependencies = {
    userRepository: IUserRepository;
    encryptionService: IEncryptionService;
    openBankingService: IOpenBankingService;
};

export type ISignUpUseCase = IUseCase<InputParams, Return>;
export type ISignUpUseCaseFactory = IUseCaseFactory<
    Dependencies,
    InputParams,
    Return
>;

export const SignUpUseCaseFactory: ISignUpUseCaseFactory = ({
    userRepository,
    encryptionService,
    openBankingService
}) => {
    return {
        execute: async ({ email, cpf, name, password }) => {
            const user = new User({ email, cpf, name, password });
            const categoryDTOs = user.categories.map(category => {
                const dto = new CategoryDTO();
                dto.name = category.name
                dto.total = 0;
                return dto;
            });

            const consentId = await openBankingService.getConsentId(user.getCPF());
            const accountId = await openBankingService.getAccountId(consentId);

            const userDTO = {
                email: user.getEmail(),
                cpf: user.getCPF(),
                name: user.getName(),
                hashedPassword: await encryptionService.encrypt(user.getPassword()),
                extracts: [],
                categories: categoryDTOs,
                accountId,
                consentId
            };
            // console.log(userDTO)
            await userRepository.insertUser(userDTO)
        },
    };
};
