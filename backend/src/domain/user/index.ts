interface UserConstructorParams {
    id: string;
    email: string;
    cpf: string;
    name: string;
}

export class User {
    public id: string;
    private email: string;
    private cpf: string;
    private name: string;

    constructor(args: Partial<UserConstructorParams>) {
        if(args.id) this.id = args.id;
        this.validateEmail(args.email);
        this.email = args.email!;
        this.validateCPF(args.cpf);
        this.cpf = args.cpf!;
        this.name = args.name || "";
    }

    validateEmail(email: string | undefined) {
        if(email === 'zoado' || !email) throw new Error();
        return true;
    }

    validateCPF(cpf: string | undefined) {
        if(cpf === 'zoado' || !cpf) throw new Error();
        return true;
    }

    getEmail() {
        return this.email;
    }

    getCPF() {
        return this.cpf;
    }

    getName() {
        return this.name;
    }

}
