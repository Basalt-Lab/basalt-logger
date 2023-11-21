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

    describe('error', (): void => {
        test('should log an error message', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.error('Test Error');
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.ERROR, expect.any(String), undefined);
        });

        test('should log an error message with an object', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.error('Test Error', { test: 'test' });
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.ERROR, expect.any(String), { test: 'test' });
        });

        test('should throw an error when no strategies are added', (): void => {
            expect((): void => {
                BasaltLogger.error('Test Error');
            }).toThrow('No strategies added');
        });
    });

    describe('warn', (): void => {
        test('should log a warning message', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.warn('Test Warning');
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.WARN, expect.any(String), undefined);
        });

        test('should log a warning message with an object', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.warn('Test Warning', { test: 'test' });
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.WARN, expect.any(String), { test: 'test' });
        });

        test('should throw an error when no strategies are added', (): void => {
            expect((): void => {
                BasaltLogger.warn('Test Warning');
            }).toThrow('No strategies added');
        });
    });

    describe('info', (): void => {
        test('should log an info message', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.info('Test Info');
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.INFO, expect.any(String), undefined);
        });

        test('should log an info message with an object', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.info('Test Info', { test: 'test' });
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.INFO, expect.any(String), { test: 'test' });
        });

        test('should throw an error when no strategies are added', (): void => {
            expect((): void => {
                BasaltLogger.info('Test Info');
            }).toThrow('No strategies added');
        });
    });

    describe('debug', (): void => {
        test('should log a debug message', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.debug('Test Debug');
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.DEBUG, expect.any(String), undefined);
        });

        test('should log a debug message with an object', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.debug('Test Debug', { test: 'test' });
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.DEBUG, expect.any(String), { test: 'test' });
        });

        test('should throw an error when no strategies are added', (): void => {
            expect((): void => {
                BasaltLogger.debug('Test Debug');
            }).toThrow('No strategies added');
        });
    });

    describe('log', (): void => {
        test('should log a log message', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.log('Test Trace');
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.LOG, expect.any(String), undefined);
        });

        test('should log a log message with an object', (): void => {
            BasaltLogger.addStrategy(mockStrategy);
            BasaltLogger.log('Test Trace', { test: 'test' });
            expect(mockStrategy.log).toHaveBeenCalledWith(LogLevels.LOG, expect.any(String), { test: 'test' });
        });

        test('should throw an error when no strategies are added', (): void => {
            expect((): void => {
                BasaltLogger.log('Test Log');
            }).toThrow('No strategies added');
        });
    });
});

