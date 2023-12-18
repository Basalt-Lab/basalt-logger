import { appendFile } from 'fs';

import { FileLoggerStrategy } from '@/App';
import { LogLevels } from '@/Enums';

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
        const date: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
        fileLogger.log(level, date, message);
        expect(appendFile).toHaveBeenCalledWith(`${testPath}`, `${date} ${level} : ${message}\n`, expect.any(Function));
    });

    test.each([
        [LogLevels.ERROR, 'Error message'],
        [LogLevels.WARN, 'Warning message'],
        [LogLevels.INFO, 'Info message'],
        [LogLevels.DEBUG, 'Debug message'],
        [LogLevels.LOG, 'Log message']
    ])(`should log a %s object`, (level, message): void => {
        const date: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
        const object: object = { hello: 'world' };
        fileLogger.log(level, date, object);
        expect(appendFile).toHaveBeenCalledWith(`${testPath}`, `${date} ${level} : ${JSON.stringify(object)}\n`, expect.any(Function));
    });

    test('should throw an error when the file cannot be written to', (): void => {
        const mockError: Error = new Error('test error');
        (appendFile as unknown as jest.Mock).mockImplementationOnce((path, message, callback): void => {
            callback(mockError);
        });
        const date: string = `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
        expect((): void => {
            fileLogger.log(LogLevels.ERROR, date, 'Error message');
        }).toThrow(mockError);
    });
});
