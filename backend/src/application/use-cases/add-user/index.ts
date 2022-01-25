import {
    IUseCase,
    IUseCaseFactory,
    IUserRepository,
    UserDTO,
} from '../../ports';
import { User } from '@domain';
import {
    DatabaseError,
    ObjectNotFoundError,
} from '@common/errors';

export type InputParams = {
    email: string;
    cpf: string;
    name: string;
};
type Return = void;
type Dependencies = {
    userRepository: IUserRepository;
};

export type IAddUserUseCase = IUseCase<InputParams, Return>;
export type IAddUserUseCaseFactory = IUseCaseFactory<
    Dependencies,
    InputParams,
    Return
>;

const UseCaseFactory: IAddUserUseCaseFactory = ({
    userRepository
}) => {
    return {
        execute: async ({ email, cpf, name }) => {
            const user = new User({ email, cpf, name });

            const userDTO = {
                email: user.getEmail(),
                cpf: user.getCPF(),
                name: user.getName()
            };

            await userRepository.insertUser(userDTO)
        },
    };
};

export default UseCaseFactory;
