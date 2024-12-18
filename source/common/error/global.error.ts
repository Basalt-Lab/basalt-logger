/**
 * Error keys for the Basalt logger
 */
export const GLOBAL_ERRORS: Record<string, [string, number]> = {
    /**
     * Interpolation :
     * - strategyName : The name of the strategy.
     */
    STRATEGY_ALREADY_ADDED: ['error.basalt-logger.strategy_already_added', 500],
    /**
     * Interpolation :
     * - strategyName : The name of the strategy
     */
    STRATEGY_NOT_FOUND: ['error.basalt-logger.strategy_not_found', 500],
    NO_STRATEGY_ADDED: ['error.basalt-logger.no_strategy_added', 500]
};
