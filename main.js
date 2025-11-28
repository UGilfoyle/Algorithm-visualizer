// ========================================
// Main Application Controller
// ========================================

class App {
    constructor() {
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
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAlgorithmSelectors();
        this.setupLanguageTabs();
        this.loadAlgorithmInfo();
    }

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

    switchSection(sectionId) {
        // Stop all running visualizations before switching
        if (typeof window.stopAllVisualizations === 'function') {
            window.stopAllVisualizations();
        }

        // Play section change sound
        if (typeof audioEngine !== 'undefined') {
            audioEngine.playSectionChange();
        }

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

    onSectionChange(sectionId) {
        // Short delay to ensure stop completes
        setTimeout(() => {
            switch (sectionId) {
                case 'sorting':
                    if (typeof sortingVisualizer !== 'undefined' && sortingVisualizer) {
                        sortingVisualizer.generateArray();
                    }
                    break;
                case 'searching':
                    if (typeof searchingVisualizer !== 'undefined' && searchingVisualizer) {
                        searchingVisualizer.generateArray();
                    }
                    break;
                case 'pathfinding':
                    if (typeof pathfindingVisualizer !== 'undefined' && pathfindingVisualizer) {
                        pathfindingVisualizer.initGrid();
                    }
                    break;
                case 'trees':
                    if (typeof treeVisualizer !== 'undefined' && treeVisualizer) {
                        treeVisualizer.clear();
                        treeVisualizer.insertInitialNodes();
                    }
                    break;
                case 'graphs':
                    if (typeof graphVisualizer !== 'undefined' && graphVisualizer) {
                        graphVisualizer.generateGraph();
                    }
                    break;
                case 'dp':
                    if (typeof dpVisualizer !== 'undefined' && dpVisualizer) {
                        dpVisualizer.showFibonacci(10);
                    }
                    break;
                case 'strings':
                    if (typeof stringVisualizer !== 'undefined' && stringVisualizer) {
                        stringVisualizer.render();
                    }
                    break;
                case 'math':
                    if (typeof mathVisualizer !== 'undefined' && mathVisualizer) {
                        // Math visualizer ready
                    }
                    break;
                case 'arena':
                    if (typeof languageArena !== 'undefined' && languageArena) {
                        languageArena.reset();
                    }
                    break;
            }
            this.loadAlgorithmInfo();
        }, 150);
    }

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

                if (category === 'sorting' && sortingVisualizer) {
                    sortingVisualizer.setAlgorithm(key);
                } else if (category === 'searching' && searchingVisualizer) {
                    searchingVisualizer.setAlgorithm(key);
                } else if (category === 'graphs' && pathfindingVisualizer) {
                    pathfindingVisualizer.setAlgorithm(key);
                }
            });

            container.appendChild(btn);
        });
    }

    setupLanguageTabs() {
        const tabContainers = [
            'languageTabs', 'searchLanguageTabs', 'pathLanguageTabs',
            'treeLanguageTabs', 'graphLanguageTabs', 'dpLanguageTabs',
            'stringLanguageTabs', 'mathLanguageTabs'
        ];

        tabContainers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.querySelectorAll('.lang-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    container.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    this.currentLanguage = tab.dataset.lang;
                    this.loadAlgorithmInfo();
                });
            });
        });

        const copyBtn = document.getElementById('copyCode');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const code = document.getElementById('codeDisplay')?.textContent;
                if (code) {
                    navigator.clipboard.writeText(code);
                    copyBtn.textContent = '✓';
                    setTimeout(() => copyBtn.textContent = 'Copy', 1000);
                }
            });
        }
    }

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
            let activeLang = 'javascript';
            if (tabContainer) {
                const activeTab = tabContainer.querySelector('.lang-tab.active');
                if (activeTab) {
                    activeLang = activeTab.dataset.lang;
                    this.currentLanguage = activeLang;
                }
            }
            const code = algo.code[activeLang] || algo.code.java || algo.code.cpp || algo.code.javascript || 'No implementation available';
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

    updateElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
}

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
            
            if (typeof audioEngine !== 'undefined') {
                audioEngine.playSectionChange();
            }
        });
    }
    
    function updateThemeUI(currentTheme) {
        if (themeIcon && themeLabel) {
            // Show what theme you'll switch TO, not the current theme
            if (currentTheme === 'light') {
                // Currently light, so button shows "Dark" (what you'll switch to)
                themeIcon.textContent = '🌙';
                themeLabel.textContent = 'Dark';
            } else {
                // Currently dark, so button shows "Light" (what you'll switch to)
                themeIcon.textContent = '☀️';
                themeLabel.textContent = 'Light';
            }
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const app = new App();

    console.log(`
    ᛭ ALGORITHM UNIVERSE ᛭
    
    Welcome, warrior of code!
    
    50+ Algorithms await your command.
    Toggle themes with the sun/moon button.
    `);
});

document.addEventListener('submit', e => e.preventDefault());
