import http.client

conn = http.client.HTTPSConnection("example.com")

payload = "{\"data\":{\"loggedUser\":{\"document\":{\"identification\":\"11111111111\",\"rel\":\"CPF\"}},\"businessEntity\":{\"document\":{\"identification\":\"11111111111111\",\"rel\":\"CNPJ\"}},\"permissions\":[\"ACCOUNTS_READ\",\"ACCOUNTS_OVERDRAFT_LIMITS_READ\",\"RESOURCES_READ\"],\"expirationDateTime\":\"2021-05-21T08:30:00Z\",\"transactionFromDateTime\":\"2021-01-01T00:00:00Z\",\"transactionToDateTime\":\"2021-02-01T23:59:59Z\"}}"

headers = {
    'Content-Type': "application/json",
    'Accept': "application/json",
    'Authorization': "string",
    # optional 'x-fapi-auth-date': "stringstringstringstringstrin",
    # optional 'x-fapi-customer-ip-address': "string",
    # optional 'x-fapi-interaction-id': "string",
    # optional 'x-customer-user-agent': "string"
    }

conn.request("POST", "/consents/v1/consents", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))

# {
#   "data": {
#     "consentId": "urn:bancoex:C1DD33123",
#     "creationDateTime": "2021-05-21T08:30:00Z",
#     "status": "AWAITING_AUTHORISATION",
#     "statusUpdateDateTime": "2021-05-21T08:30:00Z",
#     "permissions": [
#       "ACCOUNTS_READ",
#       "ACCOUNTS_OVERDRAFT_LIMITS_READ",
#       "RESOURCES_READ"
#     ],
#     "expirationDateTime": "2021-05-21T08:30:00Z",
#     "transactionFromDateTime": "2021-01-01T00:00:00Z",
#     "transactionToDateTime": "2021-02-01T23:59:59Z"
#   },
#   "links": {
#     "self": "https://api.banco.com.br/open-banking/api/v1/resource",
#     "first": "https://api.banco.com.br/open-banking/api/v1/resource",
#     "prev": "https://api.banco.com.br/open-banking/api/v1/resource",
#     "next": "https://api.banco.com.br/open-banking/api/v1/resource",
#     "last": "https://api.banco.com.br/open-banking/api/v1/resource"
#   },
#   "meta": {
#     "totalRecords": 1,
#     "totalPages": 1,
#     "requestDateTime": "2021-05-21T08:30:00Z"
#   }
# }