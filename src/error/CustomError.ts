export abstract class CustomError extends Error {
    customError: boolean;

    constructor(error: Error) {
        super(error.message);

        this.customError = true;
    }
}
