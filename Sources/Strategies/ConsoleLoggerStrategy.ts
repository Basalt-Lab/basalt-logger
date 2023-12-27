import { ILoggerStrategy } from '@/Interfaces';
import { LogLevels } from '@/Enums';

/**
 * ConsoleLoggerStrategy implements ILoggerStrategy to provide logging functionality to the console.
 */
export class ConsoleLoggerStrategy implements ILoggerStrategy {

    /**
     * Logs a message to the console with the specified log level.
     * @param {LogLevels} level - The log level at which the message should be logged.
     * @param {Date} date - The date at which the message was logged.
     * @param {unknown} object - The object to log.
     */
    public log(level: LogLevels, date: Date, object: unknown): void {
        const prefixDate: string = `[${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
        const sanitizedObject: string = typeof object === 'string' ? object : JSON.stringify(object);
        const message: string = `${prefixDate} ${level} : ${sanitizedObject}`;
        switch (level) {
        case LogLevels.ERROR:
            console.error(message);
            break;
        case LogLevels.WARN:
            console.warn(message);
            break;
        case LogLevels.INFO:
            console.info(message);
            break;
        case LogLevels.DEBUG:
            console.debug(message);
            break;
        case LogLevels.LOG:
            console.log(message);
            break;
        }
    }
}
