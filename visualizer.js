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

const LANGUAGE_SVGS = {
    java: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#5382A1" d="M62.308 119.887c-.44-4.567-.88-9.093-1.225-13.577-.221-2.763.173-5.443.789-8.125 1.006-4.386 2.153-8.736 3.212-13.105.712-2.918.267-5.898-.788-8.739-2.363-6.146-5.095-12.153-7.861-18.161C50.272 59.085 47.592 52.192 45.953 45.181c-.688-2.891-.053-6.038 1.242-8.791 1.604-3.485 3.844-6.619 6.123-9.705C57.87 19.591 59.48 14.476 58.211 9.438c-1.078-4.34-3.603-8.223-7.137-11.052C44.018 .006 37.668 3.251 32.853 7.879c-4.351 4.183-8.357 8.799-12.131 13.473-5.087 6.213-10.581 12.552-14.673 19.781C2.468 46.1.184 53.775 0 61.549c-.125 5.413 1.885 10.7 5.674 14.633 4.127 4.3 10.016 7.577 16.926 8.553 5.497.828 11.002.329 16.215-1.411 2.853-.979 5.604-2.334 8.28-3.841 7.105-4.016 13.958-8.716 21.027-13.281a182.776 182.776 0 0 0 20.231-13.079c2.886-2.042 5.782-4.099 8.642-6.172 2.768-2.01 5.508-4.072 8.361-6.104.776-.567 1.783-.703 2.724-.324.916.37 1.37 1.202 1.163 2.079-.338 1.434-1.68 2.435-3.205 2.32-2.265-.174-4.664-.351-6.943-.517-5.135-.366-10.316-.686-15.501-.924h-.021c-.991-.022-1.513.932-.682 1.523 5.175 3.677 10.288 7.404 15.403 11.147 4.514 3.353 9.109 6.717 13.576 10.156 2.193 1.747 4.422 3.514 6.587 5.354.837.7 2.08.529 2.721-.403.629-.919.316-2.225-.708-2.662-4.754-2.076-9.57-4.123-14.323-6.163a116.249 116.249 0 0 0-13.154-6.186c-2.013-.834-4.191-1.536-6.33-2.302-.873-.293-1.714.211-2.03 1.002a1.681 1.681 0 0 0 .498 1.932c5.397 5.129 10.802 10.271 16.135 15.385 4.269 4.138 8.612 8.263 12.948 12.412.827.785 2.157.524 2.723-.557.464-.837.252-1.756-.506-2.37-5.32-4.489-10.67-8.976-15.991-13.484A175.831 175.831 0 0 0 62.308 119.887z"></path></svg>',
    python: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#306998" d="M62.1 121.2c-.5-4.7-1-9.3-1.4-13.9-.2-2.8.2-5.7.9-8.5 1-4.6 2.1-9.2 3.2-13.8.7-3 .3-6-.8-8.9-2.5-6.5-5.3-13-8.2-19.5-2.3-5.3-4.7-10.7-6.8-16.1-.7-3-.1-6.3 1.2-8.6 1.6-3.5 3.8-6.7 6.1-9.8 4.2-6 5.8-11.3 4.9-16.9C59.3 9.3 56.8 5.4 53.2 2.8c-5.2-3.8-11.5-.6-15.2 3.2-4.3 4.1-8.2 8.1-12.1 12.1-5.1 6.2-10.5 12.6-14.6 19.5C2.5 52.4.2 60 .1 67.8c-.1 5.5 2 11 6 14.8 4.1 4.4 10 7.7 16.8 8.8 5.5.8 11 .3 16.1-1.4 2.9-1 5.6-2.4 8.2-3.9 7.4-4.2 14.2-8.7 21.3-13.6a185.784 185.784 0 0 0 20.4-13.2c2.9-2.1 5.8-4.1 8.6-6.3 2.8-2 5.5-4 8.4-6.2.8-.6 1.9-.7 2.9-.3.9.4 1.3 1.2 1.2 2.1-.4 1.5-1.7 2.5-3.2 2.4-2.3-.2-4.7-.4-7-.5-5.2-.3-10.4-.7-15.5-1-.1 0-.1 0-.2 0-.1 0-.2.1-.1.3-6.1 3.6-12.2 7.2-18.4 10.8-5.2 3.1-10.4 6.1-15.6 9.1-2.6 1.5-5.3 3-8.2 4.6-2.3 1.2-4.7 2.4-7.2 3.7-.8.4-1.8.6-2.5-.2-.7-.9-.5-2.2.7-2.7 5.2-2 10.4-3.9 15.5-6 3.7-1.6 7.3-3.2 11-4.8 1.5-.7 2.3-.1 3 .8a1.623 1.623 0 0 0 .6 2c5.5 5.2 11 10.4 16.5 15.8 4.4 4.2 8.9 8.3 13.3 12.6.8.7 2.2.5 2.8-.6.5-.8.3-1.8-.5-2.4-5.1-4.5-10.2-9-15.2-13.5z"></path></svg>',
    deno: '<svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#000"/><path d="M41.8 37.7a9.3 9.3 0 00-5.9-8.6 7.2 7.2 0 00-10.7 5.4" stroke="#fff" stroke-width="3" fill="none"/><ellipse cx="27.5" cy="44.5" rx="2" ry="1.5" fill="#fff"/><ellipse cx="36.5" cy="44.5" rx="2" ry="1.5" fill="#fff"/><ellipse cx="32" cy="51" rx="5" ry="2" fill="#fff"/></svg>',
    node: '<svg viewBox="0 0 128 128"><g><path fill="#8CC84B" d="M64.01 4L12 32v64l52 28 52-28V32z"/><path fill="#fff" d="M63.98 9.37L18.04 33.8v60.41l45.94 24.43 45.94-24.43V33.8z"/><path fill="#8CC84B" d="M64.01 14.84l41.31 22V91.93L64.01 113.76 22.69 91.93V36.84z"/><g><path fill="#1A1A1A" d="M72.95 45.94h-6.87v36.22c0 1.33.65 2.09 2.02 2.09.6 0 1.36-.12 2.7-.7V90.6c-1.4.39-2.83.59-4.5.59-4.43 0-6.7-2.22-6.7-7.24V45.94h-5.08v-4.26c1.58.36 3.13.54 4.67.54s3.07-.18 4.65-.54V41.68h6.87v4.26zM81.22 70.06c0-4.99-1.91-7.26-6.3-7.26-1.48 0-2.9.22-4.17.63v-4.25c1.58-.35 3.13-.53 4.67-.53 7.27 0 10.84 4.26 10.84 12.92v17.11c-1.58.36-3.13.54-4.67.54s-3.09-.18-4.67-.54V87.01c1.35.59 2.11.71 2.7.71 1.38 0 2.03-.76 2.03-2.11V70.06z"/></g></g></svg>',
    typescript: '<svg viewBox="0 0 128 128"><g><path fill="#3178C6" d="M14 14h100v100H14z"/><path fill="#fff" d="M36.87 64.04v2.21h10.83v16.39c0 .37-.13.44-1.69.84-6.36 1.56-8.98 2.42-12.19 3.79v2.24c3.24-1.39 5.98-2.29 12.18-3.79 6.19-1.51 7.46-2.11 7.46-5.11V67.33h10.77v-2.21z"/><path fill="#fff" d="M89.8 64.04v2.21h-4.65v16.68c0 .37-.14.44-1.71.84-5.68 1.37-7.96 2.07-11.03 3.27v2.23c3.11-1.22 5.44-1.85 11.03-3.27 5.6-1.42 7.08-2.14 7.08-5.11V67.33h4.61v-2.21z"/></g></svg>',
    php: '<svg viewBox="0 0 128 128"><ellipse cx="64" cy="64" rx="61" ry="32" fill="#777BB4"/><text x="22" y="85" font-family="Arial" font-size="48" fill="#fff">PHP</text></svg>',
    elixir: '<svg viewBox="0 0 128 128"><path fill="#6E4A7E" d="M64 12c-35 30-52 72-33 92 19 20 61 11 66-17 5-28-21-69-33-75z"/></svg>',
    kotlin: '<svg viewBox="0 0 128 128"><rect width="128" height="128" fill="#FFF"/><polygon points="0,0 128,0 0,128" fill="#7F52FF"/><polygon points="128,0 128,128 0,128" fill="#FFAA1D" opacity="0.9"/></svg>',
    swift: '<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#f05138"/><path d="M37 99c-10-16 10-36 36-66 18 20 39 46 29 59-5 7-12 7-19 7-7-1-22-5-46 0z" fill="#fff"/><path d="M68 39c6 8 13 19 16 21" stroke="#fff" stroke-width="2" fill="none"/></svg>',
    ruby: '<svg viewBox="0 0 128 128"><ellipse cx="64" cy="72" rx="51" ry="41" fill="#CC342D"/><polygon points="64,7 114,72 64,121 14,72" fill="#fff" opacity="0.2"/><ellipse cx="64" cy="72" rx="35" ry="28" fill="#fff" opacity="0.2"/></svg>',
    javascript: '<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#F7DF1E"/><path d="M24 102V28h80v74z" fill="none"/><text x="34" y="92" font-family="Arial Black" font-size="54" fill="#000">JS</text></svg>',
    cpp: '<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#00599C"/><text x="36" y="92" font-family="Arial Black" font-size="54" fill="#FFF">C++</text></svg>',
    csharp: '<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#68217A"/><text x="36" y="92" font-family="Arial Black" font-size="54" fill="#FFF">C#</text></svg>',
    rust: '<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="56" fill="#000"/><text x="34" y="92" font-family="Arial Black" font-size="54" fill="#FFF">R</text></svg>',
    go: '<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#00ADD8"/><text x="36" y="92" font-family="Arial Black" font-size="54" fill="#FFF">GO</text></svg>'
};

