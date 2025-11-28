// ========================================
// Algorithm Visualizer Engine - Valhalla Edition
// With proper stop/reset functionality
// ========================================

// Global stop flag
let globalStopFlag = false;

// Global time formatter
function formatTimeValue(ms, format = 'ms') {
    switch (format) {
        case 's':
            return `${(ms / 1000).toFixed(3)}s`;
        case 'm':
            const minutes = Math.floor(ms / 60000);
            const seconds = ((ms % 60000) / 1000).toFixed(1);
            return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        case 'ms':
        default:
            return `${Math.round(ms)}ms`;
    }
}

// Store raw time values for format switching
let rawTimeValues = {
    sortTime: 0,
    pathTime: 0,
    searchTime: 0,
    graphTime: 0,
    dpTime: 0,
    stringTime: 0,
    mathTime: 0
};

// Function to stop all visualizations
function stopAllVisualizations() {
    globalStopFlag = true;
    if (sortingVisualizer) sortingVisualizer.stop();
    if (searchingVisualizer) searchingVisualizer.stop();
    if (pathfindingVisualizer) pathfindingVisualizer.stop();
    if (treeVisualizer) treeVisualizer.stop();
    if (graphVisualizer) graphVisualizer.stop();
    if (dpVisualizer) dpVisualizer.stop();
    if (stringVisualizer) stringVisualizer.stop();
    if (languageArena) languageArena.stop();

    // Reset flag after a short delay
    setTimeout(() => { globalStopFlag = false; }, 100);
}

// Language performance multipliers (higher = slower execution time)
// Based on real-world benchmarks for typical algorithms
const LANGUAGE_SPEED = {
    cpp: 1.0,        // Baseline (fastest)
    rust: 1.0,       // Similar to C++
    c: 1.0,          // Similar to C++
    go: 1.2,         // Slightly slower than C++
    java: 1.5,       // JIT compiled, fast but not as fast as native
    csharp: 1.6,     // Similar to Java
    kotlin: 1.7,     // JVM-based, similar to Java
    swift: 1.3,      // Fast, optimized
    node: 2.0,       // V8 JIT, surprisingly fast for JS
    deno: 2.1,       // Deno runtime, V8 based, slightly slower than Node
    javascript: 2.2, // V8 optimized but still slower
    typescript: 2.2, // Compiles to JS, similar performance
    python: 8.0,     // Interpreted, significantly slower
    ruby: 12.0,      // Interpreted, slower than Python
    php: 10.0,       // Server-side, slower
    elixir: 5.0      // BEAM VM, moderate speed
};

const LANGUAGE_INFO = {
    javascript: { name: 'JavaScript', symbol: 'JS', color: '#f7df1e', logoClass: 'js-logo' },
    python: { name: 'Python', symbol: 'PY', color: '#3776ab', logoClass: 'python-logo' },
    java: { name: 'Java', symbol: 'JV', color: '#007396', logoClass: 'java-logo' },
    cpp: { name: 'C++', symbol: 'C++', color: '#00599c', logoClass: 'cpp-logo' },
    csharp: { name: 'C#', symbol: 'C#', color: '#239120', logoClass: 'csharp-logo' },
    go: { name: 'Go', symbol: 'GO', color: '#00add8', logoClass: 'go-logo' },
    rust: { name: 'Rust', symbol: 'RS', color: '#dea584', logoClass: 'rust-logo' },
    ruby: { name: 'Ruby', symbol: 'RB', color: '#cc342d', logoClass: 'ruby-logo' },
    php: { name: 'PHP', symbol: 'PHP', color: '#777bb4', logoClass: 'php-logo' },
    elixir: { name: 'Elixir', symbol: 'EX', color: '#6e4a7e', logoClass: 'elixir-logo' },
    node: { name: 'Node.js', symbol: 'ND', color: '#339933', logoClass: 'node-logo' },
    deno: { name: 'Deno', symbol: 'DN', color: '#000000', logoClass: 'deno-logo' },
    kotlin: { name: 'Kotlin', symbol: 'KT', color: '#7F52FF', logoClass: 'kotlin-logo' },
    swift: { name: 'Swift', symbol: 'SW', color: '#FA7343', logoClass: 'swift-logo' }
};

// ==================== SORTING VISUALIZER ====================
class SortingVisualizer {
    constructor() {
        this.array = [];
        this.size = 30;
        this.speed = 50;
        this.isRunning = false;
        this.shouldStop = false;
        this.comparisons = 0;
        this.swaps = 0;
        this.currentAlgorithm = 'bubbleSort';
        this.container = document.getElementById('sortingBars');
        this.init();
    }

    init() {
        this.generateArray();
        this.bindEvents();
    }

