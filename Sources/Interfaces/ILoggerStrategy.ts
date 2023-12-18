import { LogLevels } from '@/Enums';

export interface ILoggerStrategy {
    /**
     * Logs a message with the strategy's implementation.
     * @param {LogLevels} level - The log level at which the message should be logged.
     * @param prefixDate
     * @param object
     */
    log(level: LogLevels, prefixDate: string, object: unknown): void;
}
