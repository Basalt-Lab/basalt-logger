import { BasaltLogger, ILoggerStrategy, LogLevels } from '@/App';

describe('BasaltLogger', (): void => {
    let mockStrategy: ILoggerStrategy;

    beforeEach((): void => {
        mockStrategy = {
            log: jest.fn()
        };
        BasaltLogger.clearStrategies();
    });

    describe('addStrategy', (): void => {
        test('should add a logging strategy', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            expect(BasaltLogger['_strategies']).toContain(mockStrategy);
        });

        test('should throw an error when adding a duplicate strategy', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            expect((): void => {
                BasaltLogger.addStrategy(mockStrategy);
            }).toThrow('Strategy already added');
        });
    });

    describe('addStrategies', (): void => {
        test('should add multiple logging strategies', (): void => {
            const mockStrategy2: ILoggerStrategy = {
                log: jest.fn()
            };
            BasaltLogger.addStrategies([mockStrategy, mockStrategy2]);
            expect(BasaltLogger['_strategies']).toContain(mockStrategy);
            expect(BasaltLogger['_strategies']).toContain(mockStrategy2);
        });

        test('should throw an error when adding a duplicate strategy', (): void => {
            const mockStrategy2: ILoggerStrategy = {
                log: jest.fn()
            };
            BasaltLogger.addStrategy(mockStrategy);
            expect((): void => {
                BasaltLogger.addStrategies([mockStrategy, mockStrategy2]);
            }).toThrow('Strategy already added for ' + mockStrategy.constructor.name);
        });
    });

    describe('removeStrategy', (): void => {
        test('should remove a logging strategy', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.removeStrategy(mockStrategy);
            expect(BasaltLogger['_strategies']).not.toContain(mockStrategy);
        });

        test('should throw an error when removing a non-existent strategy', (): void => {
            expect((): void => {
                BasaltLogger.removeStrategy(mockStrategy);
            }).toThrow('Strategy not found for ' + mockStrategy.constructor.name);
        });
    });

    describe('removeStrategies', (): void => {
        test('should remove multiple logging strategies', (): void => {
            const mockStrategy2: ILoggerStrategy = {
                log: jest.fn()
            };
            BasaltLogger.addStrategies([mockStrategy, mockStrategy2]);
            BasaltLogger.removeStrategies([mockStrategy, mockStrategy2]);
            expect(BasaltLogger['_strategies']).not.toContain(mockStrategy);
            expect(BasaltLogger['_strategies']).not.toContain(mockStrategy2);
        });

        test('should throw an error when removing a non-existent strategy', (): void => {
            const mockStrategy2: ILoggerStrategy = {
                log: jest.fn()
            };
            expect((): void => {
                BasaltLogger.removeStrategies([mockStrategy, mockStrategy2]);
            }).toThrow('Strategy not found for ' + mockStrategy.constructor.name);
        });
    });

    describe('clearStrategies', (): void => {
        test('should clear all logging strategies', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.clearStrategies();
            expect(BasaltLogger['_strategies']).toEqual([]);
        });
    });

    [LogLevels.LOG, LogLevels.INFO, LogLevels.ERROR, LogLevels.WARN, LogLevels.DEBUG].forEach((level: LogLevels): void => {
        describe(level.toLowerCase(), (): void => {
            test(`should log a ${level} message`, (): void => {
                BasaltLogger.addStrategy(mockStrategy);
                const levelMethodString: string = level.toLowerCase();
                const levelMethod = BasaltLogger[levelMethodString as keyof typeof BasaltLogger] as (message: string) => void;
                levelMethod('Test Message');
                expect(mockStrategy.log).toHaveBeenCalledWith(level, expect.any(String), undefined);
            });

            test(`should log a ${level} message with an object`, (): void => {
                BasaltLogger.addStrategy(mockStrategy);
                const levelMethodString: string = level.toLowerCase();
                const levelMethod = BasaltLogger[levelMethodString as keyof typeof BasaltLogger] as (message: string, object: unknown) => void;
                levelMethod('Test Message', { test: 'test' });
                expect(mockStrategy.log).toHaveBeenCalledWith(level, expect.any(String), { test: 'test' });
            });

            test(`should throw an error when no strategies are added`, (): void => {
                const levelMethodString: string = level.toLowerCase();
                const levelMethod = BasaltLogger[levelMethodString as keyof typeof BasaltLogger] as (message: string) => void;
                expect((): void => {
                    levelMethod('Test Message');
                }).toThrow('No strategies added');
            });
        });
    });
});