    bindEvents() {
        const sizeSlider = document.getElementById('arraySize');
        const speedSlider = document.getElementById('sortSpeed');
        const shuffleBtn = document.getElementById('shuffleArray');
        const startBtn = document.getElementById('startSort');
        const stopBtn = document.getElementById('stopSort');

        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.size = parseInt(e.target.value);
                document.getElementById('arraySizeValue').textContent = this.size;
                this.generateArray();
            });
        }

        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
            });
        }

        if (shuffleBtn) shuffleBtn.addEventListener('click', () => this.generateArray());
        if (startBtn) startBtn.addEventListener('click', () => this.start());
        if (stopBtn) stopBtn.addEventListener('click', () => this.stop());
    }

    generateArray() {
        this.stop();
        this.array = Array.from({ length: this.size }, () => Math.floor(Math.random() * 100) + 1);
        this.render();
        this.resetStats();
    }

    render(comparing = [], swapping = [], sorted = []) {
        if (!this.container) return;
        this.container.innerHTML = '';
        const maxVal = Math.max(...this.array);

        this.array.forEach((val, idx) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(val / maxVal) * 100}%`;

            if (sorted.includes(idx)) bar.classList.add('sorted');
            else if (swapping.includes(idx)) bar.classList.add('swapping');
            else if (comparing.includes(idx)) bar.classList.add('comparing');

            this.container.appendChild(bar);
        });
    }

    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.updateStat('comparisons', '0');
        this.updateStat('swaps', '0');
        this.updateStat('sortTime', '0ms');
    }

    updateStat(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    async start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.shouldStop = false;
        this.resetStats();

        if (typeof audioEngine !== 'undefined') audioEngine.playBattleStart();

        const startTime = performance.now();

        switch (this.currentAlgorithm) {
            case 'bubbleSort': await this.bubbleSort(); break;
            case 'quickSort': await this.quickSort(0, this.array.length - 1); break;
            case 'mergeSort': await this.mergeSortWrapper(); break;
            case 'insertionSort': await this.insertionSort(); break;
            case 'selectionSort': await this.selectionSort(); break;
            case 'heapSort': await this.heapSort(); break;
            default: await this.bubbleSort();
        }

        if (!this.shouldStop) {
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            rawTimeValues.sortTime = elapsed;
            const formatSelect = document.getElementById('sortTimeFormat');
            const format = formatSelect ? formatSelect.value : 'ms';
            this.updateStat('sortTime', formatTimeValue(elapsed, format));
            this.render([], [], Array.from({ length: this.array.length }, (_, i) => i));
            if (typeof audioEngine !== 'undefined') audioEngine.playComplete();
        }

        this.isRunning = false;
    }

    getDelay() {
        return Math.max(1, 101 - this.speed);
    }

    async delay() {
        if (this.shouldStop) return;
        return new Promise(resolve => setTimeout(resolve, this.getDelay()));
    }

    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1 && !this.shouldStop; i++) {
            for (let j = 0; j < n - i - 1 && !this.shouldStop; j++) {
                this.comparisons++;
                this.updateStat('comparisons', this.comparisons);
                this.render([j, j + 1], []);
                if (typeof audioEngine !== 'undefined') audioEngine.playComparison(this.array[j], this.array[j + 1]);

                if (this.array[j] > this.array[j + 1]) {
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.swaps++;
                    this.updateStat('swaps', this.swaps);
                    this.render([], [j, j + 1]);
                    if (typeof audioEngine !== 'undefined') audioEngine.playSwap();
                }
                await this.delay();
            }
        }
    }

    async insertionSort() {
        for (let i = 1; i < this.array.length && !this.shouldStop; i++) {
            let key = this.array[i];
            let j = i - 1;

            while (j >= 0 && this.array[j] > key && !this.shouldStop) {
                this.comparisons++;
                this.updateStat('comparisons', this.comparisons);
                this.array[j + 1] = this.array[j];
                this.swaps++;
                this.updateStat('swaps', this.swaps);
                this.render([j], [j + 1]);
                if (typeof audioEngine !== 'undefined') audioEngine.playInsert();
                await this.delay();
                j--;
            }
            this.array[j + 1] = key;
        }
    }

    async selectionSort() {
        for (let i = 0; i < this.array.length - 1 && !this.shouldStop; i++) {
            let minIdx = i;
            for (let j = i + 1; j < this.array.length && !this.shouldStop; j++) {
                this.comparisons++;
                this.updateStat('comparisons', this.comparisons);
                this.render([minIdx, j], []);
                if (typeof audioEngine !== 'undefined') audioEngine.playTone(this.array[j]);
                await this.delay();
                if (this.array[j] < this.array[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i && !this.shouldStop) {
                [this.array[i], this.array[minIdx]] = [this.array[minIdx], this.array[i]];
                this.swaps++;
                this.updateStat('swaps', this.swaps);
                this.render([], [i, minIdx]);
                if (typeof audioEngine !== 'undefined') audioEngine.playSwap();
                await this.delay();
            }
        }
    }

    async quickSort(low, high) {
        if (low < high && !this.shouldStop) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        if (typeof audioEngine !== 'undefined') audioEngine.playPivot();
        let i = low - 1;

        for (let j = low; j < high && !this.shouldStop; j++) {
            this.comparisons++;
            this.updateStat('comparisons', this.comparisons);
            this.render([j, high], []);
            await this.delay();

            if (this.array[j] < pivot) {
                i++;
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                this.swaps++;
                this.updateStat('swaps', this.swaps);
                this.render([], [i, j]);
                if (typeof audioEngine !== 'undefined') audioEngine.playSwap();
                await this.delay();
            }
        }
        if (!this.shouldStop) {
            [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
            this.swaps++;
            this.updateStat('swaps', this.swaps);
        }
        return i + 1;
    }

    async mergeSortWrapper() {
        await this.mergeSort(0, this.array.length - 1);
    }

    async mergeSort(l, r) {
        if (l < r && !this.shouldStop) {
            const m = Math.floor((l + r) / 2);
            await this.mergeSort(l, m);
            await this.mergeSort(m + 1, r);
            await this.merge(l, m, r);
        }
    }

    async merge(l, m, r) {
        const left = this.array.slice(l, m + 1);
        const right = this.array.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;

        while (i < left.length && j < right.length && !this.shouldStop) {
            this.comparisons++;
            this.updateStat('comparisons', this.comparisons);

            if (left[i] <= right[j]) {
                this.array[k] = left[i++];
            } else {
                this.array[k] = right[j++];
            }
            this.render([k], []);
            if (typeof audioEngine !== 'undefined') audioEngine.playMerge();
            k++;
            await this.delay();
        }

        while (i < left.length && !this.shouldStop) {
            this.array[k++] = left[i++];
            this.render([k - 1], []);
            await this.delay();
        }

        while (j < right.length && !this.shouldStop) {
            this.array[k++] = right[j++];
            this.render([k - 1], []);
            await this.delay();
        }
    }

    async heapSort() {
        const n = this.array.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0 && !this.shouldStop; i--) {
            await this.heapify(n, i);
        }

        for (let i = n - 1; i > 0 && !this.shouldStop; i--) {
            [this.array[0], this.array[i]] = [this.array[i], this.array[0]];
            this.swaps++;
            this.updateStat('swaps', this.swaps);
            this.render([], [0, i]);
            if (typeof audioEngine !== 'undefined') audioEngine.playSwap();
            await this.delay();
            await this.heapify(i, 0);
        }
    }

    async heapify(n, i) {
        if (this.shouldStop) return;
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            this.comparisons++;
            if (this.array[left] > this.array[largest]) largest = left;
        }
        if (right < n) {
            this.comparisons++;
            if (this.array[right] > this.array[largest]) largest = right;
        }

        this.updateStat('comparisons', this.comparisons);

        if (largest !== i && !this.shouldStop) {
            [this.array[i], this.array[largest]] = [this.array[largest], this.array[i]];
            this.swaps++;
            this.updateStat('swaps', this.swaps);
            this.render([i, largest], []);
            if (typeof audioEngine !== 'undefined') audioEngine.playHeapify();
            await this.delay();
            await this.heapify(n, largest);
        }
    }

    setAlgorithm(algo) {
        this.currentAlgorithm = algo;
    }
}

// ==================== PATHFINDING VISUALIZER ====================
class PathfindingVisualizer {
    constructor() {
        this.grid = [];
        this.rows = 15;
        this.cols = 35;
        this.startCell = { row: 7, col: 3 };
        this.endCell = { row: 7, col: 31 };
        this.isRunning = false;
        this.shouldStop = false;
        this.isDrawing = false;
        this.currentAlgorithm = 'bfs';
        this.container = document.getElementById('pathGrid');
        this.speed = 50;
        this.init();
    }

    init() {
        this.initGrid();
        this.bindEvents();
    }

    initGrid() {
        if (!this.container) return;

        this.shouldStop = true;
        this.isRunning = false;

        this.grid = [];
        this.container.innerHTML = '';
        this.container.style.gridTemplateColumns = `repeat(${this.cols}, 22px)`;

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;

                if (i === this.startCell.row && j === this.startCell.col) {
                    cell.classList.add('start');
                    cell.textContent = 'S';
                } else if (i === this.endCell.row && j === this.endCell.col) {
                    cell.classList.add('end');
                    cell.textContent = 'E';
                }

                // Mouse events for drawing walls
                cell.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    if (!this.isRunning) {
                        this.isDrawing = true;
                        this.toggleWall(i, j);
                    }
                });
                cell.addEventListener('mouseenter', () => {
                    if (this.isDrawing && !this.isRunning) {
                        this.toggleWall(i, j);
                    }
                });
                cell.addEventListener('mouseup', () => {
                    this.isDrawing = false;
                });

                this.container.appendChild(cell);
                this.grid[i][j] = { isWall: false, isVisited: false, isPath: false };
            }
        }

        // Global mouseup to stop drawing
        document.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });

        this.resetStats();
        this.shouldStop = false;
    }

    bindEvents() {
        const generateBtn = document.getElementById('generateMaze');
        const startBtn = document.getElementById('startPath');
        const clearBtn = document.getElementById('clearPath');
        const speedSlider = document.getElementById('pathSpeed');

        if (generateBtn) generateBtn.addEventListener('click', () => this.generateMaze());
        if (startBtn) startBtn.addEventListener('click', () => this.start());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearAll());
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
            });
        }
    }

    toggleWall(row, col) {
        if ((row === this.startCell.row && col === this.startCell.col) ||
            (row === this.endCell.row && col === this.endCell.col)) return;

        this.grid[row][col].isWall = !this.grid[row][col].isWall;
        const cell = this.container.children[row * this.cols + col];
        if (cell) {
            cell.classList.toggle('wall');
            if (typeof audioEngine !== 'undefined') audioEngine.playPop();
        }
    }

    generateMaze() {
        this.clearAll();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if ((i === this.startCell.row && j === this.startCell.col) ||
                    (i === this.endCell.row && j === this.endCell.col)) continue;

                if (Math.random() < 0.3) {
                    this.grid[i][j].isWall = true;
                    const cell = this.container.children[i * this.cols + j];
                    if (cell) cell.classList.add('wall');
                }
            }
        }
        if (typeof audioEngine !== 'undefined') audioEngine.playBattleStart();
    }

    clearPath() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].isVisited = false;
                this.grid[i][j].isPath = false;
                const cell = this.container.children[i * this.cols + j];
                if (cell) cell.classList.remove('visited', 'path', 'current');
            }
        }
        this.resetStats();
    }

    clearAll() {
        this.stop();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].isWall = false;
                this.grid[i][j].isVisited = false;
                this.grid[i][j].isPath = false;
                const cell = this.container.children[i * this.cols + j];
                if (cell) cell.classList.remove('visited', 'path', 'wall', 'current');
            }
        }
        this.resetStats();
    }

    resetStats() {
        this.updateStat('nodesVisited', '0');
        this.updateStat('pathLength', '0');
        this.updateStat('pathTime', '0ms');
    }

    updateStat(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    getDelay() {
        return Math.max(5, 105 - this.speed);
    }

    async start() {
        if (this.isRunning) return;

        this.clearPath();
        this.isRunning = true;
        this.shouldStop = false;

        if (typeof audioEngine !== 'undefined') audioEngine.playBattleStart();

        const startTime = performance.now();
        const path = await this.bfs();
        const endTime = performance.now();

        if (!this.shouldStop) {
            const elapsed = endTime - startTime;
            rawTimeValues.pathTime = elapsed;
            const formatSelect = document.getElementById('pathTimeFormat');
            const format = formatSelect ? formatSelect.value : 'ms';
            this.updateStat('pathTime', formatTimeValue(elapsed, format));

            if (path && path.length > 0) {
                await this.animatePath(path);
                if (typeof audioEngine !== 'undefined') audioEngine.playPathFound();
            } else {
                if (typeof audioEngine !== 'undefined') audioEngine.playError();
            }
        }

        this.isRunning = false;
    }

    async bfs() {
        const queue = [{ row: this.startCell.row, col: this.startCell.col, path: [{ row: this.startCell.row, col: this.startCell.col }] }];
        const visited = new Set();
        visited.add(`${this.startCell.row},${this.startCell.col}`);
        let nodesVisited = 0;

        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        while (queue.length > 0 && !this.shouldStop) {
            const { row, col, path } = queue.shift();
            nodesVisited++;
            this.updateStat('nodesVisited', nodesVisited);

            // Check if we reached the end
            if (row === this.endCell.row && col === this.endCell.col) {
                this.updateStat('pathLength', path.length);
                return path;
            }

            // Mark cell as visited (visual)
            const cell = this.container.children[row * this.cols + col];
            if (cell && !cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.classList.add('visited');
                if (typeof audioEngine !== 'undefined' && nodesVisited % 3 === 0) {
                    audioEngine.playVisit();
                }
            }

            await new Promise(r => setTimeout(r, this.getDelay()));

            // Explore neighbors
            for (const [dr, dc] of directions) {
                if (this.shouldStop) break;

                const newRow = row + dr;
                const newCol = col + dc;
                const key = `${newRow},${newCol}`;

                if (newRow >= 0 && newRow < this.rows &&
                    newCol >= 0 && newCol < this.cols &&
                    !visited.has(key) &&
                    !this.grid[newRow][newCol].isWall) {

                    visited.add(key);
                    queue.push({
                        row: newRow,
                        col: newCol,
                        path: [...path, { row: newRow, col: newCol }]
                    });
                }
            }
        }

        return null; // No path found
    }

    async animatePath(path) {
        for (let i = 0; i < path.length && !this.shouldStop; i++) {
            const { row, col } = path[i];
            const cell = this.container.children[row * this.cols + col];
            if (cell && !cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.classList.remove('visited');
                cell.classList.add('path');
                if (typeof audioEngine !== 'undefined') audioEngine.playStep(i, path.length);
            }
            await new Promise(r => setTimeout(r, 30));
        }
    }

    setAlgorithm(algo) {
        this.currentAlgorithm = algo;
    }
}

// ==================== LANGUAGE ARENA ====================
class LanguageArena {
    constructor() {
        this.isRacing = false;
        this.shouldStop = false;
        this.selectedLanguages = [];
        this.iterations = 10000;
        this.algorithm = 'fibonacci';
        this.results = [];
        this.animationFrames = [];
        this.init();
    }

    init() {
        this.updateSelectedLanguages();
        this.bindEvents();
        this.renderTracks();
        this.setupTimeFormatListeners();
    }

    setupTimeFormatListeners() {
        // Set up listeners for time format dropdowns
        // This will be called after tracks are rendered
        setTimeout(() => {
            this.selectedLanguages.forEach(lang => {
                const formatSelect = document.getElementById(`arenaTimeFormat-${lang}`);
                if (formatSelect) {
                    formatSelect.addEventListener('change', (e) => {
                        const timeValueEl = document.querySelector(`#time-${lang} .time-value`);
                        if (timeValueEl && this.rawTimes[lang] > 0) {
                            timeValueEl.textContent = formatTimeValue(this.rawTimes[lang], e.target.value);
                        }
                    });
                }
            });
        }, 100);
    }

    updateSelectedLanguages() {
        const langCheckboxes = document.querySelectorAll('#languageSelection input[type="checkbox"]');
        this.selectedLanguages = Array.from(langCheckboxes)
            .filter(c => c.checked)
            .map(c => c.value);
    }

    bindEvents() {
        const startBtn = document.getElementById('startRace');
        const resetBtn = document.getElementById('resetRace');
        const iterSelect = document.getElementById('arenaIterations');
        const algoSelect = document.getElementById('arenaAlgorithm');
        const langCheckboxes = document.querySelectorAll('#languageSelection input');

        if (startBtn) startBtn.addEventListener('click', () => this.startRace());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());

        if (iterSelect) {
            iterSelect.addEventListener('change', (e) => {
                this.iterations = parseInt(e.target.value);
            });
        }

        if (algoSelect) {
            algoSelect.addEventListener('change', (e) => {
                this.algorithm = e.target.value;
            });
        }

        langCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                this.updateSelectedLanguages();
                this.renderTracks();
                this.setupTimeFormatListeners();
            });
        });
    }

    stop() {
        this.shouldStop = true;
        this.isRacing = false;
        this.animationFrames.forEach(id => cancelAnimationFrame(id));
        this.animationFrames = [];
    }

    renderTracks() {
        const container = document.getElementById('raceTracks');
        if (!container) return;

        container.innerHTML = '';

        this.selectedLanguages.forEach(lang => {
            const info = LANGUAGE_INFO[lang];
            if (!info) return;

            const track = document.createElement('div');
            track.className = 'race-track';
            track.id = `track-${lang}`;
            track.innerHTML = `
                <div class="track-lang">
                    <span class="lang-logo ${info.logoClass || 'python-logo'}" style="background: ${info.color};"></span>
                    <span class="lang-name">${info.name}</span>
                </div>
                <div class="track-bar">
                    <div class="track-runner" id="runner-${lang}" style="background: ${info.color}; border-color: ${info.color}">
                        <span class="lang-logo ${info.logoClass || 'python-logo'} runner-logo"></span>
                    </div>
                </div>
                <div class="track-time" id="time-${lang}">
                    <span class="time-value">-</span>
                    <select class="time-format-select" id="arenaTimeFormat-${lang}">
                        <option value="ms" selected>ms</option>
                        <option value="s">sec</option>
                        <option value="m">min</option>
                    </select>
                </div>
                <div class="track-position" id="position-${lang}">-</div>
            `;
            container.appendChild(track);
        });
        
        // Set up time format listeners after tracks are rendered
        this.setupTimeFormatListeners();
    }

    async startRace() {
        if (this.isRacing) return;
        if (this.selectedLanguages.length < 2) {
            alert('Select at least 2 languages to race!');
            return;
        }

        this.isRacing = true;
        this.shouldStop = false;
        this.results = [];

        const resultsEl = document.getElementById('arenaResults');
        if (resultsEl) resultsEl.style.display = 'none';

        // Reset all tracks
        this.selectedLanguages.forEach(lang => {
            const runnerEl = document.getElementById(`runner-${lang}`);
            const timeEl = document.getElementById(`time-${lang}`);
            const timeValueEl = timeEl ? timeEl.querySelector('.time-value') : null;
            const posEl = document.getElementById(`position-${lang}`);
            const trackEl = document.getElementById(`track-${lang}`);

            if (runnerEl) {
                runnerEl.style.left = '0%';
                runnerEl.style.transform = 'translateX(0)';
            }
            if (timeValueEl) timeValueEl.textContent = '-';
            if (posEl) posEl.textContent = '-';
            if (trackEl) trackEl.classList.remove('winner', 'finished');
            this.rawTimes[lang] = 0;
        });

        if (typeof audioEngine !== 'undefined') audioEngine.playBattleStart();

        // Calculate simulated times
        const baseTime = this.getBaseTime();
        const times = {};

        this.selectedLanguages.forEach(lang => {
            const variance = 0.9 + Math.random() * 0.2;
            times[lang] = baseTime * (LANGUAGE_SPEED[lang] || 10) * variance;
        });

        const minTime = Math.min(...Object.values(times));
        const animationDuration = 3000;

        // Start all runners
        const promises = this.selectedLanguages.map(lang => {
            return this.runRacer(lang, times[lang], minTime, animationDuration);
        });

        await Promise.all(promises);

        if (!this.shouldStop) {
            // Sort results
            this.results.sort((a, b) => a.time - b.time);

            // Show positions
            this.results.forEach((result, idx) => {
                const posEl = document.getElementById(`position-${result.lang}`);
                if (posEl) {
                    posEl.textContent = `#${idx + 1}`;
                    if (idx === 0) {
                        const trackEl = document.getElementById(`track-${result.lang}`);
                        if (trackEl) trackEl.classList.add('winner');
                        if (typeof audioEngine !== 'undefined') audioEngine.playComplete();
                    }
                }
            });

            // Show results
            this.showResults();
        }

        this.isRacing = false;
    }

    getBaseTime() {
        switch (this.algorithm) {
            case 'fibonacci': return this.iterations * 0.001;
            case 'primes': return this.iterations * 0.01;
            case 'sorting': return this.iterations * Math.log2(this.iterations) * 0.0001;
            case 'factorial': return this.iterations * 0.0001;
            case 'matrix': return this.iterations * 0.05;
            case 'loop': return this.iterations * 0.00001;
            case 'nestedLoop': return this.iterations * this.iterations * 0.000001;
            default: return this.iterations * 0.001;
        }
    }

    async runRacer(lang, time, minTime, duration) {
        const runnerEl = document.getElementById(`runner-${lang}`);
        const timeEl = document.getElementById(`time-${lang}`);
        const trackEl = document.getElementById(`track-${lang}`);
        const trackBarEl = trackEl ? trackEl.querySelector('.track-bar') : null;

        if (!runnerEl || !trackBarEl) return;

        const racerDuration = (time / minTime) * (duration * 0.8);
        const info = LANGUAGE_INFO[lang];
        const trackWidth = trackBarEl.offsetWidth;
        const ballSize = 40; // Size of the ball
        const maxPosition = trackWidth - ballSize;

        return new Promise(resolve => {
            const startTime = performance.now();
            let lastTickTime = 0;

            const animate = () => {
                if (this.shouldStop) {
                    resolve();
                    return;
                }

                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / racerDuration, 1);

                // Calculate position: move back and forth across the track
                // Create smooth back-and-forth motion with forward progress
                // Use sine wave for oscillation - more cycles for smoother motion
                const cycles = 4; // Number of back-and-forth cycles
                const oscillation = Math.sin(progress * Math.PI * cycles * 2);
                
                // Map oscillation from [-1, 1] to [0, 1] for position calculation
                const normalizedOscillation = (oscillation + 1) / 2; // 0 to 1
                
                // Create back-and-forth motion: oscillate across full width
                // Forward progress determines overall completion, oscillation creates back-and-forth
                const forwardProgress = progress;
                const oscillatingProgress = normalizedOscillation;
                
                // Combine: oscillate across full width while making forward progress
                // The oscillation creates the back-and-forth, forward progress ensures completion
                const finalProgress = forwardProgress * 0.65 + oscillatingProgress * 0.35;
                
                // Calculate actual position - ensure it stays within bounds
                const position = Math.max(0, Math.min(maxPosition, finalProgress * maxPosition));
                runnerEl.style.left = `${position}px`;
                runnerEl.style.transform = `translateX(0)`;

                // Play tick sound periodically
                if (elapsed - lastTickTime > 200 && typeof audioEngine !== 'undefined') {
                    audioEngine.playRaceTick(progress * 10);
                    lastTickTime = elapsed;
                }

                if (progress < 1) {
                    const frameId = requestAnimationFrame(animate);
                    this.animationFrames.push(frameId);
                } else {
                    // Ensure ball reaches the end
                    runnerEl.style.left = `${maxPosition}px`;
                    if (trackEl) trackEl.classList.add('finished');
                    
                    // Store raw time value
                    this.rawTimes[lang] = time;
                    
                    // Get format from dropdown
                    const formatSelect = document.getElementById(`arenaTimeFormat-${lang}`);
                    const format = formatSelect ? formatSelect.value : 'ms';
                    const displayTime = formatTimeValue(time, format);
                    
                    const timeValueEl = timeEl ? timeEl.querySelector('.time-value') : null;
                    if (timeValueEl) timeValueEl.textContent = displayTime;
                    
                    this.results.push({ lang, time, displayTime });
                    if (typeof audioEngine !== 'undefined') audioEngine.playSuccess();
                    resolve();
                }
            };

            const frameId = requestAnimationFrame(animate);
            this.animationFrames.push(frameId);
        });
    }

    // Format time to appropriate unit
    formatTime(ms) {
        if (ms < 1000) {
            return `${ms.toFixed(2)}ms`;
        } else if (ms < 60000) {
            return `${(ms / 1000).toFixed(2)}s`;
        } else {
            const minutes = Math.floor(ms / 60000);
            const seconds = ((ms % 60000) / 1000).toFixed(1);
            return `${minutes}m ${seconds}s`;
        }
    }

    showResults() {
        const resultsEl = document.getElementById('arenaResults');
        if (!resultsEl || this.results.length < 3) return;

        resultsEl.style.display = 'block';

        const first = this.results[0];
        const second = this.results[1];
        const third = this.results[2];

        const updatePodium = (place, result) => {
            const nameEl = document.querySelector(`#${place} .lang-name`);
            const timeEl = document.querySelector(`#${place} .time`);
            if (nameEl) nameEl.textContent = LANGUAGE_INFO[result.lang]?.name || result.lang;
            if (timeEl) timeEl.textContent = result.displayTime;
        };

        updatePodium('firstPlace', first);
        updatePodium('secondPlace', second);
        updatePodium('thirdPlace', third);

        const compEl = document.getElementById('speedComparison');
        if (compEl) {
            compEl.innerHTML = '<h4>Speed Comparison</h4>';

            const fastest = this.results[0].time;
            this.results.forEach(result => {
                const info = LANGUAGE_INFO[result.lang];
                if (!info) return;
                const ratio = (result.time / fastest).toFixed(2);
                const bar = document.createElement('div');
                bar.className = 'speed-bar';
                bar.innerHTML = `
                    <span class="speed-lang"><span style="color:${info.color}">${info.symbol}</span> ${info.name}</span>
                    <div class="speed-bar-fill" style="width: ${(fastest / result.time) * 100}%; background: ${info.color}"></div>
                    <span class="speed-ratio">${ratio}x</span>
                `;
                compEl.appendChild(bar);
            });
        }
    }

    reset() {
        this.stop();
        this.results = [];
        this.rawTimes = {};
        const resultsEl = document.getElementById('arenaResults');
        if (resultsEl) resultsEl.style.display = 'none';
        this.renderTracks();
    }
}

