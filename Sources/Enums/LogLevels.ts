/**
 * Enum for log levels used in BasaltLogger.
 * This enum defines different levels of logging severity.
 */
export enum LogLevels {
    /**
     * Log level for error messages, indicating critical issues that need attention.
     */
    ERROR = 'ERROR',

    /**
     * Log level for warning messages, indicating potential issues or warnings.
     */
    WARN = 'WARN',

    /**
     * Log level for informational messages, providing general information about application processes.
     */
    INFO = 'INFO',

    /**
     * Log level for debug messages, useful for debugging and development purposes.
     */
    DEBUG = 'DEBUG',

    /**
     * Log level for general log messages, suitable for recording standard operational events.
     */
    LOG = 'LOG'
}
