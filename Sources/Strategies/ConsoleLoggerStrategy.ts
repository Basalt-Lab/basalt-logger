import { ILoggerStrategy } from '@/Interfaces';
import { LogLevels } from '@/Enums';

/**
 * ConsoleLoggerStrategy implements ILoggerStrategy to provide logging functionality to the console.
 */
export class ConsoleLoggerStrategy implements ILoggerStrategy {

    /**
     * Logs a message to the console with the specified log level.
     * @param {LogLevels} level - The log level at which the message should be logged.
     * @param {string} message - The message to log.
     * @param {unknown} object - Optional additional information to log.
     */
    public log(level: LogLevels, message: string, object?: unknown): void {
        switch (level) {
        case LogLevels.ERROR:
            console.error(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.WARN:
            console.warn(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.INFO:
            console.info(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.DEBUG:
            console.debug(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.LOG:
            console.log(message + (object ? ' ' + object : ''));
            break;
        default:
            break;
        }
    }
}
