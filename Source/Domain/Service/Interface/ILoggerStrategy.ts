import type { LogLevels } from '@/Domain/Service/Enum';

export interface ILoggerStrategy {
    /**
     * Logs a message with the strategy's implementation.
     *
     * @param level - The log level at which the message should be logged. ({@link LogLevels})
     * @param date - The date at which the message was logged.
     * @param object - The object to log.
     */
    log(level: LogLevels, date: Date, object: unknown): void;
}
