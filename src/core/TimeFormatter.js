/**
 * TimeFormatter - Utility class for formatting time values
 * Follows OOP principles: Single Responsibility, Encapsulation
 */
class TimeFormatter {
    /**
     * Get the best time format for a given milliseconds value
     * @param {number} ms - Time in milliseconds
     * @returns {string} - Best format ('ms', 's', 'm', 'h', 'd')
     */
    static getBestFormat(ms) {
        if (ms < 2000) return 'ms';
        if (ms < 60000) return 's';
        if (ms < 3600000) return 'm';
        if (ms < 86400000) return 'h';
        return 'd';
    }

    /**
     * Format time value according to specified format
     * @param {number} ms - Time in milliseconds
     * @param {string} format - Format type ('ms', 's', 'm', 'h', 'd')
     * @returns {string} - Formatted time string
     */
    static format(ms, format = 'ms') {
        switch (format) {
            case 's':
                const seconds = ((ms % 60000) / 1000).toFixed(1);
                const minutes = Math.floor(ms / 60000);
                if (minutes > 0) {
                    return `${minutes}m ${seconds}s`;
                }
                return `${seconds}s`;

            case 'm':
                const mins = Math.floor(ms / 60000);
                const remainingMs = ms % 60000;
                const secs = ((remainingMs % 60000) / 1000).toFixed(1);
                const hours = Math.floor(ms / 3600000);
                if (hours > 0) {
                    return `${hours}h ${mins}m`;
                }
                return `${mins}m ${secs}s`;

            case 'h':
                const hrs = Math.floor(ms / 3600000);
                const remainingMsAfterHours = ms % 3600000;
                const minsAfterHours = Math.floor(remainingMsAfterHours / 60000);
                const secsAfterHours = ((remainingMsAfterHours % 60000) / 1000).toFixed(1);
                const days = Math.floor(ms / 86400000);
                if (days > 0) {
                    return days > 0 ? `${days}d ${hrs}h` : `${hrs}h`;
                }
                return hrs > 0 ? `${hrs}h ${minsAfterHours}m` : `${minsAfterHours}m`;

            case 'd':
                const daysCount = Math.floor(ms / 86400000);
                const remainingMsAfterDays = ms % 86400000;
                const hrsCount = Math.floor(remainingMsAfterDays / 3600000);
                const remainingMsAfterHoursCount = remainingMsAfterDays % 3600000;
                const minsAfterHoursCount = Math.floor(remainingMsAfterHoursCount / 60000);
                if (daysCount > 0) {
                    return hrsCount > 0 ? `${daysCount}d ${hrsCount}h` : `${daysCount}d`;
                }
                return hrsCount > 0 ? `${hrsCount}h ${minsAfterHoursCount}m` : `${minsAfterHoursCount}m`;

            case 'ms':
            default:
                return `${Math.round(ms)}ms`;
        }
    }

    /**
     * Format time value using the best format automatically
     * @param {number} ms - Time in milliseconds
     * @returns {string} - Formatted time string
     */
    static formatAuto(ms) {
        const format = this.getBestFormat(ms);
        return this.format(ms, format);
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.TimeFormatter = TimeFormatter;
}

