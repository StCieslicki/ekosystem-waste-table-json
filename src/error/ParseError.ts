import { CustomError } from './CustomError';

export class ParseError extends CustomError {
    constructor(error: Error) {
        super(error);
    }
}