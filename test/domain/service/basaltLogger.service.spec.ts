import { describe, expect, mock, test } from 'bun:test';
import { Transform } from 'stream';

import { LoggerStrategy } from '../../../source/common/type/data/loggerStrategy.data';
import { LogLevels } from '../../../source/common/type/enum/logLevels.enum';
import { BasaltLogger } from '../../../source/domain/service/basaltLogger.service';

describe('BasaltLogger', () => {
    describe('constructor', () => {
        test('should create a new instance of BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            expect(basaltLogger).toBeInstanceOf(BasaltLogger);
            expect(basaltLogger).toHaveProperty('_strategies');
            expect(basaltLogger).toHaveProperty('_logStream');
            expect(basaltLogger).toHaveProperty('_pendingLogs');
            expect(basaltLogger).toHaveProperty('_maxPendingLogs');
            expect(basaltLogger).toHaveProperty('_writing');
        });

        test('should create a Transform stream', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            expect(basaltLogger['_logStream']).toBeInstanceOf(Transform);
        });
    });

    describe('addStrategy', () => {
        test('should add a strategy to the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: mock(() => {})
            };
            basaltLogger.addStrategy(strategyName, strategy);
            expect(basaltLogger['_strategies'].get(strategyName)).toBe(strategy);
        });

        test('should throw an error if the strategy is already added', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: mock(() => {})
            };
            basaltLogger.addStrategy(strategyName, strategy);
            expect(() => basaltLogger.addStrategy(strategyName, strategy)).toThrow('error.basalt-logger.strategy_already_added');
        });
    });

    describe('removeStrategy', () => {
        test('should remove a strategy from the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: mock(() => {})
            };
            basaltLogger.addStrategy(strategyName, strategy);
            basaltLogger.removeStrategy(strategyName);
            expect(basaltLogger['_strategies'].has(strategyName)).toBe(false);
        });

        test('should throw an error if the strategy is not found', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            expect(() => basaltLogger.removeStrategy(strategyName)).toThrow('error.basalt-logger.strategy_not_found');
        });
    });

    describe('clearStrategies', () => {
        test('should clear all strategies from the BasaltLogger', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategyName = 'test';
            const strategy: LoggerStrategy = {
                log: mock(() => {})
            };
            basaltLogger.addStrategy(strategyName, strategy);
            basaltLogger.clearStrategies();
            expect(basaltLogger['_strategies'].size).toBe(0);
        });
    });

    describe('error', () => {
        test('should log an error', () => {
            const basaltLogger: BasaltLogger = new BasaltLogger();
            const strategy: LoggerStrategy = {
                log: (level: LogLevels, _: Date, object: unknown) => {
                    expect(level).toBe(LogLevels.ERROR);
                    expect(object).toBeInstanceOf(Error);
                }
            };
            basaltLogger.addStrategy('test', strategy);
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
                    expect(level).toBe(LogLevels.WARN);
                    expect(object).toBe('test');
                }
            };
            basaltLogger.addStrategy('test', strategy);
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
                    expect(level).toBe(LogLevels.DEBUG);
                    expect(object).toBe('test');
                }
            };
            basaltLogger.addStrategy('test', strategy);
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
                    expect(level).toBe(LogLevels.LOG);
                    expect(object).toBe('test');
                }
            };
            basaltLogger.addStrategy('test', strategy);
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