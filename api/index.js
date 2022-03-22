const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const consentId = "urn:bancoex:C1DD33123"
const accountId = "92792126019929279212650822221989319252576"

const resp_not_ok = {
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ],
  "meta": {
    "totalRecords": 1,
    "totalPages": 1,
    "requestDateTime": "2021-05-21T08:30:00Z"
  }
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// part 2 - get data, using previous token
server.get('/customers/v1/personal/identifications', (req, res) => {
  const newConsentId = req.headers.authorization

  const resp_ok = {
      "data": [
        {
          "updateDateTime": "2021-05-21T08:30:00Z",
          "personalId": "578-psd-71md6971kjh-2d414",
          "brandName": "Organização A",
          "civilName": "Juan Kaique Cláudio Fernandes",
          "socialName": "Jaqueline de Freitas",
          "birthDate": "2021-05-21",
          "maritalStatusCode": "SOLTEIRO",
          "maritalStatusAdditionalInfo": "Casado",
          "sex": "FEMININO",
          "companyCnpj": [
            "01773247000103",
            "01773247000563"
          ],
          "documents": {
            "cpfNumber": "25872252137",
            "passportNumber": "75253468744594820620",
            "passportCountry": "CAN",
            "passportExpirationDate": "2021-05-21",
            "passportIssueDate": "2021-05-21"
          },
          "otherDocuments": [
            {
              "type": "CNH",
              "typeAdditionalInfo": "NA",
              "number": "15291908",
              "checkDigit": "P",
              "additionalInfo": "SSP/SP",
              "expirationDate": "2021-05-21"
            }
          ],
          "hasBrazilianNationality": false,
          "nationality": [
            {
              "otherNationalitiesInfo": "CAN",
              "documents": [
                {
                  "type": "SOCIAL SEC",
                  "number": "423929299",
                  "expirationDate": "2021-05-21",
                  "issueDate": "2021-05-21",
                  "country": "Brasil",
                  "typeAdditionalInfo": "Informações adicionais."
                }
              ]
            }
          ],
          "filiation": [
            {
              "type": "PAI",
              "civilName": "Marcelo Cláudio Fernandes",
              "socialName": "NA"
            }
          ],
          "contacts": {
            "postalAddresses": [
              {
                "isMain": true,
                "address": "Av Naburo Ykesaki, 1270",
                "additionalInfo": "Fundos",
                "districtName": "Centro",
                "townName": "Marília",
                "ibgeTownCode": "3550308",
                "countrySubDivision": "SP",
                "postCode": "17500001",
                "country": "Brasil",
                "countryCode": "BRA",
                "geographicCoordinates": {
                  "latitude": "-90.8365180",
                  "longitude": "-180.836519"
                }
              }
            ],
            "phones": [
              {
                "isMain": true,
                "type": "FIXO",
                "additionalInfo": "Informações adicionais.",
                "countryCallingCode": "55",
                "areaCode": "19",
                "number": "29875132",
                "phoneExtension": "932"
              }
            ],
            "emails": [
              {
                "isMain": true,
                "email": "karinafernandes-81@br.inter.net"
              }
            ]
          }
        }
      ],
      "links": {
        "self": "https://api.banco.com.br/open-banking/api/v1/resource",
        "first": "https://api.banco.com.br/open-banking/api/v1/resource",
        "prev": "https://api.banco.com.br/open-banking/api/v1/resource",
        "next": "https://api.banco.com.br/open-banking/api/v1/resource",
        "last": "https://api.banco.com.br/open-banking/api/v1/resource"
      },
      "meta": {
        "totalRecords": 1,
        "totalPages": 1,
        "requestDateTime": "2021-05-21T08:30:00Z"
      }
    }

  const error_occured = (newConsentId != consentId)

  const status_number = ( error_occured ? 500 : 201 )
  const resp = ( error_occured ? resp_not_ok : resp_ok)
    
  res.status(status_number)
    .jsonp(resp)
})

// part 3 - get accountId
server.get('/accounts/v1/accounts', (req, res) => {
  const query = req.query
  // console.log(params)

  const newConsentId = req.headers.authorization

  const resp_ok = {
      "data": [
        {
          "brandName": "NuBank",
          "companyCnpj": "21128159000166",
          "type": "CONTA_DEPOSITO_A_VISTA",
          "compeCode": "001",
          "branchCode": "6272",
          "number": "94088392",
          "checkDigit": "4",
          "accountId": "92792126019929279212650822221989319252576"
        }
      ],
      "links": {
        "self": "https://api.banco.com.br/open-banking/api/v1/resource",
        "first": "https://api.banco.com.br/open-banking/api/v1/resource",
        "prev": "https://api.banco.com.br/open-banking/api/v1/resource",
        "next": "https://api.banco.com.br/open-banking/api/v1/resource",
        "last": "https://api.banco.com.br/open-banking/api/v1/resource"
      },
      "meta": {
        "totalRecords": 1,
        "totalPages": 1,
        "requestDateTime": "2021-05-21T08:30:00Z"
      }
    }

  const error_occured = (newConsentId != consentId)

  const status_number = ( error_occured ? 500 : 200 )
  const resp = ( error_occured ? resp_not_ok : resp_ok)
    
  res.status(status_number)
    .jsonp(resp)
})

