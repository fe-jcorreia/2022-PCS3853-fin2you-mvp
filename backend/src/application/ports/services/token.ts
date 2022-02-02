export interface ITokenService {
    generate: (payload: {
        email: string;
        name: string;
    }) => string;
    verify: (token: string) => Promise<({
        email: string;
        name: string;
    })>
}