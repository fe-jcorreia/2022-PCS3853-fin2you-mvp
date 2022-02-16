import { IExtractRepository, ExtractDTO } from '@application/ports';
import { Extract } from '@domain';
import { IBaseCollection, IDatabase } from '../ibase-repository';

export class ExtractRepository implements IExtractRepository {
    private readonly collection: IBaseCollection<ExtractDTO>;

    constructor({ db }: { db: IDatabase }) {
        this.collection = db.getCollection('users');
    }

    getAllFromUser(userId: string) {
        return this.collection.getManyByField('userId', userId);
    }
    categorizeExtract(extractId: string, extract: ExtractDTO) {
        return this.collection.updateOne(extractId, extract);
    }
}

export default ExtractRepository;
