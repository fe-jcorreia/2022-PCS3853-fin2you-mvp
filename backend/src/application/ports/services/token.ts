export interface ITokenService {
    generate: (payload: any) => string;
    verify: (token: string) => Promise<({
        email: string;
        name: string;
    })>
}