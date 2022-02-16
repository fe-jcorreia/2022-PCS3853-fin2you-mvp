import { Extract } from "../extract";
import { User } from '../user';

interface CategoryConstructorParams {
    id: string;
    name: string;
    extracts: Extract[];
    total: number;
}

export class Category {
    public id: string;
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
}

export * from './categories';