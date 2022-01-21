interface UserConstructorParams {
    id: string;
    email: string;
}

export class User {
    public id: string;
    private email: string;

    constructor(args: Partial<UserConstructorParams>) {
        this.id = args.id || '';
        this.validateEmail(args.email);
        this.email = args.email!;
    }

    validateEmail(email: string | undefined) {
        if(email === 'zoado' || !email) throw new Error();
        return true;
    }

}
