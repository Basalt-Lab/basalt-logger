import { ErrorEntity } from './ErrorEntity';

/**
 * Represents the error codes for the Basalt Data.
 */
export enum ErrorBasaltLoggerCodes {
    STRATEGY_ALREADY_ADDED = 'STRATEGY_ALREADY_ADDED',
    STRATEGY_NOT_FOUND = 'STRATEGY_NOT_FOUND',
    NO_STRATEGY_ADDED = 'NO_STRATEGY_ADDED'
}

/**
 * Represents an error that occurs during the Basalt Data Service.
 */
export class ErrorBasaltLogger extends ErrorEntity {}