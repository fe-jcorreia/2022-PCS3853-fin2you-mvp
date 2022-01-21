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

export type InputParams = {};
type Return = {};
type Dependencies = {
    userRepository: IUserRepository;
};

export type IAddToCartUseCase = IUseCase<InputParams, Return>;
export type IAddToCartUseCaseFactory = IUseCaseFactory<
    Dependencies,
    InputParams,
    Return
>;

const UseCaseFactory: IAddToCartUseCaseFactory = ({
}) => {
    return {
        execute: async (_) => {
            return {};
        },
    };
};

export default UseCaseFactory;
