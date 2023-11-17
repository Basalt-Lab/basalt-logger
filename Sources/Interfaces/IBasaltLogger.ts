import { ILoggerStrategy } from '@/Interfaces/ILoggerStrategy';
import { LogLevels } from '@/Enums';

export interface IBasaltLogger {
    /**
     * Adds a logging strategy to the logger.
     * @param {ILoggerStrategy} strategy - The logging strategy to add.
     * @throws {BasaltLoggerError} - Throws an error if the strategy is already added.
     */
    addStrategy(strategy: ILoggerStrategy): void

    /**
     * Adds multiple logging strategies to the logger.
     * @param {ILoggerStrategy[]} strategies - An array of logging strategies to add.
     * @throws {BasaltLoggerError} - Throws an error if any of the strategies are already added.
     */
    addStrategies(strategies: ILoggerStrategy[]): void

    /**
     * Removes a logging strategy from the logger.
     * @param {ILoggerStrategy} strategy - The logging strategy to remove.
     * @throws {BasaltLoggerError} - Throws an error if the strategy is not found.
     */
    removeStrategy(strategy: ILoggerStrategy): void

    /**
     * Removes multiple logging strategies from the logger.
     * @param {ILoggerStrategy[]} strategies - An array of logging strategies to remove.
     */
    removeStrategies(strategies: ILoggerStrategy[]): void

    /**
     * Executes all added logging strategies with the given log information.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {unknown} object - Optional additional log information.
     */
    executeStrategies(level: LogLevels, message: string, object?: unknown): void

    /**
     * Formats a log entry with a timestamp, message, and optional additional information.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {unknown} object - Optional additional log information.
     * @returns {string} - The formatted log entry.
     */
    formatLogEntry(level: LogLevels, message: string, object?: unknown): string

    /**
     * Logs a message at the specified level.
     * @param {LogLevels} level - The log level.
     * @param {string} message - The log message.
     * @param {unknown} object - Optional additional log information.
     */
    out(level: LogLevels, message: string, object?: unknown): void

    /**
     * Logs an error message.
     * @param {string} message - The error message to log.
     * @param {unknown} object - Optional additional log information.
     */
    error(message: string, object?: unknown): void

    /**
     * Logs a warning message.
     * @param {string} message - The warning message to log.
     * @param {unknown} object - Optional additional log information.
     */
    warn(message: string, object?: unknown): void

    /**
     * Logs an informational message.
     * @param {string} message - The info message to log.
     * @param {unknown} object - Optional additional log information.
     */
    info(message: string, object?: unknown): void

    /**
     * Logs a debug message.
     * @param {string} message - The debug message to log.
     * @param {unknown} object - Optional additional log information.
     */
    debug(message: string, object?: unknown): void

    /**
     * Logs a general log message.
     * @param {string} message - The log message to record.
     * @param {unknown} object - Optional additional log information.
     */
    log(message: string, object?: unknown): void
}