// ==================== SEARCHING VISUALIZER ====================
class SearchingVisualizer {
    constructor() {
        this.array = [];
        this.target = 42;
        this.isRunning = false;
        this.shouldStop = false;
        this.currentAlgorithm = 'binarySearch';
        this.container = document.getElementById('searchBars');
        this.init();
    }

    init() {
        this.generateArray();
        this.bindEvents();
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    bindEvents() {
        const sizeSlider = document.getElementById('searchArraySize');
        const targetInput = document.getElementById('searchTarget');
        const generateBtn = document.getElementById('generateSearchArray');
        const startBtn = document.getElementById('startSearch');

        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                const valEl = document.getElementById('searchArraySizeValue');
                if (valEl) valEl.textContent = e.target.value;
            });
        }

        if (targetInput) {
            targetInput.addEventListener('change', (e) => {
                this.target = parseInt(e.target.value);
            });
        }

        if (generateBtn) generateBtn.addEventListener('click', () => this.generateArray());
        if (startBtn) startBtn.addEventListener('click', () => this.start());
    }

    generateArray() {
        this.stop();
        const sizeEl = document.getElementById('searchArraySize');
        const size = parseInt(sizeEl?.value || 20);
        this.array = Array.from({ length: size }, (_, i) => (i + 1) * 5);
        this.render();
        this.resetStats();
    }

    resetStats() {
        const stepsEl = document.getElementById('searchSteps');
        const foundEl = document.getElementById('foundAt');
        if (stepsEl) stepsEl.textContent = '0';
        if (foundEl) foundEl.textContent = '-';
    }

    render(current = -1, found = -1, checked = []) {
        if (!this.container) return;
        this.container.innerHTML = '';

        this.array.forEach((val, idx) => {
            const item = document.createElement('div');
            item.className = 'search-item';
            item.textContent = val;

            if (idx === found) item.classList.add('found');
            else if (idx === current) item.classList.add('current');
            else if (checked.includes(idx)) item.classList.add('checked');

            this.container.appendChild(item);
        });
    }

    async start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.shouldStop = false;
        this.resetStats();

        const startTime = performance.now();

        if (this.currentAlgorithm === 'binarySearch') {
            await this.binarySearch();
        } else {
            await this.linearSearch();
        }

        if (!this.shouldStop) {
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            rawTimeValues.searchTime = elapsed;
            const formatSelect = document.getElementById('searchTimeFormat');
            const format = formatSelect ? formatSelect.value : 'ms';
            const timeEl = document.getElementById('searchTime');
            if (timeEl) timeEl.textContent = formatTimeValue(elapsed, format);
        }

        this.isRunning = false;
    }

    async binarySearch() {
        let left = 0, right = this.array.length - 1;
        let steps = 0;
        const checked = [];

        while (left <= right && !this.shouldStop) {
            const mid = Math.floor((left + right) / 2);
            steps++;
            checked.push(mid);

            const stepsEl = document.getElementById('searchSteps');
            if (stepsEl) stepsEl.textContent = steps;

            this.render(mid, -1, checked);
            if (typeof audioEngine !== 'undefined') audioEngine.playTone(this.array[mid]);
            await new Promise(r => setTimeout(r, 500));

            if (this.array[mid] === this.target) {
                this.render(-1, mid, checked);
                const foundEl = document.getElementById('foundAt');
                if (foundEl) foundEl.textContent = `Index ${mid}`;
                if (typeof audioEngine !== 'undefined') audioEngine.playSuccess();
                return mid;
            }

            if (this.array[mid] < this.target) left = mid + 1;
            else right = mid - 1;
        }

        if (!this.shouldStop) {
            const foundEl = document.getElementById('foundAt');
            if (foundEl) foundEl.textContent = 'Not Found';
            if (typeof audioEngine !== 'undefined') audioEngine.playError();
        }
        return -1;
    }

    async linearSearch() {
        const checked = [];
        for (let i = 0; i < this.array.length && !this.shouldStop; i++) {
            checked.push(i);
            const stepsEl = document.getElementById('searchSteps');
            if (stepsEl) stepsEl.textContent = i + 1;
            this.render(i, -1, checked);
            if (typeof audioEngine !== 'undefined') audioEngine.playTone(this.array[i]);
            await new Promise(r => setTimeout(r, 200));

            if (this.array[i] === this.target) {
                this.render(-1, i, checked);
                const foundEl = document.getElementById('foundAt');
                if (foundEl) foundEl.textContent = `Index ${i}`;
                if (typeof audioEngine !== 'undefined') audioEngine.playSuccess();
                return i;
            }
        }

        if (!this.shouldStop) {
            const foundEl = document.getElementById('foundAt');
            if (foundEl) foundEl.textContent = 'Not Found';
            if (typeof audioEngine !== 'undefined') audioEngine.playError();
        }
        return -1;
    }

    setAlgorithm(algo) {
        this.currentAlgorithm = algo;
    }
}

