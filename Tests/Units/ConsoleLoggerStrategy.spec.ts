import { ConsoleLoggerStrategy, LogLevels } from '@/App';

describe('ConsoleLoggerStrategy', (): void => {
    let mockConsole: { [key in keyof Console]?: jest.Mock };
    let strategy: ConsoleLoggerStrategy;

    beforeEach((): void => {
        mockConsole = {
            error: jest.fn(),
            warn: jest.fn(),
            info: jest.fn(),
            debug: jest.fn(),
            log: jest.fn()
        };
        strategy = new ConsoleLoggerStrategy();
        jest.spyOn(console, 'error').mockImplementation(mockConsole.error!);
        jest.spyOn(console, 'warn').mockImplementation(mockConsole.warn!);
        jest.spyOn(console, 'info').mockImplementation(mockConsole.info!);
        jest.spyOn(console, 'debug').mockImplementation(mockConsole.debug!);
        jest.spyOn(console, 'log').mockImplementation(mockConsole.log!);
    });

    afterEach((): void => {
        jest.restoreAllMocks();
    });

    const logLevels: LogLevels[] = [LogLevels.ERROR, LogLevels.WARN, LogLevels.INFO, LogLevels.DEBUG, LogLevels.LOG];

    logLevels.forEach((level: LogLevels): void => {
        test(`should log a ${level} message`, (): void => {
            strategy.log(level, 'test');
            const mockMethod = mockConsole[level.toLowerCase() as keyof Console];
            expect(mockMethod).toHaveBeenCalledWith('test');
        });

        test(`should log a ${level} message with an object`, (): void => {
            strategy.log(level, 'test', { foo: 'bar' });
            const mockMethod = mockConsole[level.toLowerCase() as keyof Console];
            expect(mockMethod).toHaveBeenCalledWith('test {"foo":"bar"}');
        });
    });
});
