/**
 * Global error key is a list of errors in the global context.
 */
export const GLOBAL_KEY_ERROR = {
    /**
     * Interpolation :
     * - strategyName : The name of the strategy.
     */
    STRATEGY_ALREADY_ADDED: ['basalt-logger.error.strategy_already_added', 500],
    /**
     * Interpolation :
     * - strategyName : The name of the strategy
     */
    STRATEGY_NOT_FOUND: ['basalt-logger.error.strategy_not_found', 500],
    NO_STRATEGY_ADDED: ['basalt-logger.error.no_strategy_added', 500],
    LOGGER_STRATEGY_ERROR: ['basalt-logger.error.strategy_error', 500]
} as const;
