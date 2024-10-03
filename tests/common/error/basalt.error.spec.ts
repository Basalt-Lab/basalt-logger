import { describe, expect, test } from 'bun:test';

import { BasaltError, BasaltErrorOptions, ErrorKeys } from '../../../source/common/error';

describe('constructor', () => { 
    test('should create a new instance of BasaltError', () => {
        const basaltErrorOptions: BasaltErrorOptions = {
            messageKey: ErrorKeys.NO_STRATEGY_ADDED,
            code: 400,
            detail: { token: 'invalidToken' }
        };
        const basaltError: BasaltError = new BasaltError(basaltErrorOptions);
        expect(basaltError).toBeInstanceOf(BasaltError);
        expect(basaltError).toHaveProperty('message', ErrorKeys.NO_STRATEGY_ADDED);
        expect(basaltError).toHaveProperty('name', 'BasaltError');
        expect(basaltError).toHaveProperty('code', 400);
        expect(basaltError).toHaveProperty('detail', { token: 'invalidToken' });
        expect(basaltError).toHaveProperty('date');
        expect(basaltError).toHaveProperty('uuidError');
        expect(basaltError).toHaveProperty('stack');
    });

    test('should create a new instance of BasaltError with default code', () => {
        const basaltErrorOptions: BasaltErrorOptions = {
            messageKey: ErrorKeys.STRATEGY_ALREADY_ADDED,
            detail: { token: 'invalidToken' }
        };
        const basaltError: BasaltError = new BasaltError(basaltErrorOptions);
        expect(basaltError).toBeInstanceOf(BasaltError);
        expect(basaltError).toHaveProperty('message', ErrorKeys.STRATEGY_ALREADY_ADDED);
        expect(basaltError).toHaveProperty('name', 'BasaltError');
        expect(basaltError).toHaveProperty('code', 500);
        expect(basaltError).toHaveProperty('detail', { token: 'invalidToken' });
        expect(basaltError).toHaveProperty('date');
        expect(basaltError).toHaveProperty('uuidError');
        expect(basaltError).toHaveProperty('stack');
    });
});
