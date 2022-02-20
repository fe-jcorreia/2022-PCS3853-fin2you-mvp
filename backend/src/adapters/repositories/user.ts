import { IUserRepository, UserDTO } from '@application/ports';
import { IBaseCollection, IDatabase } from './ibase-repository';

export class UserRepository implements IUserRepository {
    private readonly collection: IBaseCollection<UserDTO>;

    constructor({ db }: { db: IDatabase }) {
        this.collection = db.getCollection('users');
    }

    getUserById(userId: string) {
        return this.collection.getOneById(userId);
    }
    getUserByEmail(email: string) {
        return this.collection.getOneByOwnField('email', email);
    }
    insertUser(user: UserDTO) {
        return this.collection.insertOne(user);
    }
    async updateUser(id: string, user: UserDTO) {
        try{
            await this.collection.updateOne(id, user);
        } catch (e){
            console.log({e})
            return false;
        }
        return true;
    }
}

export default UserRepository;
