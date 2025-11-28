// ========================================
// 50 Most Used Algorithms Database
// With Multi-Language Implementations
// ========================================

const ALGORITHMS = {
    // ==================== SORTING ALGORITHMS ====================
    sorting: {
        bubbleSort: {
            name: "Bubble Sort",
            category: "sorting",
            complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
            description: "Repeatedly swaps adjacent elements if they are in wrong order.",
            code: {
                javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
                python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
                java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
                cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
                csharp: `public static void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
            }
        }
    }
}`,
                go: `func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}`,
                rust: `fn bubble_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    for i in 0..n-1 {
        for j in 0..n-i-1 {
            if arr[j] > arr[j+1] {
                arr.swap(j, j+1);
            }
        }
    }
}`,
                typescript: `function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`
            }
        },
        quickSort: {
            name: "Quick Sort",
            category: "sorting",
            complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
            description: "Picks a pivot and partitions array around it, then recursively sorts.",
            code: {
                javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
                python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
                java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
                cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
                go: `func quickSort(arr []int, low, high int) {
    if low < high {
        pi := partition(arr, low, high)
        quickSort(arr, low, pi-1)
        quickSort(arr, pi+1, high)
    }
}

func partition(arr []int, low, high int) int {
    pivot := arr[high]
    i := low - 1
    for j := low; j < high; j++ {
        if arr[j] < pivot {
            i++
            arr[i], arr[j] = arr[j], arr[i]
        }
    }
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
}`,
                rust: `fn quick_sort(arr: &mut [i32]) {
    if arr.len() <= 1 { return; }
    let pi = partition(arr);
    quick_sort(&mut arr[..pi]);
    quick_sort(&mut arr[pi + 1..]);
}

fn partition(arr: &mut [i32]) -> usize {
    let len = arr.len();
    let pivot = arr[len - 1];
    let mut i = 0;
    for j in 0..len - 1 {
        if arr[j] < pivot {
            arr.swap(i, j);
            i += 1;
        }
    }
    arr.swap(i, len - 1);
    i
}`,
                csharp: `public static void QuickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = Partition(arr, low, high);
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
}

static int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            (arr[i], arr[j]) = (arr[j], arr[i]);
        }
    }
    (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
    return i + 1;
}`
            }
        },
        mergeSort: {
            name: "Merge Sort",
            category: "sorting",
            complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
            description: "Divides array into halves, sorts them, and merges back together.",
            code: {
                javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
                python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
                java: `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

static void merge(int[] arr, int l, int m, int r) {
    int[] L = Arrays.copyOfRange(arr, l, m + 1);
    int[] R = Arrays.copyOfRange(arr, m + 1, r + 1);
    int i = 0, j = 0, k = l;
    while (i < L.length && j < R.length) {
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    }
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
}`,
                cpp: `void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> L(arr.begin() + l, arr.begin() + m + 1);
    vector<int> R(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < L.size() && j < R.size())
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < L.size()) arr[k++] = L[i++];
    while (j < R.size()) arr[k++] = R[j++];
}`,
                go: `func mergeSort(arr []int) []int {
    if len(arr) <= 1 { return arr }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}

func merge(left, right []int) []int {
    result := make([]int, 0)
    i, j := 0, 0
    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            result = append(result, left[i]); i++
        } else {
            result = append(result, right[j]); j++
        }
    }
    return append(append(result, left[i:]...), right[j:]...)
}`,
                rust: `fn merge_sort(arr: &mut [i32]) {
    let len = arr.len();
    if len <= 1 { return; }
    let mid = len / 2;
    merge_sort(&mut arr[..mid]);
    merge_sort(&mut arr[mid..]);
    let mut merged = merge(&arr[..mid], &arr[mid..]);
    arr.copy_from_slice(&merged);
}

fn merge(left: &[i32], right: &[i32]) -> Vec<i32> {
    let mut result = Vec::new();
    let (mut i, mut j) = (0, 0);
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] { result.push(left[i]); i += 1; }
        else { result.push(right[j]); j += 1; }
    }
    result.extend_from_slice(&left[i..]);
    result.extend_from_slice(&right[j..]);
    result
}`
            }
        },
        insertionSort: {
            name: "Insertion Sort",
            category: "sorting",
            complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
            description: "Builds sorted array one item at a time by inserting elements in correct position.",
            code: {
                javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
                python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
                java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
                go: `func insertionSort(arr []int) {
    for i := 1; i < len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}`
            }
        },
        selectionSort: {
            name: "Selection Sort",
            category: "sorting",
            complexity: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
            description: "Finds minimum element and moves it to the sorted portion repeatedly.",
            code: {
                javascript: `function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}`,
                python: `def selection_sort(arr):
    for i in range(len(arr) - 1):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
                java: `public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`
            }
        },
        heapSort: {
            name: "Heap Sort",
            category: "sorting",
            complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
            description: "Uses binary heap data structure to sort elements.",
            code: {
                javascript: `function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}`,
                python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`
            }
        },
        countingSort: {
            name: "Counting Sort",
            category: "sorting",
            complexity: { best: "O(n+k)", avg: "O(n+k)", worst: "O(n+k)", space: "O(k)" },
            description: "Counts occurrences of each element to sort. Works for integers.",
            code: {
                javascript: `function countingSort(arr) {
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    arr.forEach(num => count[num]++);
    let idx = 0;
    for (let i = 0; i <= max; i++) {
        while (count[i]-- > 0) arr[idx++] = i;
    }
    return arr;
}`,
                python: `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for num in arr:
        count[num] += 1
    idx = 0
    for i in range(max_val + 1):
        while count[i] > 0:
            arr[idx] = i
            idx += 1
            count[i] -= 1
    return arr`
            }
        },
        radixSort: {
            name: "Radix Sort",
            category: "sorting",
            complexity: { best: "O(nk)", avg: "O(nk)", worst: "O(nk)", space: "O(n+k)" },
            description: "Sorts by processing individual digits from least to most significant.",
            code: {
                javascript: `function radixSort(arr) {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    return arr;
}

function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    arr.forEach(num => count[Math.floor(num / exp) % 10]++);
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[--count[digit]] = arr[i];
    }
    arr.forEach((_, i) => arr[i] = output[i]);
}`,
                python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for num in arr:
        count[(num // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        count[digit] -= 1
        output[count[digit]] = arr[i]
    for i in range(n):
        arr[i] = output[i]`
            }
        },
        shellSort: {
            name: "Shell Sort",
            category: "sorting",
            complexity: { best: "O(n log n)", avg: "O(n^1.5)", worst: "O(n²)", space: "O(1)" },
            description: "Generalization of insertion sort using gap sequences.",
            code: {
                javascript: `function shellSort(arr) {
    let gap = Math.floor(arr.length / 2);
    while (gap > 0) {
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}`,
                python: `def shell_sort(arr):
    gap = len(arr) // 2
    while gap > 0:
        for i in range(gap, len(arr)):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`
            }
        },
        timSort: {
            name: "Tim Sort",
            category: "sorting",
            complexity: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
            description: "Hybrid sorting algorithm derived from merge sort and insertion sort. Used in Python and Java.",
            code: {
                javascript: `function timSort(arr) {
    const RUN = 32;
    const n = arr.length;
    // Sort individual runs using insertion sort
    for (let i = 0; i < n; i += RUN) {
        insertionSortRange(arr, i, Math.min(i + RUN - 1, n - 1));
    }
    // Merge runs
    for (let size = RUN; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) mergeRuns(arr, left, mid, right);
        }
    }
    return arr;
}`,
                python: `# Python's built-in sort uses Tim Sort
arr.sort()  # or sorted(arr)`
            }
        }
    },

    // ==================== SEARCHING ALGORITHMS ====================
    searching: {
        binarySearch: {
            name: "Binary Search",
            category: "searching",
            complexity: { best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
            description: "Searches sorted array by repeatedly dividing search interval in half.",
            code: {
                javascript: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
                python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
                java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
                go: `func binarySearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    for left <= right {
        mid := left + (right-left)/2
        if arr[mid] == target { return mid }
        if arr[mid] < target { left = mid + 1 }
        else { right = mid - 1 }
    }
    return -1
}`,
                rust: `fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut left = 0;
    let mut right = arr.len();
    while left < right {
        let mid = left + (right - left) / 2;
        if arr[mid] == target { return Some(mid); }
        if arr[mid] < target { left = mid + 1; }
        else { right = mid; }
    }
    None
}`
            }
        },
        linearSearch: {
            name: "Linear Search",
            category: "searching",
            complexity: { best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
            description: "Sequentially checks each element until match is found.",
            code: {
                javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
                python: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`
            }
        },
        jumpSearch: {
            name: "Jump Search",
            category: "searching",
            complexity: { best: "O(1)", avg: "O(√n)", worst: "O(√n)", space: "O(1)" },
            description: "Jumps ahead by fixed steps and then does linear search in block.",
            code: {
                javascript: `function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    return arr[prev] === target ? prev : -1;
}`,
                python: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
    return prev if arr[prev] == target else -1`
            }
        },
        interpolationSearch: {
            name: "Interpolation Search",
            category: "searching",
            complexity: { best: "O(1)", avg: "O(log log n)", worst: "O(n)", space: "O(1)" },
            description: "Improved binary search for uniformly distributed sorted arrays.",
            code: {
                javascript: `function interpolationSearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );
        if (arr[pos] === target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}`,
                python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        pos = low + ((target - arr[low]) * (high - low)) // (arr[high] - arr[low])
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`
            }
        },
        exponentialSearch: {
            name: "Exponential Search",
            category: "searching",
            complexity: { best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
            description: "Finds range where element might be present, then uses binary search.",
            code: {
                javascript: `function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;
    let i = 1;
    while (i < arr.length && arr[i] <= target) i *= 2;
    return binarySearchRange(arr, target, i / 2, Math.min(i, arr.length - 1));
}`,
                python: `def exponential_search(arr, target):
    if arr[0] == target:
        return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2
    return binary_search_range(arr, target, i // 2, min(i, len(arr) - 1))`
            }
        },
        ternarySearch: {
            name: "Ternary Search",
            category: "searching",
            complexity: { best: "O(1)", avg: "O(log₃ n)", worst: "O(log₃ n)", space: "O(1)" },
            description: "Divides array into three parts instead of two.",
            code: {
                javascript: `function ternarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);
        if (arr[mid1] === target) return mid1;
        if (arr[mid2] === target) return mid2;
        if (target < arr[mid1]) right = mid1 - 1;
        else if (target > arr[mid2]) left = mid2 + 1;
        else { left = mid1 + 1; right = mid2 - 1; }
    }
    return -1;
}`,
                python: `def ternary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid1 = left + (right - left) // 3
        mid2 = right - (right - left) // 3
        if arr[mid1] == target: return mid1
        if arr[mid2] == target: return mid2
        if target < arr[mid1]: right = mid1 - 1
        elif target > arr[mid2]: left = mid2 + 1
        else: left, right = mid1 + 1, mid2 - 1
    return -1`
            }
        }
    },

    // ==================== GRAPH ALGORITHMS ====================
    graphs: {
        bfs: {
            name: "BFS (Breadth-First Search)",
            category: "graphs",
            complexity: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
            description: "Explores all vertices at current depth before moving to next level.",
            code: {
                javascript: `function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];
    while (queue.length) {
        const node = queue.shift();
        result.push(node);
        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}`,
                python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    result = []
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return result`,
                java: `public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    List<Integer> result = new ArrayList<>();
    visited.add(start);
    queue.add(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        result.add(node);
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
    return result;
}`
            }
        },
        dfs: {
            name: "DFS (Depth-First Search)",
            category: "graphs",
            complexity: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
            description: "Explores as far as possible along each branch before backtracking.",
            code: {
                javascript: `function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    const result = [start];
    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            result.push(...dfs(graph, neighbor, visited));
        }
    }
    return result;
}`,
                python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    result = [start]
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    return result`
            }
        },
        dijkstra: {
            name: "Dijkstra's Algorithm",
            category: "graphs",
            complexity: { best: "O((V+E)logV)", avg: "O((V+E)logV)", worst: "O((V+E)logV)", space: "O(V)" },
            description: "Finds shortest paths from source to all vertices in weighted graph.",
            code: {
                javascript: `function dijkstra(graph, start) {
    const dist = {};
    const pq = [[0, start]];
    for (const node in graph) dist[node] = Infinity;
    dist[start] = 0;
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, u] = pq.shift();
        if (d > dist[u]) continue;
        for (const [v, w] of graph[u] || []) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([dist[v], v]);
            }
        }
    }
    return dist;
}`,
                python: `import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph.get(u, []):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`
            }
        },
        bellmanFord: {
            name: "Bellman-Ford Algorithm",
            category: "graphs",
            complexity: { best: "O(VE)", avg: "O(VE)", worst: "O(VE)", space: "O(V)" },
            description: "Finds shortest paths from source, handles negative weights.",
            code: {
                javascript: `function bellmanFord(vertices, edges, start) {
    const dist = Array(vertices).fill(Infinity);
    dist[start] = 0;
    for (let i = 0; i < vertices - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    return dist;
}`,
                python: `def bellman_ford(vertices, edges, start):
    dist = [float('inf')] * vertices
    dist[start] = 0
    for _ in range(vertices - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    return dist`
            }
        },
        floydWarshall: {
            name: "Floyd-Warshall Algorithm",
            category: "graphs",
            complexity: { best: "O(V³)", avg: "O(V³)", worst: "O(V³)", space: "O(V²)" },
            description: "Finds shortest paths between all pairs of vertices.",
            code: {
                javascript: `function floydWarshall(graph) {
    const n = graph.length;
    const dist = graph.map(row => [...row]);
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}`,
                python: `def floyd_warshall(graph):
    n = len(graph)
    dist = [row[:] for row in graph]
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    return dist`
            }
        },
        kruskal: {
            name: "Kruskal's MST",
            category: "graphs",
            complexity: { best: "O(E log E)", avg: "O(E log E)", worst: "O(E log E)", space: "O(V)" },
            description: "Finds minimum spanning tree using greedy approach with Union-Find.",
            code: {
                javascript: `function kruskal(vertices, edges) {
    edges.sort((a, b) => a[2] - b[2]);
    const parent = Array.from({length: vertices}, (_, i) => i);
    const find = x => parent[x] === x ? x : parent[x] = find(parent[x]);
    const union = (x, y) => parent[find(x)] = find(y);
    
    const mst = [];
    for (const [u, v, w] of edges) {
        if (find(u) !== find(v)) {
            union(u, v);
            mst.push([u, v, w]);
        }
    }
    return mst;
}`,
                python: `def kruskal(vertices, edges):
    edges.sort(key=lambda x: x[2])
    parent = list(range(vertices))
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    mst = []
    for u, v, w in edges:
        if find(u) != find(v):
            parent[find(u)] = find(v)
            mst.append((u, v, w))
    return mst`
            }
        },
        prim: {
            name: "Prim's MST",
            category: "graphs",
            complexity: { best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V)" },
            description: "Finds minimum spanning tree starting from any vertex.",
            code: {
                javascript: `function prim(graph, start = 0) {
    const n = Object.keys(graph).length;
    const visited = new Set();
    const mst = [];
    const pq = [[0, start, -1]]; // [weight, vertex, parent]
    
    while (visited.size < n && pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [w, u, parent] = pq.shift();
        if (visited.has(u)) continue;
        visited.add(u);
        if (parent !== -1) mst.push([parent, u, w]);
        for (const [v, weight] of graph[u] || []) {
            if (!visited.has(v)) pq.push([weight, v, u]);
        }
    }
    return mst;
}`,
                python: `import heapq

def prim(graph, start=0):
    visited = set()
    mst = []
    pq = [(0, start, -1)]
    
    while pq:
        w, u, parent = heapq.heappop(pq)
        if u in visited:
            continue
        visited.add(u)
        if parent != -1:
            mst.append((parent, u, w))
        for v, weight in graph.get(u, []):
            if v not in visited:
                heapq.heappush(pq, (weight, v, u))
    return mst`
            }
        },
        topologicalSort: {
            name: "Topological Sort",
            category: "graphs",
            complexity: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
            description: "Linear ordering of vertices in DAG such that for every edge u→v, u comes before v.",
            code: {
                javascript: `function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    function dfs(node) {
        visited.add(node);
        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) dfs(neighbor);
        }
        stack.push(node);
    }
    
    for (const node in graph) {
        if (!visited.has(node)) dfs(node);
    }
    return stack.reverse();
}`,
                python: `def topological_sort(graph):
    visited = set()
    stack = []
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(node)
    
    for node in graph:
        if node not in visited:
            dfs(node)
    return stack[::-1]`
            }
        },
        astar: {
            name: "A* Search Algorithm",
            category: "graphs",
            complexity: { best: "O(E)", avg: "O(E)", worst: "O(V²)", space: "O(V)" },
            description: "Uses heuristics to find shortest path efficiently. Best for pathfinding.",
            code: {
                javascript: `function aStar(start, goal, heuristic, neighbors) {
    const openSet = new Set([start]);
    const cameFrom = new Map();
    const gScore = new Map([[start, 0]]);
    const fScore = new Map([[start, heuristic(start, goal)]]);
    
    while (openSet.size > 0) {
        let current = [...openSet].reduce((a, b) => 
            (fScore.get(a) || Infinity) < (fScore.get(b) || Infinity) ? a : b);
        if (current === goal) return reconstructPath(cameFrom, current);
        openSet.delete(current);
        for (const [neighbor, cost] of neighbors(current)) {
            const tentative = (gScore.get(current) || Infinity) + cost;
            if (tentative < (gScore.get(neighbor) || Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentative);
                fScore.set(neighbor, tentative + heuristic(neighbor, goal));
                openSet.add(neighbor);
            }
        }
    }
    return null;
}`,
                python: `import heapq

def a_star(start, goal, heuristic, neighbors):
    open_set = [(heuristic(start, goal), start)]
    came_from = {}
    g_score = {start: 0}
    
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            return reconstruct_path(came_from, current)
        for neighbor, cost in neighbors(current):
            tentative = g_score[current] + cost
            if tentative < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative
                f_score = tentative + heuristic(neighbor, goal)
                heapq.heappush(open_set, (f_score, neighbor))
    return None`
            }
        }
    },

    // ==================== DYNAMIC PROGRAMMING ====================
    dp: {
        fibonacci: {
            name: "Fibonacci (DP)",
            category: "dp",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
            description: "Computes nth Fibonacci number using dynamic programming.",
            code: {
                javascript: `function fibonacci(n) {
    if (n <= 1) return n;
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}`,
                python: `def fibonacci(n):
    if n <= 1:
        return n
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[i-1] + dp[i-2])
    return dp[n]`
            }
        },
        knapsack: {
            name: "0/1 Knapsack",
            category: "dp",
            complexity: { best: "O(nW)", avg: "O(nW)", worst: "O(nW)", space: "O(nW)" },
            description: "Finds maximum value that can be put in a knapsack of capacity W.",
            code: {
                javascript: `function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    dp[i-1][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][capacity];
}`,
                python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                )
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][capacity]`
            }
        },
        lcs: {
            name: "Longest Common Subsequence",
            category: "dp",
            complexity: { best: "O(mn)", avg: "O(mn)", worst: "O(mn)", space: "O(mn)" },
            description: "Finds longest subsequence common to two sequences.",
            code: {
                javascript: `function lcs(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}`,
                python: `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`
            }
        },
        lis: {
            name: "Longest Increasing Subsequence",
            category: "dp",
            complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
            description: "Finds length of longest strictly increasing subsequence.",
            code: {
                javascript: `function lis(arr) {
    const tails = [];
    for (const num of arr) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) left = mid + 1;
            else right = mid;
        }
        if (left === tails.length) tails.push(num);
        else tails[left] = num;
    }
    return tails.length;
}`,
                python: `from bisect import bisect_left

