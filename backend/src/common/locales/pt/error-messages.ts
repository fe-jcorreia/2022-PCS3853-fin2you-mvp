import { 
    ErrorMessages 
} from '..';

export const Portuguese = {
    [ErrorMessages.DATABASE_ERROR]:
        'Algo deu errado para se conectar ao banco de dados.',
    [ErrorMessages.CANNOT_ALTER_THIS_USER]: 
        'Você não tem autorização para alterar este usuário.',
    [ErrorMessages.INVALID_CREDENTIALS]:
        'E-mail ou senha incorretos.',
    [ErrorMessages.INVALID_TOKEN]:
        'Token expirado. Por favor, realize o login novamente.',
    [ErrorMessages.PARAMETER_NOT_PROVIDED]: 
        'Algum parâmetro não foi fornecido. Por favor, consultar a documentação.',
    [ErrorMessages.EXTRACT_NOT_FOUND]: 'Extrato não encontrado.',
    [ErrorMessages.CATEGORY_NOT_FOUND]: 'Categoria não encontrada.',
    [ErrorMessages.USER_NOT_FOUND]: 'Usuário não encontrado.',

};
