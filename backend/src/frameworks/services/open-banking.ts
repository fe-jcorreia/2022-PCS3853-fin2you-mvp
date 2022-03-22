import { IOpenBankingService } from "@application/ports";
import axios from 'axios';

export class OpenBankingService implements IOpenBankingService {

    _baseUrl: string = 'https://fin2you-bank.herokuapp.com';
    // _baseUrl: string = 'http://localhost:3000';
    async getExtracts(consentId: string, accountId: string) {
        const { data } = await axios.get(`${this._baseUrl}/accounts/v1/accounts/${accountId}/transactions?compeCode=str&branchCode=stri&number=string&checkDigit=s`, {
            headers: {
                Authorization: consentId
            }
        });
        return data.data.map(extract => ({
            id: extract.transactionId,
            type: extract.creditDebitType,
            amount: extract.amount,
            description: extract.type,
            timeStamp: extract.transactionDate
        }))
    }

    async getConsentId(cpf: string) {
      try {
        const { data } = await axios.post(`${this._baseUrl}/consents/v1/consents`,{
          "data": {
            "loggedUser": {
              "document": {
                "identification": cpf,
                "rel": "CPF"
              }
            },             
            "permissions": [
              "ACCOUNTS_READ",
              "ACCOUNTS_OVERDRAFT_LIMITS_READ",
              "RESOURCES_READ"
            ],
            "expirationDateTime": "2023-05-21T08:30:00Z"
          }
        }) 
        return data.data.consentId;
      } catch (e) {
        throw e;
        // console.log('axios error',e)
      }

    }

    async getAccountId(consentId: string) {
        const { data } = await axios.get(`${this._baseUrl}/accounts/v1/accounts`, {
            headers: {
                Authorization: consentId
            }
        })
        return data.data[0].accountId;
    }
}