def lis(arr):
    tails = []
    for num in arr:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    return len(tails)`
            }
        },
        coinChange: {
            name: "Coin Change",
            category: "dp",
            complexity: { best: "O(amount × n)", avg: "O(amount × n)", worst: "O(amount × n)", space: "O(amount)" },
            description: "Finds minimum number of coins needed to make up an amount.",
            code: {
                javascript: `function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
                python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`
            }
        },
        editDistance: {
            name: "Edit Distance (Levenshtein)",
            category: "dp",
            complexity: { best: "O(mn)", avg: "O(mn)", worst: "O(mn)", space: "O(mn)" },
            description: "Minimum edits (insert, delete, replace) to convert one string to another.",
            code: {
                javascript: `function editDistance(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array(m + 1).fill(null).map((_, i) => 
        Array(n + 1).fill(0).map((_, j) => i === 0 ? j : j === 0 ? i : 0)
    );
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            }
        }
    }
    return dp[m][n];
}`,
                python: `def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`
            }
        }
    },

    // ==================== STRING ALGORITHMS ====================
    strings: {
        kmp: {
            name: "KMP Pattern Matching",
            category: "strings",
            complexity: { best: "O(n+m)", avg: "O(n+m)", worst: "O(n+m)", space: "O(m)" },
            description: "Searches for pattern in text using failure function to avoid redundant comparisons.",
            code: {
                javascript: `function kmpSearch(text, pattern) {
    const lps = computeLPS(pattern);
    const matches = [];
    let i = 0, j = 0;
    
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++; j++;
            if (j === pattern.length) {
                matches.push(i - j);
                j = lps[j - 1];
            }
        } else if (j > 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    return matches;
}