// ==================== TREE VISUALIZER ====================
class TreeVisualizer {
    constructor() {
        this.root = null;
        this.isRunning = false;
        this.shouldStop = false;
        this.speed = 50;
        this.svg = document.getElementById('treeSvg');
        this.init();
    }

    init() {
        this.bindEvents();
        this.insertInitialNodes();
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    bindEvents() {
        const insertBtn = document.getElementById('insertNode');
        const speedSlider = document.getElementById('treeSpeed');
        
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
            });
        }
        const clearBtn = document.getElementById('clearTree');
        const traverseBtn = document.getElementById('traverseTree');

        if (insertBtn) insertBtn.addEventListener('click', () => this.insert());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
        if (traverseBtn) traverseBtn.addEventListener('click', () => this.traverse());
    }

    insertInitialNodes() {
        [50, 30, 70, 20, 40, 60, 80].forEach(v => this.insertValue(v));
        this.render();
    }

    insert() {
        const input = document.getElementById('treeValue');
        if (!input) return;
        const value = parseInt(input.value);
        if (!isNaN(value)) {
            this.insertValue(value);
            this.render();
            input.value = '';
            if (typeof audioEngine !== 'undefined') audioEngine.playInsert();
        }
    }

    insertValue(value) {
        const newNode = { value, left: null, right: null };
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) { current.left = newNode; return; }
                current = current.left;
            } else {
                if (!current.right) { current.right = newNode; return; }
                current = current.right;
            }
        }
    }

    clear() {
        this.stop();
        this.root = null;
        this.render();
        const orderEl = document.getElementById('traversalOrder');
        if (orderEl) orderEl.textContent = '-';
    }

    async traverse() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.shouldStop = false;

        const orderEl = document.getElementById('traversalOrder');
        if (!orderEl) return;

        const result = [];
        await this.inorder(this.root, result);

        if (!this.shouldStop) {
            orderEl.textContent = result.join(' → ');
            if (typeof audioEngine !== 'undefined') audioEngine.playComplete();
        }

        this.isRunning = false;
    }

    async inorder(node, result) {
        if (!node || this.shouldStop) return;
        await this.inorder(node.left, result);
        if (this.shouldStop) return;
        result.push(node.value);
        if (typeof audioEngine !== 'undefined') audioEngine.playTone(node.value);
        const delay = Math.max(50, 350 - (this.speed * 3));
        await new Promise(r => setTimeout(r, delay));
        await this.inorder(node.right, result);
    }
    
    getDelay() {
        return Math.max(50, 350 - (this.speed * 3));
    }

    render() {
        if (!this.svg) return;
        this.svg.innerHTML = '';
        
        // Set SVG dimensions
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '350');
        this.svg.setAttribute('viewBox', '0 0 800 350');
        
        if (!this.root) return;

        const nodeCount = this.countNodes(this.root);
        const height = this.getHeight(this.root);

        const nodesEl = document.getElementById('treeNodes');
        const heightEl = document.getElementById('treeHeight');
        if (nodesEl) nodesEl.textContent = nodeCount;
        if (heightEl) heightEl.textContent = height;

        this.drawNode(this.root, 400, 40, 160, 0);
    }

    drawNode(node, x, y, offset, depth) {
        if (!node) return;

        if (node.left) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', y);
            line.setAttribute('x2', x - offset);
            line.setAttribute('y2', y + 70);
            line.setAttribute('stroke', 'var(--ice-blue, #93c5fd)');
            line.setAttribute('stroke-width', '2');
            this.svg.appendChild(line);
            this.drawNode(node.left, x - offset, y + 70, offset / 2, depth + 1);
        }

        if (node.right) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', y);
            line.setAttribute('x2', x + offset);
            line.setAttribute('y2', y + 70);
            line.setAttribute('stroke', 'var(--ice-blue, #93c5fd)');
            line.setAttribute('stroke-width', '2');
            this.svg.appendChild(line);
            this.drawNode(node.right, x + offset, y + 70, offset / 2, depth + 1);
        }

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 22);
        circle.setAttribute('fill', 'var(--bg-tertiary, #151a22)');
        circle.setAttribute('stroke', 'var(--gold, #d4a574)');
        circle.setAttribute('stroke-width', '2');
        this.svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'var(--text-primary, #e2e8f0)');
        text.setAttribute('font-family', 'Fira Code, monospace');
        text.setAttribute('font-size', '12');
        text.textContent = node.value;
        this.svg.appendChild(text);
    }

    countNodes(node) {
        if (!node) return 0;
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }

    getHeight(node) {
        if (!node) return 0;
        return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
}

