import { EventEmitter, once, Transform } from 'stream';

import { BasaltError } from '#/error/basaltError';
import { GLOBAL_KEY_ERROR } from '#/error/key/globalKeyError';
import type { LoggerStrategy } from '#/types/data/loggerStrategy';
import type { LogLevels } from '#/types/data/logLevels';

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
 * Enum for the logger events.
 */
export const BASALT_LOGGER_EVENTS = {
    ERROR: 'error',
    END: 'end'
};

/**
 * BasaltLogger provides a flexible logging system that allows multiple strategies for log output.
 * The logger uses a transform stream to process log entries and execute the logging strategies.
 *
 * BasaltLogger extends the {@link EventEmitter} class to emit events when an error occurs or when the logger ends.
 * The logger can log messages with different levels: error, warn, info, debug, and log.
 *
 * @example
 * ```typescript
 * import { BasaltLogger, ConsoleLoggerStrategy, FileLoggerStrategy } from '@basalt-lab/basalt-logger';
 *
 * const logger = new BasaltLogger(); // u can pass the maxPendingLogs as an argument (default: 10_000)
 *
 * logger.on('error', (error) => { // optional
 *     console.error(error);
 * });
 *
 * logger.on('end', () => { // optional
 *     console.log('End');
 * });
 *
 * logger.registerStrategies([
 *     ['console', new ConsoleLoggerStrategy(true)],
 *     ['file', new FileLoggerStrategy('./log.txt')]
 * ]);
 * logger.log('Hello World'); // logs a message in all strategies
 * logger.log('Use all strategies', ['console', 'file']); // logs a message in the console and file strategies
 * logger.log('Use console strategy', ['console']); // logs a message only in the console strategy
 * logger.log('Use file strategy', ['file']); // logs a message only in the file strategy
 * ```
 */
export class BasaltLogger extends EventEmitter {
    /**
     * Stores the logging strategies mapped by their names. ({@link LoggerStrategy})
     */
    private readonly _strategies = new Map<string, LoggerStrategy>();

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
    private readonly _maxPendingLogs;

    /**
     * Indicates if the logger is writing log entries
     */
    private _isWriting = false;

    /**
     * Initializes the BasaltLogger, creates the log stream ({@link Transform}).
     * The log stream processes the log entries and executes the logging strategies.
     *
     * @param maxPendingLogs - The maximum number of pending logs. (default: 10_000)
     */
    public constructor(maxPendingLogs = 10_000) {
        super();
        this._maxPendingLogs = maxPendingLogs;
        this._logStream = new Transform({
            objectMode: true,
            transform: (chunk: LogStreamObject, _, callback): void => {
                this._executeStrategies(chunk.level, new Date(chunk.date), chunk.object, chunk.strategiesNames)
                    .then(() => callback())
                    .catch((error: unknown) => {
                        if (this.listenerCount(BASALT_LOGGER_EVENTS.ERROR) > 0)
                            this.emit(BASALT_LOGGER_EVENTS.ERROR, error);
                        callback();
                    });
            }
        });
    }

    /**
     * Registers a new logging strategy.
     *
     * @param name - The name of the strategy.
     * @param strategy - The strategy to add. ({@link LoggerStrategy})
     *
     * @throws ({@link BasaltError}) - If the strategy is already added. ({@link GLOBAL_KEY_ERROR.STRATEGY_ALREADY_ADDED})
     */
    public registerStrategy(name: string, strategy: LoggerStrategy): void {
        if (this._strategies.has(name))
            throw new BasaltError({
                key: GLOBAL_KEY_ERROR.STRATEGY_ALREADY_ADDED,
                cause: {
                    strategyName: name
                }
            });
        this._strategies.set(name, strategy);
    }

    /**
     * Unregisters a logging strategy.
     *
     * @param name - The name of the strategy.
     *
     * @throws ({@link BasaltError}) - If the strategy is not found. ({@link GLOBAL_KEY_ERROR.STRATEGY_NOT_FOUND})
     */
    public unregisterStrategy(name: string): void {
        if (!this._strategies.has(name))
            throw new BasaltError({
                key: GLOBAL_KEY_ERROR.STRATEGY_NOT_FOUND,
                cause: {
                    strategyName: name
                }
            });
        this._strategies.delete(name);
    }

