import { Transform } from 'stream';

import { BasaltError, ErrorKeys } from '#/common/error/index.ts';
import { LogLevels, type LoggerStrategy } from '#/common/types/index.ts';

/**
 * Interface for the log stream object.
 */
interface LogStreamObject {
    date: string;
    level: LogLevels;
    object: unknown;
    strategiesNames: string[];
}

/**
 * BasaltLogger provides a flexible logging system that allows multiple strategies for log output.
 */
export class BasaltLogger {
    /**
     * Stores the logging strategies mapped by their names. ({@link LoggerStrategy})
     */
    private readonly _strategies: Map<string, LoggerStrategy> = new Map<string, LoggerStrategy>();

    /**
     * Transform stream to process log entries. ({@link Transform})
     */
    private readonly _logStream: Transform;

    /**
     * Stores the pending log entries. ({@link LogStreamObject})
     */
    private readonly _pendingLogs: LogStreamObject[] = [];

    /**
     * The maximum number of pending logs.
     */
    private readonly _maxPendingLogs = 10000;

    /**
     * Indicates if the logger is writing log entries
     */
    private _writing = false;

    /**
     * Initializes the BasaltLogger.
     */
    public constructor() {
        this._logStream = new Transform({
            objectMode: true,
            transform: (chunk: LogStreamObject, _encoding, callback): void => {
                this.executeStrategies(chunk.level, new Date(chunk.date), chunk.object, chunk.strategiesNames);
                callback();
            }
        });
    }

    /**
     * Adds a logging strategy.
     *
     * @param name - The name of the strategy.
     * @param strategy - The strategy to add. ({@link LoggerStrategy})
     *
     * @throws ({@link BasaltError}) - If the strategy is already added. ({@link ErrorKeys.STRATEGY_ALREADY_ADDED})
     */
    public addStrategy(name: string, strategy: LoggerStrategy): void {
        if (this._strategies.has(name))
            throw new BasaltError({
                messageKey: ErrorKeys.STRATEGY_ALREADY_ADDED,
                detail: {
                    strategyName: name
                }
            });
        this._strategies.set(name, strategy);
    }

    /**
     * Removes a logging strategy by name.
     *
     * @param name - The name of the strategy.
     *
     * @throws ({@link BasaltError}) - If the strategy is not found. ({@link ErrorKeys.STRATEGY_NOT_FOUND})
     */
    public removeStrategy(name: string): void {
        if (!this._strategies.has(name))
            throw new BasaltError({
                messageKey: ErrorKeys.STRATEGY_NOT_FOUND,
                detail: {
                    strategyName: name
                }
            });
        this._strategies.delete(name);
    }

    /**
     * Clears all logging strategies.
     */
    public clearStrategies(): void {
        this._strategies.clear();
    }

    /**
     * Logs an error message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     */
    public error(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.ERROR, object, strategiesNames);
    }

    /**
     * Logs a warn message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     */
    public warn(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.WARN, object, strategiesNames);
    }

    /**
     * Logs an info message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     */
    public info(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.INFO, object, strategiesNames);
    }

    /**
     * Logs a debug message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     */
    public debug(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.DEBUG, object, strategiesNames);
    }

    /**
     * Logs a log message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     */
    public log(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.LOG, object, strategiesNames);
    }

    /**
     * Executes the logging strategies.
     *
     * @param level - The log level. ({@link LogLevels})
     * @param date - The date of the log entry.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use.
     */
    private executeStrategies(level: LogLevels, date: Date, object: unknown, strategiesNames: string[]): void {
        for (const name of strategiesNames)
            this._strategies.get(name)?.log(level, date, object);
    }

    /**
     * Outputs the log entry.
     *
     * @param level - The log level. ({@link LogLevels})
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     *
     * @throws ({@link BasaltError}) - If no strategy is added. ({@link ErrorKeys.NO_STRATEGY_ADDED})
     */
    private out(level: LogLevels, object: unknown, strategiesNames: string[] = [...this._strategies.keys()]): void {
        if (this._strategies.size === 0)
            throw new BasaltError({ messageKey: ErrorKeys.NO_STRATEGY_ADDED });

        if (this._pendingLogs.length >= this._maxPendingLogs)
            return;

        const log: LogStreamObject = { date: new Date().toISOString(), level, object, strategiesNames };
        this._pendingLogs.push(log);

        if (!this._writing) {
            this._writing = true;
            setImmediate(this.writeLog.bind(this));
        }
    }

    /**
     * Writes the log entries.
     */
    private writeLog(): void {
        let canWrite = true;
        while (canWrite && this._pendingLogs.length > 0) {
            const pendingLog = this._pendingLogs.shift();
            canWrite = this._logStream.write(pendingLog);
        }
        if (!canWrite)
            this._logStream.once('drain', this.writeLog.bind(this));
        else
            this._writing = false;
    }
}