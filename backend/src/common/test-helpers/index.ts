import { UserDTO } from "@application/ports";

export class TestUserDTOHelper {
    user: UserDTO = {
        id: '1',
        email: 'valid@email.com',
        hashedPassword: 'hashed-password',
        name: 'valid',
        cpf: '12345',
        categories: [],
        extracts: [],
        consentId: '',
        accountId: ''
    }

    getUser() {
        return this.user;
    }

    withInvalidEmail() {
        this.user.email = 'invalid';
    }

}