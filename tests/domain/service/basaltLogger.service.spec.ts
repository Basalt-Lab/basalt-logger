import { describe, expect, test, mock, spyOn } from 'bun:test';

import { ErrorKeys } from '../../../source/common/error';
import { BasaltLogger, ConsoleLoggerStrategy } from '../../../source/domain/service';
import { LoggerStrategy, LogLevels } from '../../../source/common/types';

describe('BasaltLogger', () => {
    test('should create a new instance of BasaltLogger', () => {
        const basaltLogger: BasaltLogger = new BasaltLogger();
        expect(basaltLogger).toBeInstanceOf(BasaltLogger);
        expect(basaltLogger).toHaveProperty('_strategies');
        expect(basaltLogger).toHaveProperty('_logStream');
        expect(basaltLogger).toHaveProperty('_pendingLogs');
        expect(basaltLogger).toHaveProperty('_maxPendingLogs');
        expect(basaltLogger).toHaveProperty('_writing');
    });

    test('should add a logging strategy', () => {
        const basaltLogger: BasaltLogger = new BasaltLogger();
        const loggerStrategy: LoggerStrategy = new ConsoleLoggerStrategy(true);
        basaltLogger.addStrategy('console', loggerStrategy);
        expect(basaltLogger['_strategies'].get('console')).toBe(loggerStrategy);
    });

    test('should not add a logging strategy if it already exists', () => {
        const basaltLogger: BasaltLogger = new BasaltLogger();
        const loggerStrategy: LoggerStrategy = new ConsoleLoggerStrategy(true);
        basaltLogger.addStrategy('console', loggerStrategy);
        expect(() => basaltLogger.addStrategy('console', loggerStrategy)).toThrowError(ErrorKeys.STRATEGY_ALREADY_ADDED);
    });

});