import { Writable } from 'stream';

import { ILoggerStrategy } from "@/Interfaces";
import { LogLevels } from '@/Enums';
import { BasaltLoggerError } from '@/Errors';

export class BasaltLogger {
    private static _strategies: ILoggerStrategy[] = [];

    public static addStrategy(strategy: ILoggerStrategy): void {
        if (BasaltLogger._strategies.indexOf(strategy) !== -1)
            throw new BasaltLoggerError('Strategy already added');
        BasaltLogger._strategies.push(strategy);
    }

    public static addStrategies(strategies: ILoggerStrategy[]): void {
        for (const strategy of strategies)
            if (BasaltLogger._strategies.indexOf(strategy) !== -1)
                throw new BasaltLoggerError('Strategy already added for ' + strategy.constructor.name);
        BasaltLogger._strategies.push(...strategies);
    }

    public static removeStrategy(strategy: ILoggerStrategy): void {
        const index: number = BasaltLogger._strategies.indexOf(strategy);
        if (index === -1)
            throw new BasaltLoggerError('Strategy not found for ' + strategy.constructor.name);
        BasaltLogger._strategies.splice(index, 1);
    }

    public static removeStrategies(strategies: ILoggerStrategy[]): void {
        for (const strategy of strategies)
            BasaltLogger.removeStrategy(strategy);
    }

    private static executeStrategies(level: LogLevels, message: string, object?: unknown): void {
        for (const strategy of BasaltLogger._strategies)
            strategy.log(level, message, object);
    }

    private static _logStream: Writable = new Writable({
        write: (chunk: Buffer | string, encoding: BufferEncoding, callback: (error?: Error | null) => void): void => {
            const { level, message, object } = JSON.parse(chunk instanceof Buffer ? chunk.toString() : chunk);
            BasaltLogger.executeStrategies(level, message, object);
            callback();
        }
    });

    private static formatLogEntry(level: LogLevels, message: string, object?: unknown): string {
        let logMessage: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}] ${message}`;
        return JSON.stringify({
            level,
            message: logMessage,
            object: object ? JSON.stringify(object) : undefined
        });
    }

    private static out(level: LogLevels, message: string, object?: unknown): void {
        const logEntry: string = BasaltLogger.formatLogEntry(level, message, object);
        BasaltLogger._logStream.write(logEntry + '\n');
    }

    public static error(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.ERROR, `\x1b[31mERROR\x1b[0m : ${message}`, object);
    }

    public static warn(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.WARN, `\x1b[33mWARN\x1b[0m : ${message}`, object);
    }

    public static info(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.INFO, `\x1b[36mINFO\x1b[0m : ${message}`, object);
    }

    public static debug(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.DEBUG, `\x1b[32mDEBUG\x1b[0m : ${message}`, object);
    }

    public static log(message: string, object?: unknown): void {
        BasaltLogger.out(LogLevels.LOG, `\x1b[37mLOG\x1b[0m : ${message}`, object);
    }
}