function computeLPS(pattern) {
    const lps = [0];
    let len = 0, i = 1;
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            lps[i++] = ++len;
        } else if (len > 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}`,
                python: `def kmp_search(text, pattern):
    lps = compute_lps(pattern)
    matches = []
    i = j = 0
    
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                matches.append(i - j)
                j = lps[j - 1]
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return matches

def compute_lps(pattern):
    lps = [0] * len(pattern)
    length = 0
    i = 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    return lps`
            }
        },
        rabinKarp: {
            name: "Rabin-Karp",
            category: "strings",
            complexity: { best: "O(n+m)", avg: "O(n+m)", worst: "O(nm)", space: "O(1)" },
            description: "Uses hashing to find pattern in text. Good for multiple pattern search.",
            code: {
                javascript: `function rabinKarp(text, pattern) {
    const d = 256, q = 101;
    const m = pattern.length, n = text.length;
    let patHash = 0, textHash = 0, h = 1;
    const matches = [];
    
    for (let i = 0; i < m - 1; i++) h = (h * d) % q;
    for (let i = 0; i < m; i++) {
        patHash = (d * patHash + pattern.charCodeAt(i)) % q;
        textHash = (d * textHash + text.charCodeAt(i)) % q;
    }
    
    for (let i = 0; i <= n - m; i++) {
        if (patHash === textHash && text.slice(i, i + m) === pattern) {
            matches.push(i);
        }
        if (i < n - m) {
            textHash = (d * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (textHash < 0) textHash += q;
        }
    }
    return matches;
}`,
                python: `def rabin_karp(text, pattern):
    d, q = 256, 101
    m, n = len(pattern), len(text)
    pat_hash = text_hash = 0
    h = pow(d, m - 1, q)
    matches = []
    
    for i in range(m):
        pat_hash = (d * pat_hash + ord(pattern[i])) % q
        text_hash = (d * text_hash + ord(text[i])) % q
    
    for i in range(n - m + 1):
        if pat_hash == text_hash and text[i:i+m] == pattern:
            matches.append(i)
        if i < n - m:
            text_hash = (d * (text_hash - ord(text[i]) * h) + ord(text[i + m])) % q
    return matches`
            }
        }
    },

    // ==================== MATHEMATICAL ALGORITHMS ====================
    math: {
        gcd: {
            name: "GCD (Euclidean Algorithm)",
            category: "math",
            complexity: { best: "O(1)", avg: "O(log min(a,b))", worst: "O(log min(a,b))", space: "O(1)" },
            description: "Finds greatest common divisor of two numbers.",
            code: {
                javascript: `function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}`,
                python: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a`,
                java: `public static int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
                go: `func gcd(a, b int) int {
    for b != 0 {
        a, b = b, a%b
    }
    return a
}`
            }
        },
        sieveOfEratosthenes: {
            name: "Sieve of Eratosthenes",
            category: "math",
            complexity: { best: "O(n log log n)", avg: "O(n log log n)", worst: "O(n log log n)", space: "O(n)" },
            description: "Finds all prime numbers up to n.",
            code: {
                javascript: `function sieve(n) {
    const isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime.map((v, i) => v ? i : -1).filter(x => x > 0);
}`,
                python: `def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i, prime in enumerate(is_prime) if prime]`
            }
        },
        fastPower: {
            name: "Fast Exponentiation",
            category: "math",
            complexity: { best: "O(log n)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
            description: "Computes x^n in logarithmic time using binary exponentiation.",
            code: {
                javascript: `function fastPower(x, n) {
    if (n === 0) return 1;
    if (n < 0) { x = 1 / x; n = -n; }
    let result = 1;
    while (n > 0) {
        if (n % 2 === 1) result *= x;
        x *= x;
        n = Math.floor(n / 2);
    }
    return result;
}`,
                python: `def fast_power(x, n):
    if n == 0:
        return 1
    if n < 0:
        x, n = 1 / x, -n
    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result`
            }
        },
        modularExponentiation: {
            name: "Modular Exponentiation",
            category: "math",
            complexity: { best: "O(log n)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
            description: "Computes (x^n) mod m efficiently.",
            code: {
                javascript: `function modPow(x, n, m) {
    let result = 1;
    x = x % m;
    while (n > 0) {
        if (n % 2 === 1) result = (result * x) % m;
        n = Math.floor(n / 2);
        x = (x * x) % m;
    }
    return result;
}`,
                python: `def mod_pow(x, n, m):
    result = 1
    x = x % m
    while n > 0:
        if n % 2 == 1:
            result = (result * x) % m
        n //= 2
        x = (x * x) % m
    return result`
            }
        }
    },

    // ==================== TREE ALGORITHMS ====================
    trees: {
        inorderTraversal: {
            name: "Inorder Traversal",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Visits left subtree, root, then right subtree. For BST, gives sorted order.",
            code: {
                javascript: `function inorder(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    traverse(root);
    return result;
}`,
                python: `def inorder(root):
    result = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    traverse(root)
    return result`
            }
        },
        preorderTraversal: {
            name: "Preorder Traversal",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Visits root, then left subtree, then right subtree.",
            code: {
                javascript: `function preorder(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        result.push(node.val);
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return result;
}`,
                python: `def preorder(root):
    result = []
    def traverse(node):
        if not node:
            return
        result.append(node.val)
        traverse(node.left)
        traverse(node.right)
    traverse(root)
    return result`
            }
        },
        levelOrderTraversal: {
            name: "Level Order Traversal (BFS)",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(w)" },
            description: "Visits nodes level by level from top to bottom.",
            code: {
                javascript: `function levelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length) {
        const level = [];
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}`,
                python: `from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`
            }
        },
        bstInsert: {
            name: "BST Insert",
            category: "trees",
            complexity: { best: "O(log n)", avg: "O(log n)", worst: "O(n)", space: "O(h)" },
            description: "Inserts a value into a Binary Search Tree.",
            code: {
                javascript: `function insertBST(root, val) {
    if (!root) return { val, left: null, right: null };
    if (val < root.val) root.left = insertBST(root.left, val);
    else root.right = insertBST(root.right, val);
    return root;
}`,
                python: `def insert_bst(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert_bst(root.left, val)
    else:
        root.right = insert_bst(root.right, val)
    return root`
            }
        },
        lowestCommonAncestor: {
            name: "Lowest Common Ancestor",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Finds lowest common ancestor of two nodes in a tree.",
            code: {
                javascript: `function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
}`,
                python: `def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root
    return left or right`
            }
        },
        postorderTraversal: {
            name: "Postorder Traversal",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Visits left subtree, right subtree, then root.",
            code: {
                javascript: `function postorder(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        traverse(node.right);
        result.push(node.val);
    }
    traverse(root);
    return result;
}`,
                python: `def postorder(root):
    result = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        traverse(node.right)
        result.append(node.val)
    traverse(root)
    return result`
            }
        },
        bstSearch: {
            name: "BST Search",
            category: "trees",
            complexity: { best: "O(log n)", avg: "O(log n)", worst: "O(n)", space: "O(h)" },
            description: "Searches for a value in a Binary Search Tree.",
            code: {
                javascript: `function searchBST(root, val) {
    if (!root || root.val === val) return root;
    if (val < root.val) return searchBST(root.left, val);
    return searchBST(root.right, val);
}`,
                python: `def search_bst(root, val):
    if not root or root.val == val:
        return root
    if val < root.val:
        return search_bst(root.left, val)
    return search_bst(root.right, val)`
            }
        },
        bstDelete: {
            name: "BST Delete",
            category: "trees",
            complexity: { best: "O(log n)", avg: "O(log n)", worst: "O(n)", space: "O(h)" },
            description: "Deletes a value from a Binary Search Tree.",
            code: {
                javascript: `function deleteBST(root, val) {
    if (!root) return null;
    if (val < root.val) root.left = deleteBST(root.left, val);
    else if (val > root.val) root.right = deleteBST(root.right, val);
    else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        const min = findMin(root.right);
        root.val = min.val;
        root.right = deleteBST(root.right, min.val);
    }
    return root;
}`,
                python: `def delete_bst(root, val):
    if not root:
        return None
    if val < root.val:
        root.left = delete_bst(root.left, val)
    elif val > root.val:
        root.right = delete_bst(root.right, val)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        min_node = find_min(root.right)
        root.val = min_node.val
        root.right = delete_bst(root.right, min_node.val)
    return root`
            }
        },
        treeHeight: {
            name: "Tree Height",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Calculates the height of a binary tree.",
            code: {
                javascript: `function treeHeight(root) {
    if (!root) return -1;
    return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
}`,
                python: `def tree_height(root):
    if not root:
        return -1
    return 1 + max(tree_height(root.left), tree_height(root.right))`
            }
        },
        treeDiameter: {
            name: "Tree Diameter",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Finds the diameter (longest path) of a binary tree.",
            code: {
                javascript: `function diameterOfBinaryTree(root) {
    let max = 0;
    function dfs(node) {
        if (!node) return 0;
        const left = dfs(node.left);
        const right = dfs(node.right);
        max = Math.max(max, left + right);
        return 1 + Math.max(left, right);
    }
    dfs(root);
    return max;
}`,
                python: `def diameter_of_binary_tree(root):
    max_diameter = 0
    def dfs(node):
        nonlocal max_diameter
        if not node:
            return 0
        left = dfs(node.left)
        right = dfs(node.right)
        max_diameter = max(max_diameter, left + right)
        return 1 + max(left, right)
    dfs(root)
    return max_diameter`
            }
        },
        isBalanced: {
            name: "Check Balanced Tree",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Checks if a binary tree is height-balanced.",
            code: {
                javascript: `function isBalanced(root) {
    function check(node) {
        if (!node) return [true, 0];
        const [leftBal, leftH] = check(node.left);
        const [rightBal, rightH] = check(node.right);
        const balanced = leftBal && rightBal && Math.abs(leftH - rightH) <= 1;
        return [balanced, 1 + Math.max(leftH, rightH)];
    }
    return check(root)[0];
}`,
                python: `def is_balanced(root):
    def check(node):
        if not node:
            return True, 0
        left_bal, left_h = check(node.left)
        right_bal, right_h = check(node.right)
        balanced = left_bal and right_bal and abs(left_h - right_h) <= 1
        return balanced, 1 + max(left_h, right_h)
    return check(root)[0]`
            }
        },
        maxPathSum: {
            name: "Maximum Path Sum",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(h)" },
            description: "Finds the maximum path sum in a binary tree.",
            code: {
                javascript: `function maxPathSum(root) {
    let max = -Infinity;
    function dfs(node) {
        if (!node) return 0;
        const left = Math.max(0, dfs(node.left));
        const right = Math.max(0, dfs(node.right));
        max = Math.max(max, node.val + left + right);
        return node.val + Math.max(left, right);
    }
    dfs(root);
    return max;
}`,
                python: `def max_path_sum(root):
    max_sum = float('-inf')
    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0
        left = max(0, dfs(node.left))
        right = max(0, dfs(node.right))
        max_sum = max(max_sum, node.val + left + right)
        return node.val + max(left, right)
    dfs(root)
    return max_sum`
            }
        },
        serializeTree: {
            name: "Serialize/Deserialize",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
            description: "Serializes and deserializes a binary tree.",
            code: {
                javascript: `function serialize(root) {
    const result = [];
    function dfs(node) {
        if (!node) {
            result.push('null');
            return;
        }
        result.push(node.val.toString());
        dfs(node.left);
        dfs(node.right);
    }
    dfs(root);
    return result.join(',');
}`,
                python: `def serialize(root):
    result = []
    def dfs(node):
        if not node:
            result.append('None')
            return
        result.append(str(node.val))
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return ','.join(result)`
            }
        },
        zigzagTraversal: {
            name: "Zigzag Level Order",
            category: "trees",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
            description: "Traverses tree in zigzag pattern (left-right, right-left).",
            code: {
                javascript: `function zigzagLevelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    let leftToRight = true;
    while (queue.length) {
        const level = [];
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (leftToRight) level.push(node.val);
            else level.unshift(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
        leftToRight = !leftToRight;
    }
    return result;
}`,
                python: `from collections import deque