// ==================== GRAPH VISUALIZER ====================
class GraphVisualizer {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.isRunning = false;
        this.shouldStop = false;
        this.speed = 50;
        this.startTime = null;
        this.svg = document.getElementById('graphSvg');
        this.init();
    }

    init() {
        this.bindEvents();
        this.generateGraph();
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    bindEvents() {
        const generateBtn = document.getElementById('generateGraph');
        const startBtn = document.getElementById('startGraphAlgo');
        const clearBtn = document.getElementById('clearGraph');
        const speedSlider = document.getElementById('graphSpeed');

        if (generateBtn) generateBtn.addEventListener('click', () => this.generateGraph());
        if (startBtn) startBtn.addEventListener('click', () => this.runAlgorithm());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
            });
        }
    }

    generateGraph() {
        this.stop();
        const nodeCountEl = document.getElementById('graphNodes');
        const n = parseInt(nodeCountEl?.value || 8);
        this.nodes = [];
        this.edges = [];

        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2; // Start from top
            this.nodes.push({
                id: i,
                x: 300 + 130 * Math.cos(angle),
                y: 175 + 130 * Math.sin(angle)
            });
        }

        for (let i = 0; i < n; i++) {
            const connections = Math.floor(Math.random() * 2) + 1;
            for (let c = 0; c < connections; c++) {
                const j = Math.floor(Math.random() * n);
                if (i !== j && !this.edges.find(e => (e.from === i && e.to === j) || (e.from === j && e.to === i))) {
                    this.edges.push({ from: i, to: j });
                }
            }
        }

        this.render();

        const verticesEl = document.getElementById('graphVertices');
        const edgesEl = document.getElementById('graphEdges');
        if (verticesEl) verticesEl.textContent = this.nodes.length;
        if (edgesEl) edgesEl.textContent = this.edges.length;
    }

    clear() {
        this.stop();
        this.nodes = [];
        this.edges = [];
        if (this.svg) this.svg.innerHTML = '';
    }

    async runAlgorithm() {
        if (this.isRunning || this.nodes.length === 0) return;
        this.isRunning = true;
        this.shouldStop = false;
        this.startTime = performance.now();

        this.render();

        const visited = new Set();
        const queue = [0];
        visited.add(0);
        const result = [];
        const delay = Math.max(10, 510 - (this.speed * 5));

        while (queue.length > 0 && !this.shouldStop) {
            const current = queue.shift();
            result.push(current);

            this.highlightNode(current);
            if (typeof audioEngine !== 'undefined') audioEngine.playVisit();
            await new Promise(r => setTimeout(r, delay));

            for (const edge of this.edges) {
                if (this.shouldStop) break;
                let neighbor = null;
                if (edge.from === current && !visited.has(edge.to)) neighbor = edge.to;
                if (edge.to === current && !visited.has(edge.from)) neighbor = edge.from;

                if (neighbor !== null) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        if (!this.shouldStop) {
            const endTime = performance.now();
            const elapsed = endTime - this.startTime;
            const steps = result.length;
            const speed = steps > 0 ? (steps / (elapsed / 1000)).toFixed(1) : '0';

            rawTimeValues.graphTime = elapsed;
            const formatSelect = document.getElementById('graphTimeFormat');
            const format = formatSelect ? formatSelect.value : 'ms';
            
            const resultEl = document.getElementById('graphResult');
            const timeEl = document.getElementById('graphTime');
            const speedEl = document.getElementById('graphSpeedStat');

            if (resultEl) resultEl.textContent = result.join(' → ');
            if (timeEl) timeEl.textContent = formatTimeValue(elapsed, format);
            if (speedEl) speedEl.textContent = `${speed} ops/s`;

            if (typeof audioEngine !== 'undefined') audioEngine.playComplete();
        }

        this.isRunning = false;
    }

    highlightNode(id) {
        if (!this.svg) return;
        const circles = this.svg.querySelectorAll('circle');
        circles.forEach((c, i) => {
            if (i === id) {
                c.setAttribute('fill', '#d4a574');
            }
        });
    }

    render() {
        if (!this.svg) return;
        this.svg.innerHTML = '';
        
        // Set SVG dimensions
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '350');
        this.svg.setAttribute('viewBox', '0 0 600 350');

        this.edges.forEach(edge => {
            const from = this.nodes[edge.from];
            const to = this.nodes[edge.to];
            if (!from || !to) return;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y);
            line.setAttribute('stroke', 'var(--ice-blue, #93c5fd)');
            line.setAttribute('stroke-width', '2');
            this.svg.appendChild(line);
        });

        this.nodes.forEach(node => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.x);
            circle.setAttribute('cy', node.y);
            circle.setAttribute('r', 22);
            circle.setAttribute('fill', 'var(--bg-tertiary, #151a22)');
            circle.setAttribute('stroke', 'var(--gold, #d4a574)');
            circle.setAttribute('stroke-width', '2');
            this.svg.appendChild(circle);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'var(--text-primary, #e2e8f0)');
            text.setAttribute('font-family', 'Fira Code, monospace');
            text.setAttribute('font-size', '12');
            text.textContent = node.id;
            this.svg.appendChild(text);
        });
    }
}

