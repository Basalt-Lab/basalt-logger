import { Writable } from 'stream';

import { ILoggerStrategy } from "@/Interfaces";
import { LogLevels } from '@/Enums';
import { BasaltLoggerError } from '@/Errors';

/**
 * BasaltLogger provides a flexible logging system that allows multiple strategies for log output.
 */
export class BasaltLogger {
    /**
     * Stores the logging strategies mapped by their names.
     * @private
     */
    private static _strategies: Map<string, ILoggerStrategy> = new Map<string, ILoggerStrategy>();

    /**
     * Gets the logging strategies.
     * @returns {Map<string, ILoggerStrategy>} The logging strategies.
     */
    public static get strategies(): Map<string, ILoggerStrategy> {
        return BasaltLogger._strategies;
    }

    /**
     * Adds a logging strategy.
     * @param {string} name - The name of the strategy.
     * @param {ILoggerStrategy} strategy - The logging strategy to be added.
     * @throws {BasaltLoggerError} If a strategy with the same name already exists.
     */
    public static addStrategy(name: string, strategy: ILoggerStrategy): void {
        if (BasaltLogger._strategies.has(name))
            throw new BasaltLoggerError('Strategy already added');
        BasaltLogger._strategies.set(name, strategy);
    }

    /**
     * Adds multiple logging strategies.
     * @param {[string, ILoggerStrategy][]} strategies - An array of strategies.
     * @throws {BasaltLoggerError} If a strategy with the same name already exists.
     */
    public static addStrategies(strategies: [string, ILoggerStrategy][]): void {
        for (const [key, value] of strategies)
            if (BasaltLogger._strategies.has(key))
                throw new BasaltLoggerError('Strategy already added');
        BasaltLogger._strategies = new Map([...BasaltLogger._strategies, ...strategies]);
    }

    /**
     * Removes a logging strategy by name.
     * @param {string} name - The name of the strategy to be removed.
     * @throws {BasaltLoggerError} If the strategy is not found.
     */
    public static removeStrategy(name: string): void {
        if (!BasaltLogger._strategies.has(name))
            throw new BasaltLoggerError('Strategy not found for ' + name);
        BasaltLogger._strategies.delete(name);
    }

    /**
     * Removes multiple logging strategies by their names.
     * @param {string[]} names - The names of the strategies to be removed.
     * @throws {BasaltLoggerError} If any of the strategies are not found.
     */
    public static removeStrategies(names: string[]): void {
        for (const name of names)
            if (!BasaltLogger._strategies.has(name))
                throw new BasaltLoggerError('Strategy not found for ' + name);
        for (const name of names)
            BasaltLogger._strategies.delete(name);
    }

    /**
     * Clears all logging strategies.
     */
    public static clearStrategies(): void {
        BasaltLogger._strategies.clear();
    }

    /**
     * Executes the logging strategies.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {string[]} strategiesNames - The names of the strategies to execute.
     * @private
     */
    private static executeStrategies(level: LogLevels, message: string, strategiesNames: string[]): void {
        for (const name of strategiesNames)
            BasaltLogger._strategies.get(name)?.log(level, message);
    }

    /**
     * Formats a log entry.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {string[]} strategiesNames - The names of the strategies.
     * @returns {string} The formatted log entry.
     * @private
     */
    private static formatLogEntry(level: LogLevels, message: string, strategiesNames: string[]): string {
        let logMessage: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}] ${message}`;
        return JSON.stringify({
            level,
            message: logMessage,
            strategies: strategiesNames
        });
    }

    /**
     * Stream for writing log entries.
     * @private
     */
    private static _logStream: Writable = new Writable({
        write: (chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null) => void): void => {
            const { level, message, strategies } = JSON.parse(chunk.toString());
            BasaltLogger.executeStrategies(level, message, strategies);
            callback();
        }
    });

    /**
     * Outputs the log entry.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {string[]} strategiesNames - The names of the strategies to output.
     * @private
     */
    private static out(level: LogLevels, message: string, strategiesNames: string[]): void {
        const logEntry: string = BasaltLogger.formatLogEntry(level, message, strategiesNames);
        BasaltLogger._logStream.write(logEntry + '\n');
    }

    /**
     * Logs an error message.
     * @param {string} message - The error message to log.
     * @param {string[]} strategiesNames - The names of the strategies to output.
     * @throws {BasaltLoggerError} If no strategies are added.
     */
    public static error(message: string, strategiesNames: string[] = [...BasaltLogger._strategies.keys()]): void {
        if (BasaltLogger._strategies.size === 0)
            throw new BasaltLoggerError('No strategies added');
        BasaltLogger.out(LogLevels.ERROR, `ERROR : ${message}`, strategiesNames);
    }

    /**
     * Logs an warn message.
     * @param {string} message - The error message to log.
     * @param {string[]} strategiesNames - The names of the strategies to output.
     * @throws {BasaltLoggerError} If no strategies are added.
     */
    public static warn(message: string, strategiesNames: string[] = [...BasaltLogger._strategies.keys()]): void {
        if (BasaltLogger._strategies.size === 0)
            throw new BasaltLoggerError('No strategies added');
        BasaltLogger.out(LogLevels.WARN, `WARN : ${message}`, strategiesNames);
    }

    /**
     * Logs an info message.
     * @param {string} message - The error message to log.
     * @param {string[]} strategiesNames - The names of the strategies to output.
     * @throws {BasaltLoggerError} If no strategies are added.
     */
    public static info(message: string, strategiesNames: string[] = [...BasaltLogger._strategies.keys()]): void {
        if (BasaltLogger._strategies.size === 0)
            throw new BasaltLoggerError('No strategies added');
        BasaltLogger.out(LogLevels.INFO, `INFO : ${message}`, strategiesNames);
    }

    /**
     * Logs an debug message.
     * @param {string} message - The error message to log.
     * @param {string[]} strategiesNames - The names of the strategies to output.
     * @throws {BasaltLoggerError} If no strategies are added.
     */
    public static debug(message: string, strategiesNames: string[] = [...BasaltLogger._strategies.keys()]): void {
        if (BasaltLogger._strategies.size === 0)
            throw new BasaltLoggerError('No strategies added');
        BasaltLogger.out(LogLevels.DEBUG, `DEBUG : ${message}`, strategiesNames);
    }

    /**
     * Logs an log message.
     * @param {string} message - The error message to log.
     * @param {string[]} strategiesNames - The names of the strategies to output.
     * @throws {BasaltLoggerError} If no strategies are added.
     */
    public static log(message: string, strategiesNames: string[] = [...BasaltLogger._strategies.keys()]): void {
        if (BasaltLogger._strategies.size === 0)
            throw new BasaltLoggerError('No strategies added');
        BasaltLogger.out(LogLevels.LOG, `LOG : ${message}`, strategiesNames);
    }
}
