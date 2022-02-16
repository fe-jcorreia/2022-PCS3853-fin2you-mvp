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


# Nome	Tipo	Obrigatório	Descrição
# data	object	true	
# » consentId	string	true	O consentId é o identificador único do consentimento e deverá ser um URN - Uniform Resource Name.
# Um URN, conforme definido na RFC8141 é um Uniform Resource
# Identifier - URI - que é atribuído sob o URI scheme "urn" e um namespace URN específico, com a intenção de que o URN
# seja um identificador de recurso persistente e independente da localização.
# Considerando a string urn:bancoex:C1DD33123 como exemplo para consentId temos:
# - o namespace(urn)
# - o identificador associado ao namespace da instituição transnmissora (bancoex)
# - o identificador específico dentro do namespace (C1DD33123).
# Informações mais detalhadas sobre a construção de namespaces devem ser consultadas na RFC8141.
# » creationDateTime	string(date-time)	true	Data e hora em que o recurso foi criado. Uma string com data e hora conforme especificação RFC-3339, sempre com a utilização de timezone UTC(UTC time format).
# » status	string	true	Estado atual do consentimento cadastrado.
# » statusUpdateDateTime	string(date-time)	true	Data e hora em que o recurso foi atualizado. Uma string com data e hora conforme especificação RFC-3339, sempre com a utilização de timezone UTC(UTC time format).
# » permissions	[string]	true	Especifica os tipos de permissões de acesso às APIs no escopo do Open Banking Brasil - Fase 2, de acordo com os blocos de consentimento fornecidos pelo usuário e necessários ao acesso a cada endpoint das APIs.
# » expirationDateTime	string(date-time)	true	Data e hora de expiração da permissão. De preenchimento obrigatório, reflete a data limite de validade do consentimento. Uma string com data e hora conforme especificação RFC-3339, sempre com a utilização de timezone UTC(UTC time format).
# » transactionFromDateTime	string(date-time)	false	Data e hora da transação inicial. Se não for preenchido, a transação terá a data aberta e a data será retornada com a primeira transação disponível. Uma string com data e hora conforme especificação RFC-3339, sempre com a utilização de timezone UTC(UTC time format).
# » transactionToDateTime	string(date-time)	false	Data e hora final da transação. Se não for preenchido, a transação terá a data aberta e a data será retornada com a ultima transação disponível. Uma string com data e hora conforme especificação RFC-3339, sempre com a utilização de timezone UTC(UTC time format).
# links	Links	false	Referências para outros recusos da API requisitada.
# meta	Meta	false	Meta informações referente à API requisitada.