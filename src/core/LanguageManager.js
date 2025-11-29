/**
 * LanguageManager - Manages language-related operations
 * Follows OOP principles: Single Responsibility, Encapsulation
 */
class LanguageManager {
    constructor() {
        this._cachedIcons = null;
        this._cachedTheme = null;
        this._cachedInfo = null;
        this.languageSpeed = {
            cpp: 1.0,
            rust: 1.0,
            c: 1.05,
            go: 1.1,
            java: 1.2,
            csharp: 1.25,
            kotlin: 1.3,
            swift: 1.35,
            python: 1.5,
            node: 1.6,
            deno: 1.65,
            typescript: 1.7,
            javascript: 1.8,
            ruby: 2.0,
            php: 2.2,
            elixir: 2.5,
            bash: 3.0
        };
    }

    /**
     * Get language icons based on current theme
     * @returns {Object} - Object mapping language keys to icon paths
     */
    getIcons() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (this._cachedIcons && this._cachedTheme === currentTheme) {
            return this._cachedIcons;
        }

        const isDarkMode = currentTheme !== 'light';
        const icons = {
            python: 'icons/python.svg',
            java: 'icons/java.svg',
            node: 'icons/nodejs.svg',
            deno: isDarkMode ? 'icons/deno-light.svg' : 'icons/deno.png',
            cpp: 'icons/cplusplus.svg',
            c: 'icons/cplusplus.svg',
            go: 'icons/go.svg',
            rust: isDarkMode ? 'icons/rust.svg' : 'icons/rust-dark.png',
            typescript: 'icons/typescript.svg',
            ruby: 'icons/ruby.svg',
            swift: 'icons/swift.svg',
            kotlin: 'icons/kotlin.svg',
            csharp: 'icons/csharp.svg',
            javascript: 'icons/javascript.svg',
            php: 'icons/php.svg',
            elixir: 'icons/elixir.svg',
            bash: 'icons/bash.svg'
        };

        this._cachedIcons = icons;
        this._cachedTheme = currentTheme;
        return icons;
    }

    /**
     * Get language information with icons and names
     * @returns {Object} - Object mapping language keys to info objects
     */
    getInfo() {
        if (this._cachedInfo) {
            return this._cachedInfo;
        }

        const icons = this.getIcons();
        const info = {
            python: { icon: icons.python, name: 'Python' },
            java: { icon: icons.java, name: 'Java' },
            node: { icon: icons.node, name: 'Node.js' },
            deno: { icon: icons.deno, name: 'Deno' },
            cpp: { icon: icons.cpp, name: 'C++' },
            c: { icon: icons.c, name: 'C' },
            go: { icon: icons.go, name: 'Go' },
            rust: { icon: icons.rust, name: 'Rust' },
            typescript: { icon: icons.typescript, name: 'TypeScript' },
            ruby: { icon: icons.ruby, name: 'Ruby' },
            swift: { icon: icons.swift, name: 'Swift' },
            kotlin: { icon: icons.kotlin, name: 'Kotlin' },
            csharp: { icon: icons.csharp, name: 'C#' },
            javascript: { icon: icons.javascript, name: 'JavaScript' },
            php: { icon: icons.php, name: 'PHP' },
            elixir: { icon: icons.elixir, name: 'Elixir' },
            bash: { icon: icons.bash, name: 'Bash' }
        };

        this._cachedInfo = info;
        return info;
    }

    /**
     * Get speed multiplier for a language
     * @param {string} langKey - Language key
     * @returns {number} - Speed multiplier
     */
    getSpeed(langKey) {
        return this.languageSpeed[langKey] || 1.0;
    }

    /**
     * Clear cached data (useful when theme changes)
     */
    clearCache() {
        this._cachedIcons = null;
        this._cachedTheme = null;
        this._cachedInfo = null;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.LanguageManager = LanguageManager;
}

