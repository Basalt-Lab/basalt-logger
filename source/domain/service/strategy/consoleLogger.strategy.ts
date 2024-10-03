import { LogLevels, type LoggerStrategy } from '#/common/types/index.ts';

/**
 * ConsoleLoggerStrategy implements LoggerStrategy to provide logging functionality to the console. ({@link LoggerStrategy})
 */
export class ConsoleLoggerStrategy implements LoggerStrategy {
    private readonly _colorize: boolean;

    /**
     * Initializes the ConsoleLoggerStrategy.
     *
     * @param colorize - Indicates if the output should be colorized.
     */
    public constructor(colorize = false) {
        this._colorize = colorize;
    }

    /**
     * Logs a message to the console with the specified log level.
     *
     * @param level - The log level at which the message should be logged. ({@link LogLevels})
     * @param date - The date at which the message was logged.
     * @param object - The object to log.
     */
    public log(level: LogLevels, date: Date, object: unknown): void {
        const dateColor = this._colorize ? '\x1b[33m' : '';
        const colorReset = this._colorize ? '\x1b[0m' : '';
        const sanitizedObject: string = typeof object === 'string' ? object : JSON.stringify(object);
        let logLevelColor = '';
        switch (level) {
        case LogLevels.ERROR:
            logLevelColor = this._colorize ? '\x1b[31m' : '';
            break;
        case LogLevels.WARN:
            logLevelColor = this._colorize ? '\x1b[33m' : '';
            break;
        case LogLevels.INFO:
            logLevelColor = this._colorize ? '\x1b[36m' : '';
            break;
        case LogLevels.DEBUG:
            logLevelColor = this._colorize ? '\x1b[35m' : '';
            break;
        default:
            logLevelColor = this._colorize ? '\x1b[37m' : '';
            break;
        }
        const prefixDate: string = `[${dateColor}${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}${colorReset}]`;
        const message: string = `${prefixDate} ${logLevelColor}${level}${colorReset} : ${sanitizedObject}`;
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
        default:
            break;
        }
    }
}
