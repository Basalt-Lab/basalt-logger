/**
 * Global error key is a list of errors in the global context.
 */
export const GLOBAL_KEY_ERROR = {
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
    NO_STRATEGY_ADDED: ['error.basalt-logger.no_strategy_added', 500],
    LOGGER_STRATEGY_ERROR: ['error.basalt-logger.strategy_error', 500]
} as const;
