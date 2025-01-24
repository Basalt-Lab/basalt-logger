/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { describe, expect, test } from 'bun:test';
import { Transform } from 'stream';

import { BasaltLogger } from '#/core/basaltLogger';
import { BasaltError } from '#/error/basaltError';
import type { LoggerStrategy } from '#/types/data/loggerStrategy';
import type { LogLevels } from '#/types/data/logLevels';

describe('BasaltLogger', () => {
    describe('constructor', () => {
        test('should create a new instance of BasaltLogger with default maxPendingLogs', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            expect(basaltLogger).toBeInstanceOf(BasaltLogger);
        });

        test('should create a new instance of BasaltLogger with custom maxPendingLogs', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger(10);
            expect(basaltLogger).toBeInstanceOf(BasaltLogger);
        });

        test('should create a Transform stream', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            expect(basaltLogger['_logStream']).toBeInstanceOf(Transform);
        });

        test('should emit an error when a strategy throws an error', (done) => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategy: LoggerStrategy = {
                log: () => {
                    throw new Error('test');
                }
            };
            basaltLogger.registerStrategy('test', strategy);
            basaltLogger.on('error', (error: Error) => {
                expect(error).toBeInstanceOf(Error);
                expect(error).toBeInstanceOf(BasaltError);
                done();
            });
            basaltLogger.log('test');
        });

        test('should emit end when no more logs are pending', (done) => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            basaltLogger.on('end', () => {
                done();
            });
            const strategy: LoggerStrategy = {
                log: () => {}
            };
            basaltLogger.registerStrategy('test', strategy);
            basaltLogger.log('test');
        });

        test('should ignore logs when maxPendingLogs is reached', () => {
            const logger = new BasaltLogger(1);
            logger.registerStrategy('test', { log: () => {} });
            logger.log('first'); // Remplit le buffer
            logger.log('second'); // Doit être ignoré
            expect(logger['_pendingLogs']).toHaveLength(1);
        });

        test('should handle backpressure in _writeLog', async () => {
            const logger = new BasaltLogger();
            const mockStrategy = { log: (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 100)) };
            logger.registerStrategy('test', mockStrategy);

            logger.log('test1');
            logger.log('test2');

            await logger['_writeLog'](); // Vérifie que le drain est géré
        });
    });

    describe('registerStrategy', () => {
        test('should add a strategy to the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: () => {}
            };
            basaltLogger.registerStrategy(strategyName, strategy);
            expect(basaltLogger['_strategies'].get(strategyName)).toBe(strategy);
        });

        test('should throw an error if the strategy is already added', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: () => {}
            };
            basaltLogger.registerStrategy(strategyName, strategy);
            expect(() => basaltLogger.registerStrategy(strategyName, strategy)).toThrow('error.basalt-logger.strategy_already_added');
        });
    });

    describe('unregisterStrategy', () => {
        test('should remove a strategy from the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: () => {}
            };
            basaltLogger.registerStrategy(strategyName, strategy);
            basaltLogger.unregisterStrategy(strategyName);
            expect(basaltLogger['_strategies'].has(strategyName)).toBe(false);
        });

        test('should throw an error if the strategy is not found', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            expect(() => basaltLogger.unregisterStrategy(strategyName)).toThrow('error.basalt-logger.strategy_not_found');
        });
    });

    describe('registerStrategies', () => {
        test('should add multiple strategies to the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategies: [string, LoggerStrategy][] = [
                ['test1', {
                    log: (): void => {}
                }],
                ['test2', {
                    log: (): void => {}
                }]
            ];
            basaltLogger.registerStrategies(strategies);
            expect(basaltLogger['_strategies'].size).toBe(2);
            expect(basaltLogger['_strategies'].get('test1')).toBe(strategies[0][1]);
            expect(basaltLogger['_strategies'].get('test2')).toBe(strategies[1][1]);
        });

        test('should throw an error if a strategy is already added', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategies: [string, LoggerStrategy][] = [
                ['test1', {
                    log: (): void => {}
                }],
                ['test2', {
                    log: (): void => {}
                }]
            ];
            basaltLogger.registerStrategies(strategies);
            expect(() => basaltLogger.registerStrategies(strategies)).toThrow('error.basalt-logger.strategy_already_added');
        });
    });

    describe('unregisterStrategies', () => {
        test('should remove multiple strategies from the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategies: [string, LoggerStrategy][] = [
                ['test1', {
                    log: (): void => {}
                }],
                ['test2', {
                    log: (): void => {}
                }]
            ];
            basaltLogger.registerStrategies(strategies);
            basaltLogger.unregisterStrategies(['test1', 'test2']);
            expect(basaltLogger['_strategies'].size).toBe(0);
        });

        test('should throw an error if a strategy is not found', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategies: [string, LoggerStrategy][] = [
                ['test1', {
                    log: (): void => {}
                }],
                ['test2', {
                    log: (): void => {}
                }]
            ];
            basaltLogger.registerStrategies(strategies);
            expect(() => basaltLogger.unregisterStrategies(['test1', 'test3'])).toThrow('error.basalt-logger.strategy_not_found');
        });
    });

    describe('clearStrategies', () => {
        test('should clear all strategies from the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: () => {}
            };
            basaltLogger.registerStrategy(strategyName, strategy);
            basaltLogger.clearStrategies();
            expect(basaltLogger['_strategies'].size).toBe(0);
        });
    });

    describe('error', () => {
        test('should log an error', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategy: LoggerStrategy = {
                log: (level: LogLevels, _: Date, object: unknown) => {
                    expect(level).toBe('ERROR');
                    expect(object).toBeInstanceOf(Error);
                }
            };
            basaltLogger.registerStrategy('test', strategy);
            const error = new Error('test');
            basaltLogger.error(error);
            expect(basaltLogger['_pendingLogs']).toHaveLength(1);
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('level', 'ERROR');
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('object', error);
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('strategiesNames', ['test']);
        });

        test('should be thrown if no strategy is added', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const error = new Error('test');
            expect(() => basaltLogger.error(error)).toThrow('error.basalt-logger.no_strategy_added');
        });
    });

    describe('warn', () => {
        test('should log a warning', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategy: LoggerStrategy = {
                log: (level: LogLevels, _: Date, object: unknown) => {
                    expect(level).toBe('WARN');
                    expect(object).toBe('test');
                }
            };
            basaltLogger.registerStrategy('test', strategy);
            basaltLogger.warn('test');
            expect(basaltLogger['_pendingLogs']).toHaveLength(1);
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('level', 'WARN');
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('object', 'test');
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('strategiesNames', ['test']);
        });

        test('should be thrown if no strategy is added', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            expect(() => basaltLogger.warn('test')).toThrow('error.basalt-logger.no_strategy_added');
        });
    });

    describe('debug', () => {
        test('should log a debug message', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategy: LoggerStrategy = {
                log: (level: LogLevels, _: Date, object: unknown) => {
                    expect(level).toBe('DEBUG');
                    expect(object).toBe('test');
                }
            };
            basaltLogger.registerStrategy('test', strategy);
            basaltLogger.debug('test');
            expect(basaltLogger['_pendingLogs']).toHaveLength(1);
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('level', 'DEBUG');
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('object', 'test');
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('strategiesNames', ['test']);
        });

        test('should be thrown if no strategy is added', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            expect(() => basaltLogger.debug('test')).toThrow('error.basalt-logger.no_strategy_added');
        });
    });

    describe('log', () => {
        test('should log a message', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategy: LoggerStrategy = {
                log: (level: LogLevels, _: Date, object: unknown) => {
                    expect(level).toBe('LOG');
                    expect(object).toBe('test');
                }
            };
            basaltLogger.registerStrategy('test', strategy);
            basaltLogger.log('test');
            expect(basaltLogger['_pendingLogs']).toHaveLength(1);
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('level', 'LOG');
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('object', 'test');
            expect(basaltLogger['_pendingLogs'][0]).toHaveProperty('strategiesNames', ['test']);
        });

        test('should be thrown if no strategy is added', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            expect(() => basaltLogger.log('test')).toThrow('error.basalt-logger.no_strategy_added');
        });
    });
});