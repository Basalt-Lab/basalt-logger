import { appendFile } from 'fs';

import { ILoggerStrategy } from '@/Interfaces';
import { LogLevels } from '@/Enums';

/**
 * FileLoggerStrategy implements ILoggerStrategy to provide logging functionality to the file system.
 */
export class FileLoggerStrategy implements ILoggerStrategy {

    private readonly _path: string;

    /**
     * Constructor FileLoggerStrategy
     * @param path Path to the file to log to.
     */
    constructor(path: string) {
        this._path = path;
    }

    /**
     * Logs a message to the file system with the specified log level.
     * @param {LogLevels} level - The log level at which the message should be logged.
     * @param {string} message - The message to log.
     * @param {unknown} object - Optional additional information to log.
     */
    public log(level: LogLevels, message: string, object?: unknown): void {
        const fullMessage: string = object ? `${message} ${JSON.stringify(object)}` : message;
        appendFile(this._path, `${fullMessage}\n`, (err): void => {
            if (err) throw err;
        });
    }
}
