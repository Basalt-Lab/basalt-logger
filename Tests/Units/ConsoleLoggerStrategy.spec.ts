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
            const date: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
            strategy.log(level, date, 'hello world');
            const mockMethod = mockConsole[level.toLowerCase() as keyof Console];
            expect(mockMethod).toHaveBeenCalledWith(`${date} ${level} : hello world`);
        });

        test(`should log a ${level} object`, (): void => {
            const date: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
            const object: object = { hello: 'world' };
            strategy.log(level, date, object);
            const mockMethod = mockConsole[level.toLowerCase() as keyof Console];
            expect(mockMethod).toHaveBeenCalledWith(`${date} ${level} : ${JSON.stringify(object)}`);
        });
    });
});
