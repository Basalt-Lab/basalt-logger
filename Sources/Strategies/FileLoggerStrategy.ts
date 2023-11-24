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
     */
    public log(level: LogLevels, message: string): void {
        appendFile(this._path, `${message}\n`, (err): void => {
            if (err) throw err;
        });
    }
}
