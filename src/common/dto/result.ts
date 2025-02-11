export class Result {
    success: boolean;
    message?: string;
    statusCode: number;

    constructor(success: boolean, statusCode: number, message?: string) {
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
    }

    static success(successMessage?: string): Result {
        return new Result(true, 200, successMessage)
    }


    static failure(statusCode: number, failureMessage?: string): Result {
        return new Result(false, statusCode, failureMessage);
    }
}