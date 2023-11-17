import { LogLevels } from '@/Enums';

export interface ILoggerStrategy {
    log(level: LogLevels, message: string, object?: unknown): void;
}
