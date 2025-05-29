import { describe, expect, test } from 'bun:test';

import { BasaltError } from '#/error/basaltError';
import type { BasaltErrorOptions } from '#/error/types/basaltErrorOptions';

/**
 * Test data constants for consistent testing across all test suites.
 */
const testData = {
    completeErrorOptions: {
        message: 'An example error occurred',
        key: 'error.core-package.example',
        httpStatusCode: 400,
        cause: { errorCode: 'E001', details: 'Invalid input data' }
    } as const,
    minimalErrorOptions: {
        message: 'Minimal error'
    } as const,
    httpStatusCode: {
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        INTERNAL_SERVER_ERROR: 500
    } as const,
    errorKeys: {
        validation: 'error.validation.failed',
        authentification: 'error.auth.invalid_token',
        database: 'error.database.connection_failed'
    } as const
} as const;

/**
 * Custom type definitions for testing purposes.
 */
interface DatabaseErrorCause {
    readonly connectionString: string;
    readonly timeoutMs: number;
}

interface ValidationErrorCause {
    readonly field: string;
    readonly value: unknown;
    readonly rule: string;
}

/**
 * Helper function to create a BasaltError with complete options for testing purposes.
 * @returns A BasaltError instance with all properties set.
 */
const _createCompleteError = (): BasaltError<typeof testData.completeErrorOptions.cause> => new BasaltError(testData.completeErrorOptions);

/**
 * Helper function to create a minimal BasaltError for testing purposes.
 * @returns A BasaltError instance with minimal configuration.
 */
const _createMinimalError = (): BasaltError => new BasaltError(testData.minimalErrorOptions);

/**
 * Helper function to get current timestamp for date comparison tests.
 * @returns Current timestamp in milliseconds.
 */
const _getCurrentTimestamp = (): number => Date.now();