// ==================== DP VISUALIZER ====================
class DPVisualizer {
    constructor() {
        this.container = document.getElementById('dpTable');
        this.isRunning = false;
        this.shouldStop = false;
        this.speed = 50;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showFibonacci(10);
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    bindEvents() {
        const startBtn = document.getElementById('startDP');
        const speedSlider = document.getElementById('dpSpeed');
        
        if (startBtn) startBtn.addEventListener('click', () => this.start());
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
            });
        }
    }

    async start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.shouldStop = false;

        const startTime = performance.now();

        const inputEl = document.getElementById('dpInput');
        if (!inputEl) return;
        const value = inputEl.value;
        const n = parseInt(value.split(':')[1]) || 10;
        await this.showFibonacci(n);

        if (!this.shouldStop) {
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            rawTimeValues.dpTime = elapsed;
            const formatSelect = document.getElementById('dpTimeFormat');
            const format = formatSelect ? formatSelect.value : 'ms';
            const timeEl = document.getElementById('dpTime');
            if (timeEl) timeEl.textContent = formatTimeValue(elapsed, format);
        }

        this.isRunning = false;
    }

    async showFibonacci(n) {
        if (!this.container) return;
        this.container.innerHTML = '';
        const dp = [0, 1];

        for (let i = 0; i <= n; i++) {
            const cell = document.createElement('div');
            cell.className = 'dp-cell';
            cell.textContent = '-';
            cell.id = `dp-${i}`;
            this.container.appendChild(cell);
        }

        const delay = Math.max(50, 250 - (this.speed * 2));
        
        for (let i = 0; i <= n && !this.shouldStop; i++) {
            if (i <= 1) {
                dp[i] = i;
            } else {
                dp[i] = dp[i - 1] + dp[i - 2];
            }

            const cell = document.getElementById(`dp-${i}`);
            if (cell) {
                cell.textContent = dp[i];
                cell.classList.add('active');
                if (typeof audioEngine !== 'undefined') audioEngine.playTone(i * 10);
                await new Promise(r => setTimeout(r, delay));
                cell.classList.remove('active');
                cell.classList.add('computed');
            }
        }

        if (!this.shouldStop) {
            const subEl = document.getElementById('dpSubproblems');
            const resEl = document.getElementById('dpResult');
            if (subEl) subEl.textContent = n + 1;
            if (resEl) resEl.textContent = dp[n];
            if (typeof audioEngine !== 'undefined') audioEngine.playComplete();
        }
    }
}

