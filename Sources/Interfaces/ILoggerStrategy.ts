import { LogLevels } from '@/Enums';

export interface ILoggerStrategy {
    /**
     * Logs a message with the strategy's implementation.
     * @param {LogLevels} level - The log level at which the message should be logged.
     * @param {Date} date - The date at which the message was logged.
     * @param {unknown} object - The object to log.
     */
    log(level: LogLevels, date: Date, object: unknown): void;
}
