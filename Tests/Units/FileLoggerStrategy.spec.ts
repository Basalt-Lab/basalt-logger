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
        fileLogger.log(level, message);
        expect(appendFile).toHaveBeenCalledWith(`${testPath}`, `${message}\n`, expect.any(Function));
    });

    test('should throw an error when the file cannot be written to', (): void => {
        const mockError: Error = new Error('test error');
        (appendFile as unknown as jest.Mock).mockImplementationOnce((path, message, callback): void => {
            callback(mockError);
        });
        expect((): void => {
            fileLogger.log(LogLevels.ERROR, 'Error message');
        }).toThrow(mockError);
    });
});
