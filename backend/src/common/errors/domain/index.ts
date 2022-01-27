import { CustomError } from '../custom-error';
import { DomainErrorMessages } from '@common/locales';

export class InvalidParametersError extends CustomError {
    HTTPstatusCode = 400;
    constructor(message) {
        super(message);
    }
}