// part 4 - get transactions
// /{accountId}/transactions
// /accounts/v1/accounts/{accountId}/transactions?compeCode=str&branchCode=stri&number=string&checkDigit=s
server.get('/accounts/v1/accounts/:accountId/transactions', (req, res) => {

  const newConsentId = req.headers.authorization
  const newAccountId = req.params.accountId
  const query = req.query

  console.log(query)

  const resp_ok = {
    "data": [
      {
        "transactionId": "TXpRMU9UQTROMWhZV2xSU1FUazJSMDl",
        "completedAuthorisedPaymentType": "TRANSACAO_EFETIVADA",
        "creditDebitType": "DEBITO",
        "transactionName": "TRANSFCWAR5TXHCX5I9IDBHML8082N8NEO30M6LNNG7ANAYIJYRM00ZBZPU8",
        "type": "PIX",
        "amount": 500.54,
        "transactionCurrency": "BRL",
        "transactionDate": "2021-01-07",
        "partieCnpjCpf": "43908445778",
        "partiePersonType": "PESSOA_NATURAL",
        "partieCompeCode": "001",
        "partieBranchCode": "6272",
        "partieNumber": "67890854360",
        "partieCheckDigit": "4"
      }
    ],
    "links": {
      "self": "https://api.banco.com.br/open-banking/api/v1/resource",
      "first": "https://api.banco.com.br/open-banking/api/v1/resource",
      "prev": "https://api.banco.com.br/open-banking/api/v1/resource",
      "next": "https://api.banco.com.br/open-banking/api/v1/resource",
      "last": "https://api.banco.com.br/open-banking/api/v1/resource"
    },
    "meta": {
      "totalRecords": 1,
      "totalPages": 1,
      "requestDateTime": "2021-05-21T08:30:00Z"
    }
  }

  const error_occured = (newConsentId != consentId || newAccountId != accountId)

  const status_number = ( error_occured ? 500 : 200 )
  const resp = ( error_occured ? resp_not_ok : resp_ok)
    
  res.status(status_number)
    .jsonp(resp)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// part 1 - consent
server.post('/consents/v1/consents', (req, res) => {
  /* 
  const data = req.body.data

  const doc = data.loggedUser.document
  const id = doc.identification
  const type = doc.rel

  const error_occured = isValidId(type, id)

  const permissions = data.permissions
  const expirationDateTime = data.expirationDateTime
  */

  const error_occured = false

  const data = req.body
  console.log(data)

  const creationDateTime = new Date().toISOString()
  const expirationDateTime = new Date().toISOString()
  const transactionFromDateTime = new Date().toISOString()
  const transactionToDateTime = new Date().toISOString()

  const resp_ok = {
    "data": {
      "consentId": consentId,
      "creationDateTime": creationDateTime,
      "status": "AWAITING_AUTHORISATION",
      "statusUpdateDateTime": creationDateTime,
      "permissions": [
        "ACCOUNTS_READ",
        "ACCOUNTS_OVERDRAFT_LIMITS_READ",
        "RESOURCES_READ"
      ],
      "expirationDateTime": expirationDateTime,
      "transactionFromDateTime": transactionFromDateTime,
      "transactionToDateTime": transactionToDateTime
    },
    "links": {
      "self": "https://api.banco.com.br/open-banking/api/v1/resource",
      "first": "https://api.banco.com.br/open-banking/api/v1/resource",
      "prev": "https://api.banco.com.br/open-banking/api/v1/resource",
      "next": "https://api.banco.com.br/open-banking/api/v1/resource",
      "last": "https://api.banco.com.br/open-banking/api/v1/resource"
    },
    "meta": {
      "totalRecords": 1,
      "totalPages": 1,
      "requestDateTime": creationDateTime
    }
  }
  

  const status_number = ( error_occured ? 500 : 201 )
  const resp = ( error_occured ? resp_not_ok : resp_ok)

  res.status(status_number)
    .jsonp(resp)
})


// Use default router
server.use(router)
server.listen(process.env.PORT, () => {
  console.log('JSON Server is running')
})