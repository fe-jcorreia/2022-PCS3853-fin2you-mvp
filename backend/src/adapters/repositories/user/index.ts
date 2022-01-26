import { IUserRepository, UserDTO } from '@application/ports';
import { IBaseCollection, IDatabase } from '../ibase-repository';

export class UserRepository implements IUserRepository {
    private readonly collection: IBaseCollection<UserDTO>;

    constructor({ db }: { db: IDatabase }) {
        this.collection = db.getCollection('users');
    }

    getUserById(userId: string) {
        return this.collection.getOneById(userId);
    }

    insertUser(user: UserDTO) {
        return this.collection.insertOne(user);
    }
}

export default UserRepository;
