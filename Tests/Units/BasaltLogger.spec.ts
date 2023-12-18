import { BasaltLogger, ILoggerStrategy, LogLevels } from '@/App';

describe('BasaltLogger', (): void => {
    let mockStrategy: ILoggerStrategy;
    let mockConsoleLoggerStrategy: ILoggerStrategy;
    let mockFileLoggerStrategy: ILoggerStrategy;

    beforeEach((): void => {
        mockStrategy = { log: jest.fn() };
        mockConsoleLoggerStrategy = { log: jest.fn() };
        mockFileLoggerStrategy = { log: jest.fn() };
        BasaltLogger.clearStrategies();
    });

    describe(('get strategies'), (): void => {
        test('should return a Map<string, ILoggerStrategy>', (): void => {
            expect(BasaltLogger.strategies).toBeInstanceOf(Map);
        });

        test('should return a Map<string, ILoggerStrategy> with size 0', (): void => {
            expect(BasaltLogger.strategies.size).toEqual(0);
        });
    });

    describe('addStrategy', (): void => {
        test('should add a logging strategy', (): void => {
            BasaltLogger.addStrategy('mockStrategy', mockStrategy);
            expect(BasaltLogger['_strategies'].has('mockStrategy')).toBeTruthy();
        });

        test('should throw an error when adding a duplicate strategy', (): void => {
            BasaltLogger.addStrategy('mockStrategy', mockStrategy);
            expect((): void => {
                BasaltLogger.addStrategy('mockStrategy', mockStrategy);
            }).toThrow('Strategy already added');
        });
    });

    describe('addStrategies', (): void => {
        test('should add multiple logging strategies', (): void => {
            const mockStrategy2: ILoggerStrategy = { log: jest.fn() };
            BasaltLogger.addStrategies([['mockStrategy', mockStrategy], ['mockStrategy2', mockStrategy2]]);
            expect(BasaltLogger['_strategies'].has('mockStrategy')).toBeTruthy();
            expect(BasaltLogger['_strategies'].has('mockStrategy2')).toBeTruthy();
        });

        test('should throw an error when adding a duplicate strategy', (): void => {
            BasaltLogger.addStrategy('mockStrategy', mockStrategy);
            expect((): void => {
                BasaltLogger.addStrategies([['mockStrategy', mockStrategy]]);
            }).toThrow('Strategy already added');
        });
    });

    describe('removeStrategy', (): void => {
        test('should remove a logging strategy', (): void => {
            BasaltLogger.addStrategy('mockStrategy', mockStrategy);
            BasaltLogger.removeStrategy('mockStrategy');
            expect(BasaltLogger['_strategies'].has('mockStrategy')).toBeFalsy();
        });

        test('should throw an error when removing a non-existent strategy', (): void => {
            expect((): void => {
                BasaltLogger.removeStrategy('mockStrategy');
            }).toThrow('Strategy not found for mockStrategy');
        });
    });

    describe('removeStrategies', (): void => {
        test('should remove multiple logging strategies', (): void => {
            const mockStrategy2: ILoggerStrategy = { log: jest.fn() };
            BasaltLogger.addStrategies([['mockStrategy', mockStrategy], ['mockStrategy2', mockStrategy2]]);
            BasaltLogger.removeStrategies(['mockStrategy', 'mockStrategy2']);
            expect(BasaltLogger['_strategies'].has('mockStrategy')).toBeFalsy();
            expect(BasaltLogger['_strategies'].has('mockStrategy2')).toBeFalsy();
        });

        test('should throw an error when removing a non-existent strategy', (): void => {
            expect((): void => {
                BasaltLogger.removeStrategies(['mockStrategy']);
            }).toThrow('Strategy not found for mockStrategy');
        });
    });

    describe('clearStrategies', (): void => {
        test('should clear all logging strategies', (): void => {
            BasaltLogger.addStrategy('mockStrategy', mockStrategy);
            BasaltLogger.clearStrategies();
            expect(BasaltLogger['_strategies'].size).toEqual(0);
        });
    });

    [LogLevels.LOG, LogLevels.INFO, LogLevels.ERROR, LogLevels.WARN, LogLevels.DEBUG].forEach((level: LogLevels): void => {
        describe(level.toLowerCase(), (): void => {
            test(`should log a ${level} message in all strategies`, (): void => {
                BasaltLogger.addStrategies([
                    ['mockStrategy', mockStrategy],
                    ['console', mockConsoleLoggerStrategy],
                    ['file', mockFileLoggerStrategy]
                ]);

                const levelMethodString: string = level.toLowerCase();
                const levelMethod = BasaltLogger[levelMethodString as keyof typeof BasaltLogger] as (object: unknown, strategiesNames?: string[]) => void;
                levelMethod('Test Message');

                expect(mockStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.stringContaining('Test Message'));
                expect(mockStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.any(String));
                expect(mockConsoleLoggerStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.stringContaining('Test Message'));
                expect(mockConsoleLoggerStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.any(String));
                expect(mockFileLoggerStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.stringContaining('Test Message'));
                expect(mockFileLoggerStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.any(String));
            });

            test(`should log a ${level} message in the specified strategies`, (): void => {
                BasaltLogger.addStrategies([
                    ['mockStrategy', mockStrategy],
                    ['console', mockConsoleLoggerStrategy],
                    ['file', mockFileLoggerStrategy]
                ]);

                const levelMethodString: string = level.toLowerCase();
                const levelMethod = BasaltLogger[levelMethodString as keyof typeof BasaltLogger] as (object: unknown, strategiesNames?: string[]) => void;
                levelMethod('Test Message', ['mockStrategy', 'console']);

                expect(mockStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.any(String));
                expect(mockStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.stringContaining('Test Message'));
                expect(mockConsoleLoggerStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.any(String));
                expect(mockConsoleLoggerStrategy.log).toHaveBeenCalledWith(level, expect.any(String), expect.stringContaining('Test Message'));
                expect(mockFileLoggerStrategy.log).not.toHaveBeenCalled();
            });

            test('should throw an error when no strategies are added', (): void => {
                const levelMethodString: string = level.toLowerCase();
                const levelMethod = BasaltLogger[levelMethodString as keyof typeof BasaltLogger] as (message: string) => void;
                expect((): void => {
                    levelMethod('Test Message');
                }).toThrow('No strategies added');
            });
        });
    });
});
