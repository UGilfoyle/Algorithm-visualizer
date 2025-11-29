/**
 * AlgorithmVisualizer - Main Application Class
 * Follows OOP principles: Single Responsibility, Encapsulation, Dependency Injection
 */
class AlgorithmVisualizer {
    constructor() {
        // Core managers
        this.languageManager = new LanguageManager();
        this.visualizationManager = new VisualizationManager();
        
        // Application state
        this.currentSection = 'sorting';
        this.currentLanguage = 'javascript';
        this.currentAlgorithm = {
            sorting: 'bubbleSort',
            searching: 'binarySearch',
            pathfinding: 'bfs',
            trees: 'inorderTraversal',
            graphs: 'bfs',
            dp: 'fibonacci',
            strings: 'kmp',
            math: 'gcd'
        };
        
        // Initialize
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupNavigation();
        this.setupAlgorithmSelectors();
        this.setupLanguageTabs();
        this.loadAlgorithmInfo();
        
        // Initialize icons after a short delay
        setTimeout(() => {
            if (typeof initLanguageIcons === 'function') {
                initLanguageIcons();
            }
        }, 100);
    }

    /**
     * Setup navigation event listeners
     */
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.switchSection(section);
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    /**
     * Switch to a different section
     * @param {string} sectionId - Section ID to switch to
     */
    switchSection(sectionId) {
        // Stop all running visualizations
        if (this.visualizationManager) {
            this.visualizationManager.stopAll();
        } else if (typeof window.stopAllVisualizations === 'function') {
            window.stopAllVisualizations();
        }

        // Play section change sound
        if (typeof audioEngine !== 'undefined' && audioEngine) {
            audioEngine.playSectionChange();
        }

        // Update UI
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            this.onSectionChange(sectionId);
        }
    }

    /**
     * Handle section change logic
     * @param {string} sectionId - Section ID
     */
    onSectionChange(sectionId) {
        setTimeout(() => {
            switch (sectionId) {
                case 'sorting':
                    this.handleSortingSection();
                    break;
                case 'searching':
                    this.handleSearchingSection();
                    break;
                case 'pathfinding':
                    this.handlePathfindingSection();
                    break;
                case 'trees':
                    this.handleTreesSection();
                    break;
                case 'graphs':
                    this.handleGraphsSection();
                    break;
                case 'dp':
                    this.handleDPSection();
                    break;
                case 'strings':
                    this.handleStringsSection();
                    break;
                case 'math':
                    this.handleMathSection();
                    break;
                case 'arena':
                    this.handleArenaSection();
                    break;
                case 'playground':
                    this.handlePlaygroundSection();
                    break;
            }
            this.loadAlgorithmInfo();
        }, 150);
    }

    // Section-specific handlers (extracted for better organization)
    handleSortingSection() {
        const viz = this.visualizationManager.get('sorting');
        if (viz) {
            viz.stop();
            viz.generateArray();
        }
    }

    handleSearchingSection() {
        const viz = this.visualizationManager.get('searching');
        if (viz) {
            viz.stop();
            viz.generateArray();
        }
    }

    handlePathfindingSection() {
        const viz = this.visualizationManager.get('pathfinding');
        if (viz) {
            viz.stop();
            viz.shouldStop = true;
            viz.isRunning = false;
            setTimeout(() => {
                viz.initGrid();
            }, 100);
        }
    }

    handleTreesSection() {
        const viz = this.visualizationManager.get('trees');
        if (viz) {
            viz.stop();
            viz.shouldStop = true;
            viz.isRunning = false;
            setTimeout(() => {
                viz.clear();
                viz.insertInitialNodes();
            }, 100);
        }
    }

    handleGraphsSection() {
        const viz = this.visualizationManager.get('graphs');
        if (viz) {
            viz.stop();
            viz.shouldStop = true;
            viz.isRunning = false;
            setTimeout(() => {
                viz.clear();
                viz.generateGraph();
            }, 100);
        }
    }

    handleDPSection() {
        const viz = this.visualizationManager.get('dp');
        if (viz) {
            if (viz.stop) viz.stop();
            viz.shouldStop = true;
            viz.isRunning = false;
            setTimeout(() => {
                if (viz.reset) viz.reset();
            }, 100);
        }
    }

    handleStringsSection() {
        const viz = this.visualizationManager.get('strings');
        if (viz) {
            viz.stop();
            viz.shouldStop = true;
            viz.isRunning = false;
            setTimeout(() => {
                viz.render();
            }, 100);
        }
    }

    handleMathSection() {
        const viz = this.visualizationManager.get('math');
        if (viz) {
            if (viz.stop) viz.stop();
            viz.shouldStop = true;
            viz.isRunning = false;
            setTimeout(() => {
                const mathViz = document.getElementById('mathVisualization');
                if (mathViz) mathViz.innerHTML = '';
                const mathResult = document.getElementById('mathResult');
                if (mathResult) mathResult.textContent = '-';
                const mathSteps = document.getElementById('mathSteps');
                if (mathSteps) mathSteps.textContent = '0';
                const mathTime = document.getElementById('mathTime');
                if (mathTime) mathTime.textContent = '0ms';
            }, 100);
        }
    }

    handleArenaSection() {
        if (typeof languageArena !== 'undefined' && languageArena) {
            languageArena.reset();
        }
    }

    handlePlaygroundSection() {
        if (typeof playgroundManager !== 'undefined' && playgroundManager) {
            playgroundManager.init();
        }
    }

    /**
     * Setup algorithm selectors for all sections
     */
    setupAlgorithmSelectors() {
        this.populateAlgorithmGrid('sorting', 'sortingAlgorithms');
        this.populateAlgorithmGrid('searching', 'searchingAlgorithms');
        this.populateAlgorithmGrid('graphs', 'graphAlgorithms');
        this.populateAlgorithmGrid('trees', 'treeAlgorithms');
        this.populateAlgorithmGrid('dp', 'dpAlgorithms');
        this.populateAlgorithmGrid('strings', 'stringAlgorithms');
        this.populateAlgorithmGrid('math', 'mathAlgorithms');
        this.populateAlgorithmGrid('graphs', 'pathfindingAlgorithms');
    }

    /**
     * Populate algorithm grid for a category
     * @param {string} category - Algorithm category
     * @param {string} containerId - Container element ID
     */
    populateAlgorithmGrid(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !ALGORITHMS[category]) return;

        container.innerHTML = '';

        Object.keys(ALGORITHMS[category]).forEach(key => {
            const algo = ALGORITHMS[category][key];
            const btn = document.createElement('button');
            btn.className = 'algo-btn';
            btn.textContent = algo.name;
            btn.dataset.algorithm = key;
            btn.dataset.category = category;

            if (key === this.currentAlgorithm[category]) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                container.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentAlgorithm[category] = key;
                this.loadAlgorithmInfo();
                this.handleAlgorithmChange(category, key);
            });

            container.appendChild(btn);
        });

        // Populate comparison algorithm dropdowns
        this.populateComparisonDropdowns(category);
    }

    /**
     * Handle algorithm change
     * @param {string} category - Algorithm category
     * @param {string} key - Algorithm key
     */
    handleAlgorithmChange(category, key) {
        // Reset visualization when algorithm changes
        if (category === 'sorting' && sortingVisualizer) {
            sortingVisualizer.stop();
            sortingVisualizer.setAlgorithm(key);
            sortingVisualizer.generateArray();
            sortingVisualizer.resetStats();
        } else if (category === 'searching' && searchingVisualizer) {
            searchingVisualizer.stop();
            searchingVisualizer.setAlgorithm(key);
            searchingVisualizer.generateArray();
            searchingVisualizer.resetStats();
        } else if (category === 'graphs' && graphVisualizer) {
            graphVisualizer.stop();
            graphVisualizer.generateGraph();
        } else if (category === 'graphs' && pathfindingVisualizer) {
            pathfindingVisualizer.stop();
            pathfindingVisualizer.setAlgorithm(key);
            pathfindingVisualizer.initGrid();
        } else if (category === 'trees' && treeVisualizer) {
            treeVisualizer.stop();
            treeVisualizer.clear();
            treeVisualizer.insertInitialNodes();
        } else if (category === 'dp' && dpVisualizer) {
            if (dpVisualizer.stop) dpVisualizer.stop();
            if (dpVisualizer.reset) dpVisualizer.reset();
        } else if (category === 'strings' && stringVisualizer) {
            stringVisualizer.stop();
            stringVisualizer.render();
        } else if (category === 'math' && mathVisualizer) {
            if (mathVisualizer.stop) mathVisualizer.stop();
            const mathViz = document.getElementById('mathVisualization');
            if (mathViz) mathViz.innerHTML = '';
            const mathResult = document.getElementById('mathResult');
            if (mathResult) mathResult.textContent = '-';
            const mathSteps = document.getElementById('mathSteps');
            if (mathSteps) mathSteps.textContent = '0';
            const mathTime = document.getElementById('mathTime');
            if (mathTime) mathTime.textContent = '0ms';
        }
    }

    /**
     * Populate comparison dropdowns
     * @param {string} category - Algorithm category
     */
    populateComparisonDropdowns(category) {
        // Pathfinding uses graphs category
        const actualCategory = category === 'pathfinding' ? 'graphs' : category;
        if (!ALGORITHMS[actualCategory]) return;

        const dropdownIds = {
            trees: ['treeCompareAlgo1', 'treeCompareAlgo2'],
            graphs: ['graphCompareAlgo1', 'graphCompareAlgo2'],
            dp: ['dpCompareAlgo1', 'dpCompareAlgo2'],
            pathfinding: ['pathCompareAlgo1', 'pathCompareAlgo2']
        };

        const ids = dropdownIds[category];
        if (!ids) return;

        // Filter pathfinding algorithms (bfs, dfs, dijkstra, astar, greedy)
        const pathfindingAlgos = ['bfs', 'dfs', 'dijkstra', 'astar', 'greedy'];

        ids.forEach(id => {
            const dropdown = document.getElementById(id);
            if (!dropdown) return;

            dropdown.innerHTML = '';
            Object.keys(ALGORITHMS[actualCategory]).forEach(key => {
                // For pathfinding, only show pathfinding algorithms
                if (category === 'pathfinding' && !pathfindingAlgos.includes(key)) {
                    return;
                }
                const algo = ALGORITHMS[actualCategory][key];
                const option = document.createElement('option');
                option.value = key;
                option.textContent = algo.name;
                dropdown.appendChild(option);
            });
        });
    }

    /**
     * Load algorithm information
     */
    loadAlgorithmInfo() {
        const section = this.currentSection;
        let category = section;

        if (section === 'pathfinding') category = 'graphs';

        const algoKey = this.currentAlgorithm[category] || this.currentAlgorithm[section];
        const algo = ALGORITHMS[category]?.[algoKey];

        if (!algo) return;

        const codeDisplayIds = {
            sorting: 'codeDisplay',
            searching: 'searchCodeDisplay',
            pathfinding: 'pathCodeDisplay',
            trees: 'treeCodeDisplay',
            graphs: 'graphCodeDisplay',
            dp: 'dpCodeDisplay',
            strings: 'stringCodeDisplay',
            math: 'mathCodeDisplay'
        };

        const tabContainerIds = {
            sorting: 'languageTabs',
            searching: 'searchLanguageTabs',
            pathfinding: 'pathLanguageTabs',
            trees: 'treeLanguageTabs',
            graphs: 'graphLanguageTabs',
            dp: 'dpLanguageTabs',
            strings: 'stringLanguageTabs',
            math: 'mathLanguageTabs'
        };

        const codeEl = document.getElementById(codeDisplayIds[section]);
        if (codeEl && algo.code) {
            // Get the active language from the tabs
            const tabContainer = document.getElementById(tabContainerIds[section]);
            let activeLang = 'node';
            if (tabContainer) {
                const activeTab = tabContainer.querySelector('.lang-tab.active');
                if (activeTab) {
                    activeLang = activeTab.dataset.lang;
                    this.currentLanguage = activeLang;
                }
            }
            // Node.js and Deno use JavaScript code
            const langCode = (activeLang === 'node' || activeLang === 'deno') ? 'javascript' : activeLang;
            const code = algo.code[langCode] || algo.code.javascript || algo.code.java || algo.code.cpp || 'No implementation available';
            codeEl.textContent = code;
        }

        if (section === 'sorting') {
            this.updateElementText('timeBest', algo.complexity?.best || '-');
            this.updateElementText('timeAvg', algo.complexity?.avg || '-');
            this.updateElementText('timeWorst', algo.complexity?.worst || '-');
            this.updateElementText('spaceComplexity', algo.complexity?.space || '-');
            this.updateElementText('algoDescription', algo.description || '-');
        } else if (section === 'searching') {
            this.updateElementText('searchTimeBest', algo.complexity?.best || '-');
            this.updateElementText('searchTimeWorst', algo.complexity?.worst || '-');
            this.updateElementText('searchSpaceComplexity', algo.complexity?.space || '-');
            this.updateElementText('searchAlgoDescription', algo.description || '-');
        }
    }

    /**
     * Update element text content
     * @param {string} id - Element ID
     * @param {string} text - Text content
     */
    updateElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    /**
     * Setup language tabs
     */
    setupLanguageTabs() {
        const tabContainers = document.querySelectorAll('.language-tabs');
        
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.lang-tab');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs in this container
                    container.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
                    // Add active class to clicked tab
                    tab.classList.add('active');
                    
                    // Update code display
                    this.loadAlgorithmInfo();
                    this.resetVisualization();
                });
            });
        });
    }

    /**
     * Reset visualization when language changes
     */
    resetVisualization() {
        const section = this.currentSection;

        switch (section) {
            case 'sorting':
                if (typeof sortingVisualizer !== 'undefined' && sortingVisualizer) {
                    sortingVisualizer.stop();
                    sortingVisualizer.render();
                    sortingVisualizer.resetStats();
                    if (sortingVisualizer.updateButtonStates) {
                        sortingVisualizer.updateButtonStates();
                    }
                }
                break;
            case 'searching':
                if (typeof searchingVisualizer !== 'undefined' && searchingVisualizer) {
                    searchingVisualizer.stop();
                    searchingVisualizer.render();
                    searchingVisualizer.resetStats();
                }
                break;
            case 'pathfinding':
                if (typeof pathfindingVisualizer !== 'undefined' && pathfindingVisualizer) {
                    pathfindingVisualizer.reset();
                }
                break;
            case 'trees':
                if (typeof treeVisualizer !== 'undefined' && treeVisualizer) {
                    treeVisualizer.stop();
                }
                break;
            case 'graphs':
                if (typeof graphVisualizer !== 'undefined' && graphVisualizer) {
                    graphVisualizer.stop();
                    graphVisualizer.render();
                }
                break;
            case 'dp':
                if (typeof dpVisualizer !== 'undefined' && dpVisualizer) {
                    dpVisualizer.stop();
                    if (dpVisualizer.reset) {
                        dpVisualizer.reset();
                    }
                }
                break;
            case 'strings':
                if (typeof stringVisualizer !== 'undefined' && stringVisualizer) {
                    stringVisualizer.stop();
                    stringVisualizer.render();
                }
                break;
            case 'math':
                if (typeof mathVisualizer !== 'undefined' && mathVisualizer) {
                    mathVisualizer.stop();
                }
                break;
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AlgorithmVisualizer = AlgorithmVisualizer;
}