describe('BasaltError', () => {
    describe('when constructing with complete options', () => {
        test('should create instance with all specified properties', () => {
            const beforeCreation: number = _getCurrentTimestamp();
            const basaltError: BasaltError<typeof testData.completeErrorOptions.cause> = _createCompleteError();
            const afterCreation: number = _getCurrentTimestamp();

            expect(basaltError).toBeInstanceOf(BasaltError);
            expect(basaltError).toBeInstanceOf(Error);
            expect(basaltError.message).toBe(testData.completeErrorOptions.message);
            expect(basaltError.name).toBe('BasaltError');
            expect(basaltError.key).toBe(testData.completeErrorOptions.key);
            expect(basaltError.httpStatusCode).toBe(testData.completeErrorOptions.httpStatusCode);
            expect(basaltError.cause).toEqual(testData.completeErrorOptions.cause);
            expect(basaltError.stack).toBeDefined();
            expect(basaltError.uuid).toBeDefined();
            expect(basaltError.date).toBeDefined();
            expect(basaltError.date.getTime()).toBeGreaterThanOrEqual(beforeCreation);
            expect(basaltError.date.getTime()).toBeLessThanOrEqual(afterCreation);
        });

        test('should create instance with typed cause', () => {
            const databaseCause: DatabaseErrorCause = {
                connectionString: 'mssql://localhost:1433',
                timeoutMs: 5000
            };

            const errorOptions: BasaltErrorOptions<DatabaseErrorCause> = {
                message: 'Database connection failed',
                key: testData.errorKeys.database,
                httpStatusCode: testData.httpStatusCode.INTERNAL_SERVER_ERROR,
                cause: databaseCause
            };
            const basaltError = new BasaltError<DatabaseErrorCause>(errorOptions);

            expect(basaltError.cause).toEqual(databaseCause);
            expect(basaltError.cause?.connectionString).toBe('mssql://localhost:1433');
            expect(basaltError.cause?.timeoutMs).toBe(5000);
        });

        test('should create instance with Error cause', () => {
            const originalError: Error = new Error('Original error message');
            const errorOptions: BasaltErrorOptions<Error> = {
                message: 'Wrapped error',
                key: 'error.wrapper.example',
                httpStatusCode: testData.httpStatusCode.badRequest,
                cause: originalError
            };
            const basaltError = new BasaltError<Error>(errorOptions);

            expect(basaltError.cause).toBe(originalError);
            expect(basaltError.cause?.message).toBe('Original error message');
        });
    });

    describe('when constructing with partial options', () => {
        test('should create instance with minimal options and apply defaults', () => {
            const basaltError: BasaltError = _createMinimalError();

            expect(basaltError).toBeInstanceOf(BasaltError);
            expect(basaltError.message).toBe(testData.minimalErrorOptions.message);
            expect(basaltError.key).toBe('');
            expect(basaltError.httpStatusCode).toBe(500);
            expect(basaltError.cause).toBeUndefined();
        });

        test('should create instance with only key specified', () => {
            const errorOptions: BasaltErrorOptions = {
                key: testData.errorKeys.validation
            };
            const basaltError: BasaltError = new BasaltError(errorOptions);

            expect(basaltError.message).toBe('');
            expect(basaltError.key).toBe(testData.errorKeys.validation);
            expect(basaltError.httpStatusCode).toBe(500);
            expect(basaltError.cause).toBeUndefined();
        });

        test('should create instance with only httpStatusCode specified', () => {
            const errorOptions: BasaltErrorOptions = {
                httpStatusCode: testData.httpStatusCode.notFound
            };
            const basaltError: BasaltError = new BasaltError(errorOptions);

            expect(basaltError.message).toBe('');
            expect(basaltError.key).toBe('');
            expect(basaltError.httpStatusCode).toBe(testData.httpStatusCode.notFound);
            expect(basaltError.cause).toBeUndefined();
        });
    });

    describe('when constructing with default options', () => {
        test('should create instance with all default values when no options provided', () => {
            const basaltError: BasaltError = new BasaltError();

            expect(basaltError).toBeInstanceOf(BasaltError);
            expect(basaltError).toBeInstanceOf(Error);
            expect(basaltError.message).toBe('');
            expect(basaltError.name).toBe('BasaltError');
            expect(basaltError.key).toBe('');
            expect(basaltError.httpStatusCode).toBe(500);
            expect(basaltError.cause).toBeUndefined();
            expect(basaltError.stack).toBeDefined();
            expect(basaltError.uuid).toBeDefined();
            expect(basaltError.date).toBeDefined();
        });

        test('should create instance with undefined options', () => {
            const basaltError: BasaltError = new BasaltError(undefined);

            expect(basaltError.message).toBe('');
            expect(basaltError.key).toBe('');
            expect(basaltError.httpStatusCode).toBe(500);
            expect(basaltError.cause).toBeUndefined();
        });
    });

    describe('when testing instance properties', () => {
        test('should generate unique UUIDs for different instances', () => {
            const error1: BasaltError = new BasaltError();
            const error2: BasaltError = new BasaltError();
            const error3: BasaltError = new BasaltError();

            expect(error1.uuid).not.toBe(error2.uuid);
            expect(error2.uuid).not.toBe(error3.uuid);
            expect(error1.uuid).not.toBe(error3.uuid);
            // check if UUIDs are in valid format
            expect(error1.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

        test('should have creation dates close to current time', () => {
            const beforeCreation: number = _getCurrentTimestamp();
            const basaltError: BasaltError = new BasaltError();
            const afterCreation: number = _getCurrentTimestamp();

            expect(basaltError.date).toBeInstanceOf(Date);
            expect(basaltError.date.getTime()).toBeGreaterThanOrEqual(beforeCreation);
            expect(basaltError.date.getTime()).toBeLessThanOrEqual(afterCreation);
        });

        test('should have different creation dates for instances created at different times', async () => {
            const error1: BasaltError = new BasaltError();
            await new Promise((resolve: (value: unknown) => void): void => {
                setTimeout(resolve, 1);
            });
            const error2: BasaltError = new BasaltError();

            expect(error1.date.getTime()).toBeLessThan(error2.date.getTime());
        });
    });

    describe('when testing getter methods', () => {
        test('should return correct uuid value', () => {
            const basaltError: BasaltError = new BasaltError();
            const uuid: string = basaltError.uuid;

            expect(typeof uuid).toBe('string');
            expect(uuid).toHaveLength(36);
            expect(uuid).toBe(basaltError.uuid); // Should be consistent
        });

        test('should return correct date value', () => {
            const basaltError: BasaltError = new BasaltError();
            const date: Date = basaltError.date;

            expect(date).toBeInstanceOf(Date);
            expect(date).toBe(basaltError.date); // Should be the same reference
        });

        test('should return correct key value', () => {
            const basaltError: BasaltError = new BasaltError({
                key: testData.errorKeys.authentification
            });

            expect(basaltError.key).toBe(testData.errorKeys.authentification);
        });

        test('should return correct httpStatusCode value', () => {
            const basaltError: BasaltError = new BasaltError({
                httpStatusCode: testData.httpStatusCode.unauthorized
            });

            expect(basaltError.httpStatusCode).toBe(testData.httpStatusCode.unauthorized);
        });
    });

    describe('when testing Error inheritance', () => {
        test('should be throwable as Error', () => {
            expect(() => {
                throw new BasaltError({
                    message: 'Test error',
                    key: 'error.test'
                });
            }).toThrow(BasaltError);
        });

        test('should be catchable as Error', () => {
            try {
                throw new BasaltError({
                    message: 'Test error for catching',
                    key: 'error.catch.test'
                });
            } catch (error: unknown) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toBeInstanceOf(BasaltError);
                if (error instanceof BasaltError) {
                    expect(error.message).toBe('Test error for catching');
                    expect(error.key).toBe('error.catch.test');
                }
            }
        });

        test('should maintain Error properties', () => {
            const basaltError: BasaltError = new BasaltError({
                message: 'Error with stack trace'
            });

            expect(basaltError.name).toBe('BasaltError');
            expect(basaltError.message).toBe('Error with stack trace');
            expect(basaltError.stack).toBeDefined();
            expect(typeof basaltError.stack).toBe('string');
        });
    });

    describe('when testing with complex cause types', () => {
        test('should handle validation error cause', () => {
            const validationCause: ValidationErrorCause = {
                field: 'email',
                value: 'invalid-email',
                rule: 'email_format'
            };
            const basaltError = new BasaltError<ValidationErrorCause>({
                message: 'Validation failed',
                key: testData.errorKeys.validation,
                httpStatusCode: testData.httpStatusCode.badRequest,
                cause: validationCause
            });

            expect(basaltError.cause).toEqual(validationCause);
            expect(basaltError.cause?.field).toBe('email');
            expect(basaltError.cause?.value).toBe('invalid-email');
            expect(basaltError.cause?.rule).toBe('email_format');
        });

        test('should handle nested error objects as cause', () => {
            const nestedCause = {
                primaryError: new Error('Primary failure'),
                secondaryError: new Error('Secondary failure'),
                context: {
                    userId: 123,
                    action: 'update_profile'
                }
            } as const;
            const basaltError = new BasaltError<typeof nestedCause>({
                message: 'Multiple errors occurred',
                key: 'error.multiple.failures',
                httpStatusCode: testData.httpStatusCode.INTERNAL_SERVER_ERROR,
                cause: nestedCause
            });

            expect(basaltError.cause?.primaryError).toBeInstanceOf(Error);
            expect(basaltError.cause?.secondaryError).toBeInstanceOf(Error);
            expect(basaltError.cause?.context.userId).toBe(123);
            expect(basaltError.cause?.context.action).toBe('update_profile');
        });
    });

    describe('when testing edge cases', () => {
        test('should handle empty string values and fallback to defaults for falsy numbers', () => {
            const basaltError: BasaltError = new BasaltError({
                message: '',
                key: '',
                httpStatusCode: 0 // Should fallback to 500 since 0 is falsy
            });

            expect(basaltError.message).toBe('');
            expect(basaltError.key).toBe('');
            expect(basaltError.httpStatusCode).toBe(500); // Defaults to 500 for falsy values
        });

        test('should handle null cause', () => {
            const basaltError = new BasaltError<null>({
                message: 'Error with null cause',
                cause: null
            });

            expect(basaltError.cause).toBeNull();
        });

        test('should handle primitive cause types', () => {
            const stringCause = 'Simple string error';
            const numberCause = 404;
            const booleanCause = false;

            const stringError = new BasaltError<string>({
                message: 'String cause error',
                cause: stringCause
            });
            const numberError = new BasaltError<number>({
                message: 'Number cause error',
                cause: numberCause
            });
            const booleanError = new BasaltError<boolean>({
                message: 'Boolean cause error',
                cause: booleanCause
            });

            expect(stringError.cause).toBe(stringCause);
            expect(numberError.cause).toBe(numberCause);
            expect(booleanError.cause).toBe(booleanCause);
        });
    });
});