def zigzag_level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    left_to_right = True
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            if left_to_right:
                level.append(node.val)
            else:
                level.insert(0, node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
        left_to_right = not left_to_right
    return result`
            }
        }
    }
};

// Language display names
const LANGUAGES = {
    javascript: { name: 'JavaScript', icon: '🟨', color: '#f7df1e' },
    python: { name: 'Python', icon: '🐍', color: '#3776ab' },
    java: { name: 'Java', icon: '☕', color: '#007396' },
    cpp: { name: 'C++', icon: '⚡', color: '#00599c' },
    csharp: { name: 'C#', icon: '🟣', color: '#239120' },
    go: { name: 'Go', icon: '🐹', color: '#00add8' },
    rust: { name: 'Rust', icon: '🦀', color: '#dea584' },
    typescript: { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
    ruby: { name: 'Ruby', icon: '💎', color: '#cc342d' },
    swift: { name: 'Swift', icon: '🍎', color: '#fa7343' },
    kotlin: { name: 'Kotlin', icon: '🎯', color: '#7f52ff' },
    c: { name: 'C', icon: '🔵', color: '#a8b9cc' }
};

// Get all algorithms as flat array
function getAllAlgorithms() {
    const all = [];
    for (const category in ALGORITHMS) {
        for (const key in ALGORITHMS[category]) {
            all.push({ key, ...ALGORITHMS[category][key] });
        }
    }
    return all;
}

// Get algorithms by category
function getAlgorithmsByCategory(category) {
    return ALGORITHMS[category] || {};
}

// Get specific algorithm
function getAlgorithm(category, key) {
    return ALGORITHMS[category]?.[key];
}

