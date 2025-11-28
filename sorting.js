// ========================================
// Sorting Algorithm Visualizer
// ========================================

class SortingVisualizer {
    constructor() {
        this.arraySize = 50;
        this.speed = 50;
        this.isRunning = false;
        this.arrays = {};
        this.algorithms = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'];
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        this.generateArrays();
        this.renderAllBars();
    }
    
    setupEventListeners() {
        document.getElementById('arraySize').addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            document.getElementById('arraySizeValue').textContent = this.arraySize;
            this.generateArrays();
            this.renderAllBars();
        });
        
        document.getElementById('sortSpeed').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
        });
        
        document.getElementById('shuffleArray').addEventListener('click', () => {
            if (!this.isRunning) {
                this.generateArrays();
                this.renderAllBars();
                this.resetTimes();
                this.resetProgress();
            }
        });
        
        document.getElementById('startSort').addEventListener('click', () => {
            if (!this.isRunning) {
                this.startRace();
            }
        });
    }
    
    generateArrays() {
        const baseArray = [];
        for (let i = 1; i <= this.arraySize; i++) {
            baseArray.push(i);
        }
        
        // Shuffle the base array
        for (let i = baseArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [baseArray[i], baseArray[j]] = [baseArray[j], baseArray[i]];
        }
        
        // Copy to all algorithm arrays
        for (const algo of this.algorithms) {
            this.arrays[algo] = [...baseArray];
        }
    }
    
    renderAllBars() {
        for (const algo of this.algorithms) {
            this.renderBars(algo);
        }
    }
    
    renderBars(algorithm) {
        const container = document.getElementById(`${algorithm}Bars`);
        container.innerHTML = '';
        
        const array = this.arrays[algorithm];
        const maxVal = Math.max(...array);
        
        for (let i = 0; i < array.length; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(array[i] / maxVal) * 100}%`;
            container.appendChild(bar);
        }
    }
    
    updateBar(algorithm, index, value, maxVal, className = null) {
        const container = document.getElementById(`${algorithm}Bars`);
        const bar = container.children[index];
        if (bar) {
            bar.style.height = `${(value / maxVal) * 100}%`;
            if (className) {
                bar.className = `bar ${className}`;
            }
        }
    }
    
    highlightBars(algorithm, indices, className) {
        const container = document.getElementById(`${algorithm}Bars`);
        // Reset all bars
        Array.from(container.children).forEach(bar => {
            bar.className = 'bar';
        });
        // Highlight specific bars
        indices.forEach(index => {
            if (container.children[index]) {
                container.children[index].classList.add(className);
            }
        });
    }
    
    markSorted(algorithm, indices) {
        const container = document.getElementById(`${algorithm}Bars`);
        indices.forEach(index => {
            if (container.children[index]) {
                container.children[index].classList.add('sorted');
            }
        });
    }
    
    resetTimes() {
        for (const algo of this.algorithms) {
            document.getElementById(`${algo}Time`).textContent = '-';
        }
    }
    
    resetProgress() {
        for (const algo of this.algorithms) {
            document.getElementById(`${algo}Progress`).style.width = '0%';
            document.querySelector(`[data-algorithm="${algo}"]`).classList.remove('racing', 'finished', 'winner');
        }
    }
    
    updateProgress(algorithm, progress) {
        document.getElementById(`${algorithm}Progress`).style.width = `${progress}%`;
    }
    
    async startRace() {
        this.isRunning = true;
        this.resetTimes();
        this.resetProgress();
        
        // Mark all lanes as racing
        for (const algo of this.algorithms) {
            document.querySelector(`[data-algorithm="${algo}"]`).classList.add('racing');
        }
        
        const finishTimes = {};
        let winner = null;
        
        // Start all sorting algorithms concurrently
        const promises = this.algorithms.map(async (algo) => {
            const startTime = performance.now();
            await this[`${algo}Sort`](algo);
            const endTime = performance.now();
            const time = Math.round(endTime - startTime);
            
            finishTimes[algo] = time;
            document.getElementById(`${algo}Time`).textContent = `${time}ms`;
            
            const lane = document.querySelector(`[data-algorithm="${algo}"]`);
            lane.classList.remove('racing');
            lane.classList.add('finished');
            
            // Check if this is the winner
            if (!winner) {
                winner = algo;
                lane.classList.add('winner');
            }
            
            return { algo, time };
        });
        
        await Promise.all(promises);
        this.isRunning = false;
    }
    
    getDelay() {
        return Math.max(1, 101 - this.speed);
    }
    
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // ========================================
    // Bubble Sort
    // ========================================
    async bubbleSort(algorithm) {
        const arr = this.arrays[algorithm];
        const n = arr.length;
        const maxVal = Math.max(...arr);
        const totalOps = (n * (n - 1)) / 2;
        let ops = 0;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.highlightBars(algorithm, [j, j + 1], 'comparing');
                
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    this.highlightBars(algorithm, [j, j + 1], 'swapping');
                    this.updateBar(algorithm, j, arr[j], maxVal);
                    this.updateBar(algorithm, j + 1, arr[j + 1], maxVal);
                }
                
                ops++;
                this.updateProgress(algorithm, (ops / totalOps) * 100);
                await this.sleep(this.getDelay());
            }
            this.markSorted(algorithm, [n - i - 1]);
        }
        this.markSorted(algorithm, [0]);
    }
    
    // ========================================
    // Selection Sort
    // ========================================
    async selectionSort(algorithm) {
        const arr = this.arrays[algorithm];
        const n = arr.length;
        const maxVal = Math.max(...arr);
        const totalOps = (n * (n - 1)) / 2;
        let ops = 0;
        
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            
            for (let j = i + 1; j < n; j++) {
                this.highlightBars(algorithm, [minIdx, j], 'comparing');
                
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
                
                ops++;
                this.updateProgress(algorithm, (ops / totalOps) * 100);
                await this.sleep(this.getDelay());
            }
            
            if (minIdx !== i) {
                this.highlightBars(algorithm, [i, minIdx], 'swapping');
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                this.updateBar(algorithm, i, arr[i], maxVal);
                this.updateBar(algorithm, minIdx, arr[minIdx], maxVal);
                await this.sleep(this.getDelay());
            }
            
            this.markSorted(algorithm, [i]);
        }
        this.markSorted(algorithm, [n - 1]);
    }
    
    // ========================================
    // Insertion Sort
    // ========================================
    async insertionSort(algorithm) {
        const arr = this.arrays[algorithm];
        const n = arr.length;
        const maxVal = Math.max(...arr);
        let ops = 0;
        const totalOps = (n * (n - 1)) / 2;
        
        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;
            
            while (j >= 0 && arr[j] > key) {
                this.highlightBars(algorithm, [j, j + 1], 'comparing');
                arr[j + 1] = arr[j];
                this.updateBar(algorithm, j + 1, arr[j + 1], maxVal);
                j--;
                ops++;
                this.updateProgress(algorithm, Math.min((ops / totalOps) * 100, 100));
                await this.sleep(this.getDelay());
            }
            
            arr[j + 1] = key;
            this.updateBar(algorithm, j + 1, arr[j + 1], maxVal);
            this.highlightBars(algorithm, [j + 1], 'swapping');
            await this.sleep(this.getDelay());
        }
        
        // Mark all as sorted
        this.markSorted(algorithm, Array.from({ length: n }, (_, i) => i));
    }
    
    // ========================================
    // Merge Sort
    // ========================================
    async mergeSort(algorithm) {
        const arr = this.arrays[algorithm];
        const n = arr.length;
        this.mergeSortOps = 0;
        this.mergeSortTotal = n * Math.ceil(Math.log2(n));
        
        await this.mergeSortHelper(algorithm, arr, 0, n - 1);
        
        // Mark all as sorted
        this.markSorted(algorithm, Array.from({ length: n }, (_, i) => i));
    }
    
    async mergeSortHelper(algorithm, arr, left, right) {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        await this.mergeSortHelper(algorithm, arr, left, mid);
        await this.mergeSortHelper(algorithm, arr, mid + 1, right);
        await this.merge(algorithm, arr, left, mid, right);
    }
    
    async merge(algorithm, arr, left, mid, right) {
        const maxVal = Math.max(...this.arrays[algorithm]);
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            this.highlightBars(algorithm, [left + i, mid + 1 + j], 'comparing');
            
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            
            this.updateBar(algorithm, k, arr[k], maxVal);
            this.highlightBars(algorithm, [k], 'swapping');
            k++;
            
            this.mergeSortOps++;
            this.updateProgress(algorithm, Math.min((this.mergeSortOps / this.mergeSortTotal) * 100, 100));
            await this.sleep(this.getDelay());
        }
        
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            this.updateBar(algorithm, k, arr[k], maxVal);
            i++;
            k++;
            this.mergeSortOps++;
            this.updateProgress(algorithm, Math.min((this.mergeSortOps / this.mergeSortTotal) * 100, 100));
            await this.sleep(this.getDelay());
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            this.updateBar(algorithm, k, arr[k], maxVal);
            j++;
            k++;
            this.mergeSortOps++;
            this.updateProgress(algorithm, Math.min((this.mergeSortOps / this.mergeSortTotal) * 100, 100));
            await this.sleep(this.getDelay());
        }
    }
    
    // ========================================
    // Quick Sort
    // ========================================
    async quickSort(algorithm) {
        const arr = this.arrays[algorithm];
        const n = arr.length;
        this.quickSortOps = 0;
        this.quickSortTotal = n * Math.ceil(Math.log2(n));
        
        await this.quickSortHelper(algorithm, arr, 0, n - 1);
        
        // Mark all as sorted
        this.markSorted(algorithm, Array.from({ length: n }, (_, i) => i));
    }
    
    async quickSortHelper(algorithm, arr, low, high) {
        if (low < high) {
            const pivotIndex = await this.partition(algorithm, arr, low, high);
            await this.quickSortHelper(algorithm, arr, low, pivotIndex - 1);
            await this.quickSortHelper(algorithm, arr, pivotIndex + 1, high);
        }
    }
    
    async partition(algorithm, arr, low, high) {
        const maxVal = Math.max(...this.arrays[algorithm]);
        const pivot = arr[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            this.highlightBars(algorithm, [j, high], 'comparing');
            
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                this.updateBar(algorithm, i, arr[i], maxVal);
                this.updateBar(algorithm, j, arr[j], maxVal);
                this.highlightBars(algorithm, [i, j], 'swapping');
            }
            
            this.quickSortOps++;
            this.updateProgress(algorithm, Math.min((this.quickSortOps / this.quickSortTotal) * 100, 100));
            await this.sleep(this.getDelay());
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        this.updateBar(algorithm, i + 1, arr[i + 1], maxVal);
        this.updateBar(algorithm, high, arr[high], maxVal);
        
        return i + 1;
    }
    
    // ========================================
    // Heap Sort
    // ========================================
    async heapSort(algorithm) {
        const arr = this.arrays[algorithm];
        const n = arr.length;
        this.heapSortOps = 0;
        this.heapSortTotal = n * Math.ceil(Math.log2(n)) * 2;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(algorithm, arr, n, i);
        }
        
        // Extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            const maxVal = Math.max(...arr);
            [arr[0], arr[i]] = [arr[i], arr[0]];
            this.updateBar(algorithm, 0, arr[0], maxVal);
            this.updateBar(algorithm, i, arr[i], maxVal);
            this.highlightBars(algorithm, [0, i], 'swapping');
            
            this.heapSortOps++;
            this.updateProgress(algorithm, Math.min((this.heapSortOps / this.heapSortTotal) * 100, 100));
            await this.sleep(this.getDelay());
            
            this.markSorted(algorithm, [i]);
            await this.heapify(algorithm, arr, i, 0);
        }
        
        this.markSorted(algorithm, [0]);
    }
    
    async heapify(algorithm, arr, n, i) {
        const maxVal = Math.max(...this.arrays[algorithm]);
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n) {
            this.highlightBars(algorithm, [largest, left], 'comparing');
            if (arr[left] > arr[largest]) {
                largest = left;
            }
            this.heapSortOps++;
            this.updateProgress(algorithm, Math.min((this.heapSortOps / this.heapSortTotal) * 100, 100));
            await this.sleep(this.getDelay() / 2);
        }
        
        if (right < n) {
            this.highlightBars(algorithm, [largest, right], 'comparing');
            if (arr[right] > arr[largest]) {
                largest = right;
            }
            this.heapSortOps++;
            this.updateProgress(algorithm, Math.min((this.heapSortOps / this.heapSortTotal) * 100, 100));
            await this.sleep(this.getDelay() / 2);
        }
        
        if (largest !== i) {
            this.highlightBars(algorithm, [i, largest], 'swapping');
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.updateBar(algorithm, i, arr[i], maxVal);
            this.updateBar(algorithm, largest, arr[largest], maxVal);
            
            await this.sleep(this.getDelay());
            await this.heapify(algorithm, arr, n, largest);
        }
    }
}

// Initialize sorting visualizer when DOM is ready
let sortingVisualizer;
document.addEventListener('DOMContentLoaded', () => {
    sortingVisualizer = new SortingVisualizer();
});

