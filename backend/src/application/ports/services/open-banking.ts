export interface IOpenBankingService {
    getExtracts: (consentId: string, accountId: string) => Promise<any[]>;
    getAccountId: (consentId: string) => Promise<string>
    getConsentId: (cpf: string) => Promise<string>
}