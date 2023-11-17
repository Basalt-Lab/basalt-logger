export class BasaltLoggerError extends Error {
    constructor(message: string) {
        message = 'BasaltLoggerError: ' + message;
        super(message);
        this.name = 'BasaltLoggerError';
    }
}