const LANGUAGE_INFO = {
    javascript: { name: 'JavaScript', symbol: 'JS', color: '#f7df1e', svg: LANGUAGE_SVGS.javascript },
    python: { name: 'Python', symbol: 'PY', color: '#3776ab', svg: LANGUAGE_SVGS.python },
    java: { name: 'Java', symbol: 'JV', color: '#007396', svg: LANGUAGE_SVGS.java },
    cpp: { name: 'C++', symbol: 'C++', color: '#00599c', svg: LANGUAGE_SVGS.cpp },
    csharp: { name: 'C#', symbol: 'C#', color: '#239120', svg: LANGUAGE_SVGS.csharp },
    go: { name: 'Go', symbol: 'GO', color: '#00add8', svg: LANGUAGE_SVGS.go },
    rust: { name: 'Rust', symbol: 'RS', color: '#dea584', svg: LANGUAGE_SVGS.rust },
    ruby: { name: 'Ruby', symbol: 'RB', color: '#cc342d', svg: LANGUAGE_SVGS.ruby },
    php: { name: 'PHP', symbol: 'PHP', color: '#777bb4', svg: LANGUAGE_SVGS.php },
    elixir: { name: 'Elixir', symbol: 'EX', color: '#6e4a7e', svg: LANGUAGE_SVGS.elixir },
    node: { name: 'Node.js', symbol: 'ND', color: '#339933', svg: LANGUAGE_SVGS.node },
    deno: { name: 'Deno', symbol: 'DN', color: '#000000', svg: LANGUAGE_SVGS.deno },
    kotlin: { name: 'Kotlin', symbol: 'KT', color: '#7F52FF', svg: LANGUAGE_SVGS.kotlin },
    swift: { name: 'Swift', symbol: 'SW', color: '#FA7343', svg: LANGUAGE_SVGS.swift },
    typescript: { name: 'TypeScript', symbol: 'TS', color: '#3178c6', svg: LANGUAGE_SVGS.typescript }
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
                    <span class="lang-logo-svg" data-lang="${lang}"></span>
                    <span class="lang-name">${info.name}</span>
                </div>
                <div class="track-bar">
                    <div class="track-runner" id="runner-${lang}" style="background: ${info.color}; border-color: ${info.color}">
                        <span class="lang-logo-svg runner-logo" data-lang="${lang}"></span>
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
