// ========================================
// Performance Utilities
// ========================================

// Debounce function - limits function calls
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function - limits function execution rate
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// RequestAnimationFrame wrapper for smooth animations
export function rafThrottle(func) {
    let rafId = null;
    return function(...args) {
        if (rafId === null) {
            rafId = requestAnimationFrame(() => {
                func.apply(this, args);
                rafId = null;
            });
        }
    };
}

// Lazy load images with intersection observer
export function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Cache for icon loading
const iconCache = new Map();

// Load icon with caching
export function loadIcon(path) {
    if (iconCache.has(path)) {
        return Promise.resolve(iconCache.get(path));
    }
    
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            iconCache.set(path, img);
            resolve(img);
        };
        img.onerror = reject;
        img.src = path;
    });
}

// Clean up event listeners
export function cleanupEventListeners(element, eventType, handler) {
    if (element && handler) {
        element.removeEventListener(eventType, handler);
    }
}

// Batch DOM updates
export function batchDOMUpdates(updates) {
    requestAnimationFrame(() => {
        updates.forEach(update => update());
    });
}

