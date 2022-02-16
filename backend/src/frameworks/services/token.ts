import { ITokenService } from "@application/ports";
import jwt from 'jsonwebtoken';
import { promisify } from "util";

export class JWTTokenService implements ITokenService {
    token_secret = 'afndfdsfjhcjnkwcw';

    generate(args: any) {
       return jwt.sign({
           exp: Math.floor(Date.now() / 1000) + (60 * 60),
           data: args
       }, this.token_secret);
    }

    async verify(token: string) {
        // const verify = promisify(jwt.verify);
        const payload = jwt.verify(token,this.token_secret);
        console.log({payload});
        return {
            email: "",
            name: ""
        }
    }
}