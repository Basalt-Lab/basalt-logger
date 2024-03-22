import { Writable } from 'stream';

import { ErrorBasaltLogger, ErrorBasaltLoggerCodes, } from '@/Common/Errors';
import { LogLevels } from '@/Domain/Services/Enums';
import { type ILoggerStrategy } from '@/Domain/Services/Interfaces';

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
     * Stores the logging strategies mapped by their names.
     */
    private static _strategies: Map<string, ILoggerStrategy> = new Map<string, ILoggerStrategy>();

    /**
     * Gets the logging strategies.
     * @returns The logging strategies.
     */
    public static get strategies(): Map<string, ILoggerStrategy> {
        return BasaltLogger._strategies;
    }

    /**
     * Adds a logging strategy.
     * @param name - The name of the strategy.
     * @param strategy - The logging strategy to be added. {@link ILoggerStrategy}
     * @throws {@link ErrorBasaltLogger} If a strategy with the same name already exists. {@link ErrorBasaltLoggerCodes.STRATEGY_ALREADY_ADDED}
     */
    public static addStrategy(name: string, strategy: ILoggerStrategy): void {
        if (BasaltLogger._strategies.has(name))
            throw new ErrorBasaltLogger(ErrorBasaltLoggerCodes.STRATEGY_ALREADY_ADDED, {
                strategyName: name
            });
        BasaltLogger._strategies.set(name, strategy);
    }

    /**
     * Adds multiple logging strategies.
     * @param strategies - An array of strategies. Each element is a tuple with the name of the strategy and the strategy itself. [name, strategy] {@link ILoggerStrategy}
     * @throws {@link ErrorBasaltLogger} If a strategy with the same name already exists. {@link ErrorBasaltLoggerCodes.STRATEGY_ALREADY_ADDED}
     */
    public static addStrategies(strategies: [string, ILoggerStrategy][]): void {
        for (const [key] of strategies)
            if (BasaltLogger._strategies.has(key))
                throw new ErrorBasaltLogger(ErrorBasaltLoggerCodes.STRATEGY_ALREADY_ADDED, {
                    strategyName: key
                });
        BasaltLogger._strategies = new Map([...BasaltLogger._strategies, ...strategies]);
    }

    /**
     * Removes a logging strategy by name.
     * @param name - The name of the strategy to be removed.
     * @throws {@link ErrorBasaltLogger} If the strategy is not found. {@link ErrorBasaltLoggerCodes.STRATEGY_NOT_FOUND}
     */
    public static removeStrategy(name: string): void {
        if (!BasaltLogger._strategies.has(name))
            throw new ErrorBasaltLogger(ErrorBasaltLoggerCodes.STRATEGY_NOT_FOUND, {
                strategyName: name
            });
        BasaltLogger._strategies.delete(name);
    }

    /**
     * Removes multiple logging strategies by their names.
     * @param names - The names of the strategies to be removed.
     * @throws {@link ErrorBasaltLogger} If any of the strategies are not found. {@link ErrorBasaltLoggerCodes.STRATEGY_NOT_FOUND}
     */
    public static removeStrategies(names: string[]): void {
        for (const name of names)
            if (!BasaltLogger._strategies.has(name))
                throw new ErrorBasaltLogger(ErrorBasaltLoggerCodes.STRATEGY_NOT_FOUND, {
                    strategyName: name
                });
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
     * @param level - The log level. {@link LogLevels}
     * @param date - The date of the log entry.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to execute.
     */
    private static executeStrategies(level: LogLevels, date: Date, object: unknown, strategiesNames: string[]): void {
        for (const name of strategiesNames)
            BasaltLogger._strategies.get(name)?.log(level, date, object);
    }

    /**
     * Stream for writing log entries.
     */
    private static readonly _logStream: Writable = new Writable({
        write: (chunk: Buffer, _encoding: BufferEncoding, callback: (error?: Error | null) => void): void => {
            const obj: unknown = JSON.parse(chunk.toString());
            const { date, level, object, strategiesNames } = obj as ILogStreamObject;
            BasaltLogger.executeStrategies(level, new Date(date), object, strategiesNames);
            callback();
        }
    });

    /**
     * Outputs the log entry.
     * @param level - The log level. {@link LogLevels}
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     * @throws {@link ErrorBasaltLogger} If no strategies are added. {@link ErrorBasaltLoggerCodes.NO_STRATEGY_ADDED}
     */
    private static out(level: LogLevels, object: unknown, strategiesNames: string[] = [...BasaltLogger._strategies.keys()]): void {
        if (BasaltLogger._strategies.size === 0)
            throw new ErrorBasaltLogger(ErrorBasaltLoggerCodes.NO_STRATEGY_ADDED);
        BasaltLogger._logStream.write(`${JSON.stringify({
            date: new Date().toISOString(),
            level,
            object,
            strategiesNames
        })}\n`);
    }

    /**
     * Logs an error message.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public static error(object: unknown, strategiesNames?: string[]): void {
        BasaltLogger.out(LogLevels.ERROR, object, strategiesNames);
    }

    /**
     * Logs an warn message.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public static warn(object: unknown, strategiesNames?: string[]): void {
        BasaltLogger.out(LogLevels.WARN, object, strategiesNames);
    }

    /**
     * Logs an info message.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public static info(object: unknown, strategiesNames?: string[]): void {
        BasaltLogger.out(LogLevels.INFO, object, strategiesNames);
    }

    /**
     * Logs an debug message.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public static debug(object: unknown, strategiesNames?: string[]): void {
        BasaltLogger.out(LogLevels.DEBUG, object, strategiesNames);
    }

    /**
     * Logs an log message.
     * @param object - The object to log.
     * @param strategiesNames - The names of the strategies to output.
     */
    public static log(object: unknown, strategiesNames?: string[]): void {
        BasaltLogger.out(LogLevels.LOG, object, strategiesNames);
    }
}
