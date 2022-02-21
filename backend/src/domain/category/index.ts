import { Extract } from "../extract";
import { User } from '../user';

interface CategoryConstructorParams {
    id: string;
    name: string;
    extracts: Extract[];
    total: number;
}

export class Category {
    public id?: string;
    public name: string;
    public extracts: Extract[];
    public total: number;
    public user: User

    constructor(args: Partial<CategoryConstructorParams>) {
        if(args.id) this.id = args.id;
        if(args.name) this.name = args.name;
        this.extracts = args.extracts || [];
        this.total = args.total || 0;
    }

    addNewExtract(extract: Extract) {
        // console.log({extract})
        // console.log(this.extracts)
        // not very idempotent :(
        if(this.extracts.findIndex(e => e.id === extract.id) !== -1) {
            throw new Error("This extract already belongs to this category");
        }
        // this.extracts.push(extract);
        this.total += extract.amount;
        this.extracts.push(extract);
    }
}

export * from './categories';