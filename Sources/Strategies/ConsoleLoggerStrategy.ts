import { ILoggerStrategy } from '@/Interfaces';
import { LogLevels } from '@/Enums';

export class ConsoleLoggerStrategy implements ILoggerStrategy {
    public log(level: LogLevels, message: string, object?: unknown): void {
        switch (level) {
        case LogLevels.ERROR:
            console.error(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.WARN:
            console.warn(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.INFO:
            console.info(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.DEBUG:
            console.debug(message + (object ? ' ' + object : ''));
            break;
        case LogLevels.LOG:
            console.log(message + (object ? ' ' + object : ''));
            break;
        default:
            break;
        }
    }
}
