/**
 * VisualizationManager - Manages all visualization instances
 * Follows OOP principles: Single Responsibility, Facade Pattern
 */
class VisualizationManager {
    constructor() {
        this.visualizers = {
            sorting: null,
            searching: null,
            pathfinding: null,
            trees: null,
            graphs: null,
            dp: null,
            strings: null,
            math: null
        };
        this.isRunning = false;
    }

    /**
     * Register a visualizer instance
     * @param {string} type - Visualizer type
     * @param {Object} instance - Visualizer instance
     */
    register(type, instance) {
        if (this.visualizers.hasOwnProperty(type)) {
            this.visualizers[type] = instance;
        }
    }

    /**
     * Get a visualizer instance
     * @param {string} type - Visualizer type
     * @returns {Object|null} - Visualizer instance or null
     */
    get(type) {
        return this.visualizers[type] || null;
    }

    /**
     * Stop all running visualizations
     */
    stopAll() {
        Object.values(this.visualizers).forEach(viz => {
            if (viz && typeof viz.stop === 'function') {
                viz.stop();
            }
        });
        this.isRunning = false;
    }

    /**
     * Reset all visualizations
     */
    resetAll() {
        Object.values(this.visualizers).forEach(viz => {
            if (viz && typeof viz.reset === 'function') {
                viz.reset();
            } else if (viz && typeof viz.stop === 'function') {
                viz.stop();
            }
        });
    }

    /**
     * Stop a specific visualizer
     * @param {string} type - Visualizer type
     */
    stop(type) {
        const viz = this.visualizers[type];
        if (viz && typeof viz.stop === 'function') {
            viz.stop();
        }
    }

    /**
     * Reset a specific visualizer
     * @param {string} type - Visualizer type
     */
    reset(type) {
        const viz = this.visualizers[type];
        if (viz && typeof viz.reset === 'function') {
            viz.reset();
        } else if (viz && typeof viz.stop === 'function') {
            viz.stop();
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.VisualizationManager = VisualizationManager;
}

