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
        it(`should log a ${level} message`, (): void => {
            const date: Date = new Date();
            const prefixDate: string = `[${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
            strategy.log(level, date, 'hello world');
            const mockMethod = mockConsole[level.toLowerCase() as keyof Console];
            expect(mockMethod).toHaveBeenCalledWith(`${prefixDate} ${level} : hello world`);
        });

        it(`should log a ${level} object`, (): void => {
            const date: Date = new Date();
            const prefixDate: string = `[${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;

            const object: object = { hello: 'world' };
            strategy.log(level, date, object);
            const mockMethod = mockConsole[level.toLowerCase() as keyof Console];
            expect(mockMethod).toHaveBeenCalledWith(`${prefixDate} ${level} : ${JSON.stringify(object)}`);
        });
    });

    it('should not log an unknown log level', (): void => {
        const date: Date = new Date();
        strategy.log('UNKNOWN' as LogLevels, date, 'hello world');
        expect(mockConsole.error).not.toHaveBeenCalled();
        expect(mockConsole.warn).not.toHaveBeenCalled();
        expect(mockConsole.info).not.toHaveBeenCalled();
        expect(mockConsole.debug).not.toHaveBeenCalled();
        expect(mockConsole.log).not.toHaveBeenCalled();
    });
});
