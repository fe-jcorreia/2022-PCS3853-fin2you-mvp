export interface IBaseCollection<P> {
    getOneById: (id: string) => Promise<P | undefined>;
    getOneByField: (field: string, value: string) => Promise<P | undefined>;
    getAll: () => Promise<(P|undefined)[]>;
    insertOne: (entity: P) => Promise<P|undefined>;
    updateOne: (id: string, entity: P) => Promise<P|undefined>;
}

export interface IDatabase {
    connect: (connectionName?: string) => Promise<boolean>;
    closeConnection: () => Promise<boolean>;
    getCollection: <P>(collectionName: string) => IBaseCollection<P>;
}
