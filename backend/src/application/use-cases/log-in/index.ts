import {
    IUseCase,
    IUseCaseFactory,
    IUserRepository,
    UserDTO,
    IEncryptionService,
    ITokenService
} from '../../ports';
import { User } from '@domain';


export type LoginInputParams = {
    email: string;
    password: string;
};
type Return = {
    token: string;
};
type Dependencies = {
    userRepository: IUserRepository;
    encryptionService: IEncryptionService;
    tokenService: ITokenService;
};

export type ILoginUseCase = IUseCase<LoginInputParams, Return>;
export type ILoginUseCaseFactory = IUseCaseFactory<
    Dependencies,
    LoginInputParams,
    Return
>;

export const LoginUseCaseFactory: ILoginUseCaseFactory = ({
    userRepository,
    encryptionService,
    tokenService
}) => {
    return {
        execute: async ({ email, password }) => {
            const userDTO = await userRepository.getUserByEmail(email);

            if(!userDTO) {
                throw new Error('E-mail not found');
            }
            const passwordValid = await encryptionService.compare(password,userDTO.hashedPassword);
            
            if(!passwordValid) {
                throw new Error('Invalid Login credentials');
            }

            const token = tokenService.generate({
                email: userDTO.email,
                name: userDTO.name
            });

            return { token, name: userDTO.name, email: userDTO.email };
        },
    };
};
