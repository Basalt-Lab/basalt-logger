/**
 * BasaltLoggerError extends the standard Error class to provide custom error handling for BasaltLogger.
 */
export class BasaltLoggerError extends Error {
    /**
     * Constructs a new BasaltLoggerError.
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        message = 'BasaltLoggerError: ' + message;
        super(message);
        this.name = 'BasaltLoggerError';
    }
}