// ==================== STRING VISUALIZER ====================
class StringVisualizer {
    constructor() {
        this.container = document.getElementById('stringVisualization');
        this.isRunning = false;
        this.shouldStop = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    bindEvents() {
        const startBtn = document.getElementById('startString');
        if (startBtn) startBtn.addEventListener('click', () => this.search());
    }

    render() {
        if (!this.container) return;
        const textEl = document.getElementById('stringText');
        const text = textEl?.value || 'ABABDABACDABABCABAB';
        this.container.innerHTML = '';

        for (const char of text) {
            const span = document.createElement('div');
            span.className = 'string-char';
            span.textContent = char;
            this.container.appendChild(span);
        }
    }

    async search() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.shouldStop = false;

        const startTime = performance.now();

        const textEl = document.getElementById('stringText');
        const patternEl = document.getElementById('stringPattern');
        const text = textEl?.value || 'ABABDABACDABABCABAB';
        const pattern = patternEl?.value || 'ABABCABAB';

        this.render();
        let comparisons = 0;
        let matches = 0;

        for (let i = 0; i <= text.length - pattern.length && !this.shouldStop; i++) {
            let j = 0;
            while (j < pattern.length && text[i + j] === pattern[j] && !this.shouldStop) {
                comparisons++;
                const compEl = document.getElementById('stringComparisons');
                if (compEl) compEl.textContent = comparisons;

                const char = this.container.children[i + j];
                if (char) {
                    char.classList.add('active');
                    if (typeof audioEngine !== 'undefined') audioEngine.playTone(j * 10);
                }
                await new Promise(r => setTimeout(r, 100));
                j++;
            }

            if (j === pattern.length && !this.shouldStop) {
                matches++;
                const matchEl = document.getElementById('stringMatches');
                if (matchEl) matchEl.textContent = matches;

                for (let k = 0; k < pattern.length; k++) {
                    const char = this.container.children[i + k];
                    if (char) char.classList.add('matched');
                }
                if (typeof audioEngine !== 'undefined') audioEngine.playSuccess();
            } else {
                for (let k = 0; k < j; k++) {
                    const char = this.container.children[i + k];
                    if (char) char.classList.remove('active');
                }
            }
        }

        if (!this.shouldStop) {
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            rawTimeValues.stringTime = elapsed;
            const formatSelect = document.getElementById('stringTimeFormat');
            const format = formatSelect ? formatSelect.value : 'ms';
            const timeEl = document.getElementById('stringTime');
            if (timeEl) timeEl.textContent = formatTimeValue(elapsed, format);
        }

        this.isRunning = false;
    }
}

