import { Writable } from 'stream';

import { ILoggerStrategy } from "@/Interfaces";
import { LogLevels } from '@/Enums';
import { BasaltLoggerError } from '@/Errors';

/**
 * BasaltLogger provides a flexible logging system that allows multiple strategies for log output.
 */
export class BasaltLogger {
    private static _strategies: ILoggerStrategy[] = [];

    /**
     * Adds a logging strategy to the logger.
     * @param {ILoggerStrategy} strategy - The logging strategy to add.
     * @throws {BasaltLoggerError} - Throws an error if the strategy is already added.
     */
    public static addStrategy(strategy: ILoggerStrategy): void {
        if (BasaltLogger._strategies.indexOf(strategy) !== -1)
            throw new BasaltLoggerError('Strategy already added');
        BasaltLogger._strategies.push(strategy);
    }

    /**
     * Adds multiple logging strategies to the logger.
     * @param {ILoggerStrategy[]} strategies - An array of logging strategies to add.
     * @throws {BasaltLoggerError} - Throws an error if any of the strategies are already added.
     */
    public static addStrategies(strategies: ILoggerStrategy[]): void {
        for (const strategy of strategies)
            if (BasaltLogger._strategies.indexOf(strategy) !== -1)
                throw new BasaltLoggerError('Strategy already added for ' + strategy.constructor.name);
        BasaltLogger._strategies.push(...strategies);
    }

    /**
     * Removes a logging strategy from the logger.
     * @param {ILoggerStrategy} strategy - The logging strategy to remove.
     * @throws {BasaltLoggerError} - Throws an error if the strategy is not found.
     */
    public static removeStrategy(strategy: ILoggerStrategy): void {
        const index: number = BasaltLogger._strategies.indexOf(strategy);
        if (index === -1)
            throw new BasaltLoggerError('Strategy not found for ' + strategy.constructor.name);
        BasaltLogger._strategies.splice(index, 1);
    }

    /**
     * Removes multiple logging strategies from the logger.
     * @param {ILoggerStrategy[]} strategies - An array of logging strategies to remove.
     */
    public static removeStrategies(strategies: ILoggerStrategy[]): void {
        for (const strategy of strategies)
            BasaltLogger.removeStrategy(strategy);
    }

    /**
     * Executes all added logging strategies with the given log information.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {unknown} object - Optional additional log information.
     */
    private static executeStrategies(level: LogLevels, message: string, object?: unknown): void {
        for (const strategy of BasaltLogger._strategies)
            strategy.log(level, message, object);
    }

    private static _logStream: Writable = new Writable({
        write: (chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null) => void): void => {
            const { level, message, object } = JSON.parse(chunk.toString());
            BasaltLogger.executeStrategies(level, message, object);
            callback();
        }
    });

    /**
     * Formats a log entry with a timestamp, message, and optional additional information.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {unknown} object - Optional additional log information.
     * @returns {string} - The formatted log entry.
     */
    private static formatLogEntry(level: LogLevels, message: string, object?: unknown): string {
        let logMessage: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}] ${message}`;
        return JSON.stringify({
            level,
            message: logMessage,
            object: object ? JSON.stringify(object) : undefined
        });
    }

    /**
     * Logs a message at the specified level.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {unknown} object - Optional additional log information.
     */
    private static out(level: LogLevels, message: string, object?: unknown): void {
        const logEntry: string = BasaltLogger.formatLogEntry(level, message, object);
        BasaltLogger._logStream.write(logEntry + '\n');
    }

    /**
     * Logs an error message.
     * @param {string} message - The error message to log.
     * @param {unknown} object - Optional additional log information.
     */
    public static error(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.ERROR, `\x1b[31mERROR\x1b[0m : ${message}`, object);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The warning message to log.
     * @param {unknown} object - Optional additional log information.
     */
    public static warn(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.WARN, `\x1b[33mWARN\x1b[0m : ${message}`, object);
    }

    /**
     * Logs an informational message.
     * @param {string} message - The info message to log.
     * @param {unknown} object - Optional additional log information.
     */
    public static info(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.INFO, `\x1b[36mINFO\x1b[0m : ${message}`, object);
    }

    /**
     * Logs a debug message.
     * @param {string} message - The debug message to log.
     * @param {unknown} object - Optional additional log information.
     */
    public static debug(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.DEBUG, `\x1b[32mDEBUG\x1b[0m : ${message}`, object);
    }

    /**
     * Logs a general log message.
     * @param {string} message - The log message to record.
     * @param {unknown} object - Optional additional log information.
     */
    public static log(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.LOG, `\x1b[37mLOG\x1b[0m : ${message}`, object);
    }
}