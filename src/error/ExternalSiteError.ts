import {CustomError} from "./CustomError";

export class ExternalSiteError extends CustomError {
    constructor(error: Error) {
        super(error);
    }
}