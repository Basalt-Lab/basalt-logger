import { ILoggerStrategy } from '@/Interfaces';
import { LogLevels } from '@/Enums';

/**
 * ConsoleLoggerStrategy implements ILoggerStrategy to provide logging functionality to the console.
 */
export class ConsoleLoggerStrategy implements ILoggerStrategy {

    /**
     * Logs a message to the console with the specified log level.
     * @param {LogLevels} level - The log level at which the message should be logged.
     * @param prefixDate
     * @param object
     */
    public log(level: LogLevels, prefixDate: string, object: unknown): void {
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