// ==================== MATH VISUALIZER ====================
class MathVisualizer {
    constructor() {
        this.container = document.getElementById('mathVisualization');
        this.isRunning = false;
        this.shouldStop = false;
        this.speed = 50;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    stop() {
        this.shouldStop = true;
        this.isRunning = false;
    }

    bindEvents() {
        const startBtn = document.getElementById('startMath');
        const speedSlider = document.getElementById('mathSpeed');
        
        if (startBtn) startBtn.addEventListener('click', () => this.calculate());
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value);
            });
        }
    }

    async calculate() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.shouldStop = false;

        const startTime = performance.now();

        const input1El = document.getElementById('mathInput1');
        const input2El = document.getElementById('mathInput2');
        const a = parseInt(input1El?.value || 48);
        const b = parseInt(input2El?.value || 18);

        await this.gcd(a, b);

        if (!this.shouldStop) {
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            rawTimeValues.mathTime = elapsed;
            const formatSelect = document.getElementById('mathTimeFormat');
            const format = formatSelect ? formatSelect.value : 'ms';
            const timeEl = document.getElementById('mathTime');
            if (timeEl) timeEl.textContent = formatTimeValue(elapsed, format);
        }

        this.isRunning = false;
    }

    async gcd(a, b) {
        if (!this.container) return;
        this.container.innerHTML = '';
        let steps = 0;
        const delay = Math.max(50, 550 - (this.speed * 5));

        while (b !== 0 && !this.shouldStop) {
            steps++;
            const stepsEl = document.getElementById('mathSteps');
            if (stepsEl) stepsEl.textContent = steps;

            const step = document.createElement('div');
            step.className = 'dp-cell';
            step.textContent = `${a} % ${b} = ${a % b}`;
            step.style.width = 'auto';
            step.style.padding = '10px';
            this.container.appendChild(step);

            if (typeof audioEngine !== 'undefined') audioEngine.playTone(a % 100);
            await new Promise(r => setTimeout(r, delay));

            const temp = b;
            b = a % b;
            a = temp;
        }

        if (!this.shouldStop) {
            const resultEl = document.getElementById('mathResult');
            if (resultEl) resultEl.textContent = a;
            if (typeof audioEngine !== 'undefined') audioEngine.playSuccess();
        }
    }
}

// ==================== GLOBAL INSTANCES ====================
let sortingVisualizer;
let searchingVisualizer;
let languageArena;
let pathfindingVisualizer;
let treeVisualizer;
let graphVisualizer;
let dpVisualizer;
let stringVisualizer;
let mathVisualizer;

document.addEventListener('DOMContentLoaded', () => {
    sortingVisualizer = new SortingVisualizer();
    searchingVisualizer = new SearchingVisualizer();
    languageArena = new LanguageArena();
    pathfindingVisualizer = new PathfindingVisualizer();
    treeVisualizer = new TreeVisualizer();
    graphVisualizer = new GraphVisualizer();
    dpVisualizer = new DPVisualizer();
    stringVisualizer = new StringVisualizer();
    mathVisualizer = new MathVisualizer();

    // Time format change listeners
    const timeFormatSelectors = [
        { id: 'sortTimeFormat', timeId: 'sortTime', valueKey: 'sortTime' },
        { id: 'pathTimeFormat', timeId: 'pathTime', valueKey: 'pathTime' },
        { id: 'searchTimeFormat', timeId: 'searchTime', valueKey: 'searchTime' },
        { id: 'graphTimeFormat', timeId: 'graphTime', valueKey: 'graphTime' },
        { id: 'dpTimeFormat', timeId: 'dpTime', valueKey: 'dpTime' },
        { id: 'stringTimeFormat', timeId: 'stringTime', valueKey: 'stringTime' },
        { id: 'mathTimeFormat', timeId: 'mathTime', valueKey: 'mathTime' }
    ];

    timeFormatSelectors.forEach(({ id, timeId, valueKey }) => {
        const formatSelect = document.getElementById(id);
        if (formatSelect) {
            formatSelect.addEventListener('change', (e) => {
                const timeEl = document.getElementById(timeId);
                if (timeEl && rawTimeValues[valueKey] > 0) {
                    timeEl.textContent = formatTimeValue(rawTimeValues[valueKey], e.target.value);
                }
            });
        }
    });
});

// Export stop function for navigation
window.stopAllVisualizations = stopAllVisualizations;
