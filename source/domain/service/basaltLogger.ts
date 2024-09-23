import { Writable } from 'stream';

import { BasaltError, ErrorKeys } from '#/common/error/index.ts';
import { LogLevels, type LoggerStrategy } from '#/common/types/index.ts';

/**
 * Interface for the log stream object.
 * @internal
 */
interface ILogStreamObject {
    date: string
    level: LogLevels
    object: unknown
    strategiesNames: string[]
}

/**
 * BasaltLogger provides a flexible logging system that allows multiple strategies for log output.
 */
export class BasaltLogger {

    /**
     * Stores the logging strategies mapped by their names. ({@link LoggerStrategy})
     */
    private _strategies: Map<string, LoggerStrategy> = new Map<string, LoggerStrategy>();

    /**
     * Stores the log entries that are queued to be logged. ({@link ILogStreamObject})
     * @readonly
     */
    private readonly _logQueue: ILogStreamObject[] = [];

    /**
     * Indicates if the logger is writing to the log stream.
     */
    private _isWriting = false;

    /**
     * Indicates if the logger is writing to the log stream.
     */
    public get isWriting(): boolean {
        return this._isWriting;
    }

    /**
     * Adds a logging strategy.
     *
     * @param name - The name o                                 f the strategy.
     * @param strategy - The logging strategy to be added. ({@link LoggerStrategy})
     *
     * @throws ({@link BasaltError}) If a strategy with the same name already exists. ({@link ErrorKeys.STRATEGY_ALREADY_ADDED})
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
     * Adds multiple logging strategies.
     *
     * @param strategies - An array of strategies. Each element is a tuple with the name of the strategy and the strategy itself. [name, strategy] ({@link LoggerStrategy})
     *
     * @throws ({@link BasaltError}) If a strategy with the same name already exists. ({@link ErrorKeys.STRATEGY_ALREADY_ADDED})
     */
    public addStrategies(strategies: [string, LoggerStrategy][]): void {
        for (const [key] of strategies)
            if (this._strategies.has(key))
                throw new BasaltError({
                    messageKey: ErrorKeys.STRATEGY_ALREADY_ADDED,
                    detail: {
                        strategyName: key
                    }
                });
        this._strategies = new Map([...this._strategies, ...strategies]);
    }

    /**
     * Removes a logging strategy by name.
     *
     * @param name - The name of the strategy to be removed.
     *
     * @throws ({@link BasaltError}) If the strategy is not found. ({@link ErrorKeys.STRATEGY_NOT_FOUND})
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
     * Removes multiple logging strategies by their names.
     *
     * @param names - The names of the strategies to be removed.
     *
     * @throws ({@link BasaltError}) If any of the strategies are not found. ({@link ErrorKeys.STRATEGY_NOT_FOUND})
     */
    public removeStrategies(names: string[]): void {
        for (const name of names)
            if (!this._strategies.has(name))
                throw new BasaltError({
                    messageKey: ErrorKeys.STRATEGY_NOT_FOUND,
                    detail: {
                        strategyName: name
                    }
                });
        for (const name of names)
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
     * @param strategiesNames - The names of the strategies to output.
     */
    public error(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.ERROR, object, strategiesNames);
    }

    /**
     * Logs an warn message.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public warn(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.WARN, object, strategiesNames);
    }

    /**
     * Logs an info message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public info(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.INFO, object, strategiesNames);
    }

    /**
     * Logs an debug message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public debug(object: unknown, strategiesNames?: string[]): void {
        this.out(LogLevels.DEBUG, object, strategiesNames);
    }

    /**
     * Logs an log message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
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
     * @param strategiesNames - The names of the strategies to execute.
     */
    private executeStrategies(level: LogLevels, date: Date, object: unknown, strategiesNames: string[]): void {
        for (const name of strategiesNames)
            this._strategies.get(name)?.log(level, date, object);
    }

    /**
     * Stream for writing log entries.
     */
    private readonly _logStream: Writable = new Writable({
        write: (chunk: Buffer, _encoding: BufferEncoding, callback: (error?: Error | null) => void): void => {
            const obj: unknown = JSON.parse(chunk.toString());
            const { date, level, object, strategiesNames } = obj as ILogStreamObject;
            this.executeStrategies(level, new Date(date), object, strategiesNames);
            callback();
        }
    });

    /**
     * Outputs the log entry.
     *
     * @param level - The log level. ({@link LogLevels})
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     *
     * @throws ({@link BasaltError}) If no strategies are added. ({@link ErrorKeys.NO_STRATEGY_ADDED})
     */
    private out(level: LogLevels, object: unknown, strategiesNames: string[] = [...this._strategies.keys()]): void {
        if (this._strategies.size === 0)
            throw new BasaltError({
                messageKey: ErrorKeys.NO_STRATEGY_ADDED
            });
        const log: ILogStreamObject = {
            date: new Date().toISOString(),
            level,
            object,
            strategiesNames
        };
        this._logQueue.push(log);
        this._processQueue();
    }

    /**
     * Processes the log queue.
     */
    private _processQueue(): void {
        if (!this._isWriting && this._logQueue.length > 0) {
            const entry = this._logQueue.shift();
            this._isWriting = true;
            this._logStream.write(`${JSON.stringify(entry)}\n`, () => {
                this._isWriting = false;
                this._processQueue();
            });
        }
    }
}
