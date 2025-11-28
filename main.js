function initLanguageIcons() {
    if (typeof LANGUAGE_ICONS === 'undefined') {
        setTimeout(() => initLanguageIcons(), 100);
        return;
    }
    const langMap = {
        'python': 'python',
        'java': 'java',
        'node': 'node',
        'deno': 'deno',
        'cpp': 'cpp',
        'c': 'c',
        'go': 'go',
        'rust': 'rust',
        'typescript': 'typescript',
        'ruby': 'ruby',
        'swift': 'swift',
        'kotlin': 'kotlin',
        'csharp': 'csharp',
        'javascript': 'javascript',
        'php': 'php',
        'elixir': 'elixir'
    };

    const processedIcons = new WeakSet();

    function injectIcons() {
        document.querySelectorAll('.lang-logo[data-lang], span[data-lang]').forEach(el => {
            if (processedIcons.has(el)) return;

            const lang = el.getAttribute('data-lang');
            if (!lang) return;

            const iconKey = langMap[lang];
            if (iconKey && LANGUAGE_ICONS[iconKey]) {
                if (el.tagName !== 'IMG') {
                    const img = document.createElement('img');
                    img.src = LANGUAGE_ICONS[iconKey];
                    img.alt = lang;
                    img.className = 'lang-icon-img';
                    img.loading = 'lazy'; // Lazy load icons
                    el.replaceWith(img);
                    processedIcons.add(img);
                } else {
                    processedIcons.add(el);
                }
            }
        });

        // Also check parent buttons with data-lang and find/create icon
        document.querySelectorAll('.lang-tab[data-lang]').forEach(button => {
            if (processedIcons.has(button)) return;

            const lang = button.getAttribute('data-lang');
            const iconKey = langMap[lang];
            if (iconKey && LANGUAGE_ICONS[iconKey]) {
                let iconEl = button.querySelector('.lang-logo, .lang-icon-img, span[data-lang], img.lang-icon-img');
                if (!iconEl || (iconEl.tagName !== 'IMG' && !iconEl.querySelector('img'))) {
                    // Create or replace with img element
                    if (iconEl && iconEl.tagName !== 'IMG') {
                        iconEl.remove();
                    }
                    const img = document.createElement('img');
                    img.src = LANGUAGE_ICONS[iconKey];
                    img.alt = lang;
                    img.className = 'lang-icon-img';
                    img.loading = 'lazy'; // Lazy load icons
                    button.insertBefore(img, button.firstChild);
                    processedIcons.add(img);
                } else if (iconEl.tagName === 'IMG') {
                    // Only update if src is different
                    if (iconEl.src !== new URL(LANGUAGE_ICONS[iconKey], window.location.href).href) {
                        iconEl.src = LANGUAGE_ICONS[iconKey];
                    }
                    processedIcons.add(iconEl);
                }
                processedIcons.add(button);
            }
        });
    }

    // Initial injection
    injectIcons();

    // Watch for dynamically added elements (optimized with debouncing)
    if (!window.iconObserver) {
        let iconUpdateTimeout;
        const debouncedInjectIcons = () => {
            clearTimeout(iconUpdateTimeout);
            iconUpdateTimeout = setTimeout(() => {
                injectIcons();
            }, 100); // Debounce to avoid excessive calls
        };

        window.iconObserver = new MutationObserver((mutations) => {
            // Only process if relevant nodes were added
            const hasRelevantChanges = mutations.some(mutation => {
                return Array.from(mutation.addedNodes).some(node => {
                    return node.nodeType === 1 && (
                        node.classList?.contains('lang-tab') ||
                        node.querySelector?.('.lang-tab, .lang-logo, [data-lang]')
                    );
                });
            });

            if (hasRelevantChanges) {
                debouncedInjectIcons();
            }
        });

        // Only observe childList changes, not attributes or characterData
        window.iconObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Make function globally available
window.initLanguageIcons = initLanguageIcons;

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
        // Initialize icons after a short delay to ensure LANGUAGE_ICONS is loaded
        setTimeout(() => initLanguageIcons(), 100);
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');

        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                if (section === 'playground') {
                    this.showPlaygroundModal();
                    return;
                }
                this.switchSection(section);
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    showPlaygroundModal() {
        const modal = document.getElementById('playgroundModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hidePlaygroundModal() {
        const modal = document.getElementById('playgroundModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    setupPlaygroundModal() {
        const closeBtn = document.getElementById('closePlaygroundModal');
        const modal = document.getElementById('playgroundModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hidePlaygroundModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hidePlaygroundModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                this.hidePlaygroundModal();
            }
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
        setTimeout(() => {
            switch (sectionId) {
                case 'sorting':
                    if (typeof sortingVisualizer !== 'undefined' && sortingVisualizer) {
                        sortingVisualizer.stop();
                        sortingVisualizer.generateArray();
                    }
                    break;
                case 'searching':
                    if (typeof searchingVisualizer !== 'undefined' && searchingVisualizer) {
                        searchingVisualizer.stop();
                        searchingVisualizer.generateArray();
                    }
                    break;
                case 'pathfinding':
                    if (typeof pathfindingVisualizer !== 'undefined' && pathfindingVisualizer) {
                        pathfindingVisualizer.stop();
                        pathfindingVisualizer.shouldStop = true;
                        pathfindingVisualizer.isRunning = false;
                        setTimeout(() => {
                            pathfindingVisualizer.initGrid();
                        }, 100);
                    }
                    break;
                case 'trees':
                    if (typeof treeVisualizer !== 'undefined' && treeVisualizer) {
                        treeVisualizer.stop();
                        treeVisualizer.shouldStop = true;
                        treeVisualizer.isRunning = false;
                        setTimeout(() => {
                            treeVisualizer.clear();
                            treeVisualizer.insertInitialNodes();
                        }, 100);
                    }
                    break;
                case 'graphs':
                    if (typeof graphVisualizer !== 'undefined' && graphVisualizer) {
                        graphVisualizer.stop();
                        graphVisualizer.shouldStop = true;
                        graphVisualizer.isRunning = false;
                        setTimeout(() => {
                            graphVisualizer.clear();
                            graphVisualizer.generateGraph();
                        }, 100);
                    }
                    break;
                case 'dp':
                    if (typeof dpVisualizer !== 'undefined' && dpVisualizer) {
                        if (dpVisualizer.stop) dpVisualizer.stop();
                        dpVisualizer.shouldStop = true;
                        dpVisualizer.isRunning = false;
                        setTimeout(() => {
                            if (dpVisualizer.reset) dpVisualizer.reset();
                        }, 100);
                    }
                    break;
                case 'strings':
                    if (typeof stringVisualizer !== 'undefined' && stringVisualizer) {
                        stringVisualizer.stop();
                        stringVisualizer.shouldStop = true;
                        stringVisualizer.isRunning = false;
                        setTimeout(() => {
                            stringVisualizer.render();
                        }, 100);
                    }
                    break;
                case 'math':
                    if (typeof mathVisualizer !== 'undefined' && mathVisualizer) {
                        if (mathVisualizer.stop) mathVisualizer.stop();
                        mathVisualizer.shouldStop = true;
                        mathVisualizer.isRunning = false;
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
            });

            container.appendChild(btn);
        });

        // Populate comparison algorithm dropdowns
        this.populateComparisonDropdowns(category);
    }

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
                    // Reset visualization when language changes
                    this.resetVisualization();
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

    updateElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    resetVisualization() {
        // Reset visualization state when language changes
        const section = this.currentSection;

        switch (section) {
            case 'sorting':
                if (typeof sortingVisualizer !== 'undefined' && sortingVisualizer) {
                    sortingVisualizer.stop();
                    sortingVisualizer.render(); // Reset visual state
                    sortingVisualizer.resetStats();
                    if (sortingVisualizer.updateButtonStates) {
                        sortingVisualizer.updateButtonStates();
                    }
                }
                break;
            case 'searching':
                if (typeof searchingVisualizer !== 'undefined' && searchingVisualizer) {
                    searchingVisualizer.stop();
                    searchingVisualizer.render(); // Reset visual state
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
                    graphVisualizer.render(); // Reset visual state
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
                    stringVisualizer.render(); // Reset visual state
                }
                break;
            case 'maths':
                if (typeof mathVisualizer !== 'undefined' && mathVisualizer) {
                    mathVisualizer.stop();
                }
                break;
        }
    }
}

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    // If saved theme is cyberpunk, reset to dark
    const theme = savedTheme === 'cyberpunk' ? 'dark' : savedTheme;
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeUI(theme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);

            // Update Rust and Deno icons when theme changes
            if (typeof updateRustIcons === 'function') {
                updateRustIcons();
            }
            if (typeof updateDenoIcons === 'function') {
                updateDenoIcons();
            }

            // Re-initialize language icons
            if (typeof initLanguageIcons === 'function') {
                setTimeout(() => initLanguageIcons(), 100);
            }

            if (typeof audioEngine !== 'undefined') {
                audioEngine.playSectionChange();
            }
        });
    }

    function updateThemeUI(currentTheme) {
        if (themeIcon && themeLabel) {
            // Show the CURRENT theme
            if (currentTheme === 'light') {
                themeIcon.textContent = '☀️';
                themeLabel.textContent = 'Light';
            } else {
                themeIcon.textContent = '🌙';
                themeLabel.textContent = 'Dark';
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

const app = new App();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.setupPlaygroundModal();
        setupFeedbackModal();
    });
} else {
    app.setupPlaygroundModal();
    setupFeedbackModal();
}

function setupFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    const openBtn = document.getElementById('feedbackBtn');
    const closeBtn = document.getElementById('feedbackCloseBtn');
    const cancelBtn = document.getElementById('cancelFeedback');
    const submitBtn = document.getElementById('submitFeedback');
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('ratingText');
    const feedbackText = document.getElementById('feedbackText');
    const successMsg = document.getElementById('feedbackSuccess');

    if (!modal || !openBtn) return;

    let selectedRating = 0;

    function openModal() {
        modal.style.display = 'flex';
        selectedRating = 0;
        updateStars(0);
        feedbackText.value = '';
        successMsg.style.display = 'none';
    }

    function closeModal() {
        modal.style.display = 'none';
        selectedRating = 0;
        updateStars(0);
        feedbackText.value = '';
        successMsg.style.display = 'none';
    }

    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });

        const ratings = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
        ratingText.textContent = rating > 0 ? ratings[rating] : 'Click to rate';
    }

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStars(selectedRating);
        });

        star.addEventListener('mouseenter', () => {
            updateStars(index + 1);
        });
    });

    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        starRating.addEventListener('mouseleave', () => {
            updateStars(selectedRating);
        });
    }

    openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }

            const comment = feedbackText.value.trim();
            const visitorId = localStorage.getItem('visitorId') || 'anonymous';

            let device = {};
            let location = {};

            try {
                const visitorData = localStorage.getItem('visitorData');
                if (visitorData) {
                    const data = JSON.parse(visitorData);
                    device = {
                        type: data.device_type || null,
                        os: data.device_os || null,
                        browser: data.device_browser || null
                    };
                    location = {
                        country: data.country || null,
                        city: data.city || null
                    };
                }
            } catch (e) {
                console.error('Error parsing visitor data:', e);
            }

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';

                const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                    ? 'http://localhost:3000/api/feedback'
                    : '/api/feedback';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        rating: selectedRating,
                        comment: comment || null,
                        visitor_id: visitorId,
                        device: device,
                        location: location
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    successMsg.style.display = 'block';
                    setTimeout(() => {
                        closeModal();
                    }, 2000);
                } else {
                    throw new Error(result.error || 'Failed to submit feedback');
                }
            } catch (error) {
                console.error('Feedback submission error:', error);
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    alert('Feedback API is only available when deployed. Your feedback will be saved when the app is live!');
                } else {
                    alert('Failed to submit feedback. Please try again.');
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Feedback';
            }
        });
    }
}