    /**
     * Registers multiple logging strategies.
     *
     * @param strategies - The strategies to add. ({@link LoggerStrategy})
     *
     * @throws ({@link BasaltError}) - If the strategy is already added. ({@link GLOBAL_KEY_ERROR.STRATEGY_ALREADY_ADDED})
     */
    public registerStrategies(strategies: [string, LoggerStrategy][]): void {
        for (const [name, strategy] of strategies)
            this.registerStrategy(name, strategy);
    }

    /**
     * Unregisters multiple logging strategies.
     *
     * @param names - The names of the strategies to remove.
     *
     * @throws ({@link BasaltError}) - If the strategy is not found. ({@link GLOBAL_KEY_ERROR.STRATEGY_NOT_FOUND})
     */
    public unregisterStrategies(names: string[]): void {
        for (const name of names)
            this.unregisterStrategy(name);
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
     *
     * @throws ({@link BasaltError}) - If no strategy is added. ({@link GLOBAL_KEY_ERROR.NO_STRATEGY_ADDED})
     */
    public error<T>(object: T, strategiesNames?: string[]): void {
        this._out('ERROR', object, strategiesNames);
    }

    /**
     * Logs a warn message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     *
     * @throws ({@link BasaltError}) - If no strategy is added. ({@link GLOBAL_KEY_ERROR.NO_STRATEGY_ADDED})
     */
    public warn<T>(object: T, strategiesNames?: string[]): void {
        this._out('WARN', object, strategiesNames);
    }

    /**
     * Logs an info message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     *
     * @throws ({@link BasaltError}) - If no strategy is added. ({@link GLOBAL_KEY_ERROR.NO_STRATEGY_ADDED})
     */
    public info<T>(object: T, strategiesNames?: string[]): void {
        this._out('INFO', object, strategiesNames);
    }

    /**
     * Logs a debug message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     */
    public debug<T>(object: T, strategiesNames?: string[]): void {
        this._out('DEBUG', object, strategiesNames);
    }

    /**
     * Logs a log message.
     *
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     */
    public log<T>(object: T, strategiesNames?: string[]): void {
        this._out('LOG', object, strategiesNames);
    }

    /**
     * Executes the logging strategies.
     *
     * @param level - The log level. ({@link LogLevels})
     * @param date - The date of the log entry.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use.
     */
    private async _executeStrategies<T>(level: LogLevels, date: Date, object: T, strategiesNames: string[]): Promise<void> {
        await Promise.all(strategiesNames.map(async (name) => {
            try {
                await this._strategies.get(name)?.log(level, date, object);
            } catch (error) {
                throw new BasaltError({
                    key: GLOBAL_KEY_ERROR.LOGGER_STRATEGY_ERROR,
                    cause: {
                        strategyName: name,
                        object,
                        error
                    }
                });
            }
        }));
    }

    /**
     * Outputs the log entry.
     *
     * @param level - The log level. ({@link LogLevels})
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to use. (default: all strategies)
     *
     * @throws ({@link BasaltError}) - If no strategy is added. ({@link GLOBAL_KEY_ERROR.NO_STRATEGY_ADDED})
     */
    private _out<T>(level: LogLevels, object: T, strategiesNames: string[] = [...this._strategies.keys()]): void {
        if (this._strategies.size === 0)
            throw new BasaltError({ key: GLOBAL_KEY_ERROR.NO_STRATEGY_ADDED });

        if (this._pendingLogs.length >= this._maxPendingLogs)
            return;

        const log: LogStreamObject = { date: new Date().toISOString(), level, object, strategiesNames };
        this._pendingLogs.push(log);

        if (!this._isWriting) {
            this._isWriting = true;
            setImmediate(() => {
                void this._writeLog();
            });
        }
    }

    /**
     * Writes the log entries.
     */
    private async _writeLog(): Promise<void> {
        while (this._pendingLogs.length > 0) {
            const pendingLog = this._pendingLogs.shift();
            const canWrite = this._logStream.write(pendingLog);
            if (!canWrite)
                await once(this._logStream, 'drain');
        }
        this._isWriting = false;
        if (this.listenerCount(BASALT_LOGGER_EVENTS.END) > 0)
            this.emit(BASALT_LOGGER_EVENTS.END);
    }
}