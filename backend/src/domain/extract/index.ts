import { Category } from '../category';

interface ExtractConstructorParams {
    id: string;
    value: number;
    timeStamp: string;
    category: Category;
    description: string;
    type: 'debit' | 'credit'
}
export class Extract {
    public id: string;
    public value: number;
    public timeStamp: string;
    public category: Category;
    public description: string;
    public type: string;

    constructor(args: Partial<ExtractConstructorParams>) {
        if(args.id) this.id = args.id;
        if(args.value) this.value = args.value;
        if(args.timeStamp) this.timeStamp = args.timeStamp;
        if(args.category) this.category = args.category;
        if(args.type) this.type = args.type;
        if(args.description) this.description = args.description;
    }

}