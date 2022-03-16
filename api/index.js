const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/customers/v1/personal/identifications', (req, res) => {
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
    
  res.jsonp(req.query)
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

server.post('/consents/v1/consents', (req, res) => {
  console.log(req);
  const resp_ok = {
    "data": {
      "consentId": "urn:bancoex:C1DD33123",
      "creationDateTime": "2021-05-21T08:30:00Z",
      "status": "AWAITING_AUTHORISATION",
      "statusUpdateDateTime": "2021-05-21T08:30:00Z",
      "permissions": [
        "ACCOUNTS_READ",
        "ACCOUNTS_OVERDRAFT_LIMITS_READ",
        "RESOURCES_READ"
      ],
      "expirationDateTime": "2021-05-21T08:30:00Z",
      "transactionFromDateTime": "2021-01-01T00:00:00Z",
      "transactionToDateTime": "2021-02-01T23:59:59Z"
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
      "requestDateTime": "2021-05-21T08:30:00Z"
    }
  }

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
  
  const error_occured = Math.random() > 0.9;

  const status_number = ( error_occured ? 500 : 201 )
  const resp = ( error_occured ? resp_not_ok : resp_ok)
  

  res.status(status_number)
    .jsonp(resp)
})



// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})