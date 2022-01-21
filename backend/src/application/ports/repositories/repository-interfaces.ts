import {
    UserDTO,
} from '.';

export interface IUserRepository {
    getUserById: (id: string) => Promise<UserDTO>;
}

