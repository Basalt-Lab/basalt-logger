import { ConsoleLoggerStrategy, LogLevels } from '@/App';


describe('ConsoleLoggerStrategy', (): void => {
    let mockConsoleError: jest.SpyInstance;
    let mockConsoleWarn: jest.SpyInstance;
    let mockConsoleInfo: jest.SpyInstance;
    let mockConsoleDebug: jest.SpyInstance;
    let mockConsoleLog: jest.SpyInstance;

    beforeEach((): void => {
        mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation(() => {});
        mockConsoleDebug = jest.spyOn(console, 'debug').mockImplementation(() => {});
        mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach((): void => {
        jest.restoreAllMocks();
    });

    test('should log an error message', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.ERROR, 'test');
        expect(mockConsoleError).toHaveBeenCalledWith('test');
    });

    test('should log an error message with an object', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.ERROR, 'test', { foo: 'bar' });
        expect(mockConsoleError).toHaveBeenCalledWith('test {"foo":"bar"}');
    });

    test('should log a warn message', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.WARN, 'test');
        expect(mockConsoleWarn).toHaveBeenCalledWith('test');
    });

    test('should log a warn message with an object', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.WARN, 'test', { foo: 'bar' });
        expect(mockConsoleWarn).toHaveBeenCalledWith('test {"foo":"bar"}');
    });

    test('should log an info message', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.INFO, 'test');
        expect(mockConsoleInfo).toHaveBeenCalledWith('test');
    });

    test('should log an info message with an object', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.INFO, 'test', { foo: 'bar' });
        expect(mockConsoleInfo).toHaveBeenCalledWith('test {"foo":"bar"}');
    });

    test('should log a debug message', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.DEBUG, 'test');
        expect(mockConsoleDebug).toHaveBeenCalledWith('test');
    });

    test('should log a debug message with an object', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.DEBUG, 'test', { foo: 'bar' });
        expect(mockConsoleDebug).toHaveBeenCalledWith('test {"foo":"bar"}');
    });

    test('should log a log message', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.LOG, 'test');
        expect(mockConsoleLog).toHaveBeenCalledWith('test');
    });

    test('should log a log message with an object', (): void => {
        const strategy: ConsoleLoggerStrategy = new ConsoleLoggerStrategy();
        strategy.log(LogLevels.LOG, 'test', { foo: 'bar' });
        expect(mockConsoleLog).toHaveBeenCalledWith('test {"foo":"bar"}');
    });
});
