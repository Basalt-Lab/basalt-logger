import { appendFile } from 'fs';

import { FileLoggerStrategy, LogLevels } from '@/App';

jest.mock('fs', () => ({
    appendFile: jest.fn()
}));

describe('FileLoggerStrategy', (): void => {
    const testPath = '/test/path.log';
    let fileLogger: FileLoggerStrategy;

    beforeEach((): void => {
        jest.clearAllMocks();
        fileLogger = new FileLoggerStrategy(testPath);
    });

    test.each([
        [LogLevels.ERROR, 'Error message'],
        [LogLevels.WARN, 'Warning message'],
        [LogLevels.INFO, 'Info message'],
        [LogLevels.DEBUG, 'Debug message'],
        [LogLevels.LOG, 'Log message']
    ])('should log a %s message', (level, message): void => {
        const date: Date = new Date();
        const prefixDate: string = `[${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
        fileLogger.log(level, date, message);
        expect(appendFile).toHaveBeenCalledWith(`${testPath}`, `${prefixDate} ${level} : ${message}\n`, expect.any(Function));
    });

    test.each([
        [LogLevels.ERROR, 'Error message'],
        [LogLevels.WARN, 'Warning message'],
        [LogLevels.INFO, 'Info message'],
        [LogLevels.DEBUG, 'Debug message'],
        [LogLevels.LOG, 'Log message']
    ])(`should log a %s object`, (level): void => {
        const date: Date = new Date();
        const prefixDate: string = `[${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
        const object: object = { hello: 'world' };
        fileLogger.log(level, date, object);
        expect(appendFile).toHaveBeenCalledWith(`${testPath}`, `${prefixDate} ${level} : ${JSON.stringify(object)}\n`, expect.any(Function));
    });

    test('should throw an error when the file cannot be written to', (): void => {
        const mockError: Error = new Error('test error');
        (appendFile as unknown as jest.Mock).mockImplementationOnce((_path, _message, callback): void => {
            callback(mockError);
        });
        const date: Date = new Date();
        expect((): void => {
            fileLogger.log(LogLevels.ERROR, date, 'Error message');
        }).toThrow(mockError);
    });
});
