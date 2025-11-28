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
        },
        bucketSort: {
            name: "Bucket Sort",
            category: "sorting",
            complexity: { best: "O(n+k)", avg: "O(n+k)", worst: "O(n²)", space: "O(n+k)" },
            description: "Distributes elements into buckets, sorts each bucket, then concatenates.",
            code: {
                node: `function bucketSort(arr) {
    const n = arr.length;
    if (n <= 0) return arr;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketCount = n;
    const buckets = Array(bucketCount).fill(null).map(() => []);
    const bucketSize = (max - min) / bucketCount;
    
    for (let num of arr) {
        const bucketIndex = Math.floor((num - min) / bucketSize);
        const idx = bucketIndex === bucketCount ? bucketCount - 1 : bucketIndex;
        buckets[idx].push(num);
    }
    
    for (let bucket of buckets) {
        bucket.sort((a, b) => a - b);
    }
    
    return buckets.flat();
}`,
                python: `def bucket_sort(arr):
    n = len(arr)
    if n <= 0:
        return arr
    max_val, min_val = max(arr), min(arr)
    bucket_count = n
    buckets = [[] for _ in range(bucket_count)]
    bucket_size = (max_val - min_val) / bucket_count
    
    for num in arr:
        idx = int((num - min_val) / bucket_size)
        idx = min(idx, bucket_count - 1)
        buckets[idx].append(num)
    
    for bucket in buckets:
        bucket.sort()
    
    return [num for bucket in buckets for num in bucket]`,
                java: `public static void bucketSort(double[] arr) {
    int n = arr.length;
    if (n <= 0) return;
    double max = Arrays.stream(arr).max().getAsDouble();
    double min = Arrays.stream(arr).min().getAsDouble();
    int bucketCount = n;
    List<List<Double>> buckets = new ArrayList<>();
    for (int i = 0; i < bucketCount; i++) {
        buckets.add(new ArrayList<>());
    }
    double bucketSize = (max - min) / bucketCount;
    
    for (double num : arr) {
        int idx = (int) ((num - min) / bucketSize);
        idx = Math.min(idx, bucketCount - 1);
        buckets.get(idx).add(num);
    }
    
    for (List<Double> bucket : buckets) {
        Collections.sort(bucket);
    }
    
    int index = 0;
    for (List<Double> bucket : buckets) {
        for (double num : bucket) {
            arr[index++] = num;
        }
    }
}`,
                cpp: `void bucketSort(vector<double>& arr) {
    int n = arr.size();
    if (n <= 0) return;
    double maxVal = *max_element(arr.begin(), arr.end());
    double minVal = *min_element(arr.begin(), arr.end());
    int bucketCount = n;
    vector<vector<double>> buckets(bucketCount);
    double bucketSize = (maxVal - minVal) / bucketCount;
    
    for (double num : arr) {
        int idx = (int)((num - minVal) / bucketSize);
        idx = min(idx, bucketCount - 1);
        buckets[idx].push_back(num);
    }
    
    for (auto& bucket : buckets) {
        sort(bucket.begin(), bucket.end());
    }
    
    int index = 0;
    for (auto& bucket : buckets) {
        for (double num : bucket) {
            arr[index++] = num;
        }
    }
}`,
                csharp: `public static void BucketSort(double[] arr) {
    int n = arr.Length;
    if (n <= 0) return;
    double max = arr.Max();
    double min = arr.Min();
    int bucketCount = n;
    List<List<double>> buckets = new List<List<double>>();
    for (int i = 0; i < bucketCount; i++) {
        buckets.Add(new List<double>());
    }
    double bucketSize = (max - min) / bucketCount;
    
    foreach (double num in arr) {
        int idx = (int)((num - min) / bucketSize);
        idx = Math.Min(idx, bucketCount - 1);
        buckets[idx].Add(num);
    }
    
    foreach (var bucket in buckets) {
        bucket.Sort();
    }
    
    int index = 0;
    foreach (var bucket in buckets) {
        foreach (double num in bucket) {
            arr[index++] = num;
        }
    }
}`
            }
        },
        cocktailSort: {
            name: "Cocktail Sort",
            category: "sorting",
            complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
            description: "Bidirectional bubble sort that sorts in both directions.",
            code: {
                node: `function cocktailSort(arr) {
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;
    
    while (swapped) {
        swapped = false;
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (let i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        start++;
    }
    return arr;
}`,
                python: `def cocktail_sort(arr):
    swapped = True
    start = 0
    end = len(arr) - 1
    
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped:
            break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1
    return arr`,
                java: `public static void cocktailSort(int[] arr) {
    boolean swapped = true;
    int start = 0;
    int end = arr.length - 1;
    
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        start++;
    }
}`,
                cpp: `void cocktailSort(vector<int>& arr) {
    bool swapped = true;
    int start = 0;
    int end = arr.size() - 1;
    
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }
        start++;
    }
}`
            }
        },
        combSort: {
            name: "Comb Sort",
            category: "sorting",
            complexity: { best: "O(n log n)", avg: "O(n²/2^p)", worst: "O(n²)", space: "O(1)" },
            description: "Improvement over bubble sort using gap sequence.",
            code: {
                node: `function combSort(arr) {
    const shrink = 1.3;
    let gap = arr.length;
    let sorted = false;
    
    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }
        for (let i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                sorted = false;
            }
        }
    }
    return arr;
}`,
                python: `def comb_sort(arr):
    shrink = 1.3
    gap = len(arr)
    sorted_flag = False
    
    while not sorted_flag:
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted_flag = True
        for i in range(len(arr) - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                sorted_flag = False
    return arr`,
                java: `public static void combSort(int[] arr) {
    double shrink = 1.3;
    int gap = arr.length;
    boolean sorted = false;
    
    while (!sorted) {
        gap = (int)(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }
        for (int i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                int temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                sorted = false;
            }
        }
    }
}`,
                cpp: `void combSort(vector<int>& arr) {
    double shrink = 1.3;
    int gap = arr.size();
    bool sorted = false;
    
    while (!sorted) {
        gap = (int)(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }
        for (int i = 0; i + gap < arr.size(); i++) {
            if (arr[i] > arr[i + gap]) {
                swap(arr[i], arr[i + gap]);
                sorted = false;
            }
        }
    }
}`
            }
        },
        cycleSort: {
            name: "Cycle Sort",
            category: "sorting",
            complexity: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
            description: "In-place unstable sorting algorithm with minimal writes.",
            code: {
                node: `function cycleSort(arr) {
    let writes = 0;
    for (let cycleStart = 0; cycleStart < arr.length - 1; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;
        for (let i = cycleStart + 1; i < arr.length; i++) {
            if (arr[i] < item) pos++;
        }
        if (pos === cycleStart) continue;
        while (item === arr[pos]) pos++;
        [arr[pos], item] = [item, arr[pos]];
        writes++;
        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < arr.length; i++) {
                if (arr[i] < item) pos++;
            }
            while (item === arr[pos]) pos++;
            [arr[pos], item] = [item, arr[pos]];
            writes++;
        }
    }
    return arr;
}`,
                python: `def cycle_sort(arr):
    writes = 0
    for cycle_start in range(len(arr) - 1):
        item = arr[cycle_start]
        pos = cycle_start
        for i in range(cycle_start + 1, len(arr)):
            if arr[i] < item:
                pos += 1
        if pos == cycle_start:
            continue
        while item == arr[pos]:
            pos += 1
        arr[pos], item = item, arr[pos]
        writes += 1
        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, len(arr)):
                if arr[i] < item:
                    pos += 1
            while item == arr[pos]:
                pos += 1
            arr[pos], item = item, arr[pos]
            writes += 1
    return arr`,
                java: `public static void cycleSort(int[] arr) {
    int writes = 0;
    for (int cycleStart = 0; cycleStart < arr.length - 1; cycleStart++) {
        int item = arr[cycleStart];
        int pos = cycleStart;
        for (int i = cycleStart + 1; i < arr.length; i++) {
            if (arr[i] < item) pos++;
        }
        if (pos == cycleStart) continue;
        while (item == arr[pos]) pos++;
        int temp = arr[pos];
        arr[pos] = item;
        item = temp;
        writes++;
        while (pos != cycleStart) {
            pos = cycleStart;
            for (int i = cycleStart + 1; i < arr.length; i++) {
                if (arr[i] < item) pos++;
            }
            while (item == arr[pos]) pos++;
            temp = arr[pos];
            arr[pos] = item;
            item = temp;
            writes++;
        }
    }
}`,
                cpp: `void cycleSort(vector<int>& arr) {
    int writes = 0;
    for (int cycleStart = 0; cycleStart < arr.size() - 1; cycleStart++) {
        int item = arr[cycleStart];
        int pos = cycleStart;
        for (int i = cycleStart + 1; i < arr.size(); i++) {
            if (arr[i] < item) pos++;
        }
        if (pos == cycleStart) continue;
        while (item == arr[pos]) pos++;
        swap(arr[pos], item);
        writes++;
        while (pos != cycleStart) {
            pos = cycleStart;
            for (int i = cycleStart + 1; i < arr.size(); i++) {
                if (arr[i] < item) pos++;
            }
            while (item == arr[pos]) pos++;
            swap(arr[pos], item);
            writes++;
        }
    }
}`
            }
        },
        gnomeSort: {
            name: "Gnome Sort",
            category: "sorting",
            complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
            description: "Simple sorting algorithm similar to insertion sort.",
            code: {
                node: `function gnomeSort(arr) {
    let index = 0;
    while (index < arr.length) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            index--;
        }
    }
    return arr;
}`,
                python: `def gnome_sort(arr):
    index = 0
    while index < len(arr):
        if index == 0 or arr[index] >= arr[index - 1]:
            index += 1
        else:
            arr[index], arr[index - 1] = arr[index - 1], arr[index]
            index -= 1
    return arr`,
                java: `public static void gnomeSort(int[] arr) {
    int index = 0;
    while (index < arr.length) {
        if (index == 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            int temp = arr[index];
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;
            index--;
        }
    }
}`,
                cpp: `void gnomeSort(vector<int>& arr) {
    int index = 0;
    while (index < arr.size()) {
        if (index == 0 || arr[index] >= arr[index - 1]) {
            index++;
        } else {
            swap(arr[index], arr[index - 1]);
            index--;
        }
    }
}`
            }
        },
        pancakeSort: {
            name: "Pancake Sort",
            category: "sorting",
            complexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
            description: "Sorts array by flipping prefixes, like flipping pancakes.",
            code: {
                node: `function pancakeSort(arr) {
    for (let currSize = arr.length; currSize > 1; currSize--) {
        let maxIdx = 0;
        for (let i = 0; i < currSize; i++) {
            if (arr[i] > arr[maxIdx]) maxIdx = i;
        }
        if (maxIdx !== currSize - 1) {
            flip(arr, maxIdx);
            flip(arr, currSize - 1);
        }
    }
    return arr;
}

function flip(arr, k) {
    let start = 0;
    while (start < k) {
        [arr[start], arr[k]] = [arr[k], arr[start]];
        start++;
        k--;
    }
}`,
                python: `def pancake_sort(arr):
    def flip(arr, k):
        start = 0
        while start < k:
            arr[start], arr[k] = arr[k], arr[start]
            start += 1
            k -= 1
    
    for curr_size in range(len(arr), 1, -1):
        max_idx = 0
        for i in range(curr_size):
            if arr[i] > arr[max_idx]:
                max_idx = i
        if max_idx != curr_size - 1:
            flip(arr, max_idx)
            flip(arr, curr_size - 1)
    return arr`,
                java: `public static void pancakeSort(int[] arr) {
    for (int currSize = arr.length; currSize > 1; currSize--) {
        int maxIdx = 0;
        for (int i = 0; i < currSize; i++) {
            if (arr[i] > arr[maxIdx]) maxIdx = i;
        }
        if (maxIdx != currSize - 1) {
            flip(arr, maxIdx);
            flip(arr, currSize - 1);
        }
    }
}

static void flip(int[] arr, int k) {
    int start = 0;
    while (start < k) {
        int temp = arr[start];
        arr[start] = arr[k];
        arr[k] = temp;
        start++;
        k--;
    }
}`,
                cpp: `void pancakeSort(vector<int>& arr) {
    for (int currSize = arr.size(); currSize > 1; currSize--) {
        int maxIdx = 0;
        for (int i = 0; i < currSize; i++) {
            if (arr[i] > arr[maxIdx]) maxIdx = i;
        }
        if (maxIdx != currSize - 1) {
            flip(arr, maxIdx);
            flip(arr, currSize - 1);
        }
    }
}

void flip(vector<int>& arr, int k) {
    int start = 0;
    while (start < k) {
        swap(arr[start], arr[k]);
        start++;
        k--;
    }
}`
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
        },
        bellmanFord: {
            name: "Bellman-Ford Algorithm",
            category: "graphs",
            complexity: { best: "O(VE)", avg: "O(VE)", worst: "O(VE)", space: "O(V)" },
            description: "Finds shortest paths from source, handles negative weights.",
            code: {
                node: `function bellmanFord(graph, start) {
    const dist = {};
    const prev = {};
    for (const node in graph) {
        dist[node] = Infinity;
        prev[node] = null;
    }
    dist[start] = 0;
    
    for (let i = 0; i < Object.keys(graph).length - 1; i++) {
        for (const u in graph) {
            for (const [v, weight] of graph[u] || []) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    prev[v] = u;
                }
            }
        }
    }
    return { dist, prev };
}`,
                python: `def bellman_ford(graph, start):
    dist = {node: float('inf') for node in graph}
    prev = {node: None for node in graph}
    dist[start] = 0
    
    for _ in range(len(graph) - 1):
        for u in graph:
            for v, weight in graph.get(u, []):
                if dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight
                    prev[v] = u
    return dist, prev`,
                java: `public Map<Integer, Integer> bellmanFord(Map<Integer, List<int[]>> graph, int start) {
    Map<Integer, Integer> dist = new HashMap<>();
    for (int node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
    dist.put(start, 0);
    
    for (int i = 0; i < graph.size() - 1; i++) {
        for (int u : graph.keySet()) {
            for (int[] edge : graph.getOrDefault(u, List.of())) {
                int v = edge[0], weight = edge[1];
                if (dist.get(u) != Integer.MAX_VALUE && dist.get(u) + weight < dist.get(v)) {
                    dist.put(v, dist.get(u) + weight);
                }
            }
        }
    }
    return dist;
}`,
                cpp: `#include <vector>
#include <map>
#include <climits>

std::map<int, int> bellmanFord(std::map<int, std::vector<std::pair<int, int>>>& graph, int start) {
    std::map<int, int> dist;
    for (auto& node : graph) dist[node.first] = INT_MAX;
    dist[start] = 0;
    
    for (int i = 0; i < graph.size() - 1; i++) {
        for (auto& [u, edges] : graph) {
            for (auto& [v, weight] : edges) {
                if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }
    return dist;
}`,
                csharp: `using System.Collections.Generic;

public Dictionary<int, int> BellmanFord(Dictionary<int, List<(int, int)>> graph, int start) {
    var dist = new Dictionary<int, int>();
    foreach (var node in graph.Keys) dist[node] = int.MaxValue;
    dist[start] = 0;
    
    for (int i = 0; i < graph.Count - 1; i++) {
        foreach (var u in graph.Keys) {
            foreach (var (v, weight) in graph[u]) {
                if (dist[u] != int.MaxValue && dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }
    return dist;
}`,
                go: `func bellmanFord(graph map[int][]Edge, start int) map[int]int {
    dist := make(map[int]int)
    for node := range graph {
        dist[node] = math.MaxInt32
    }
    dist[start] = 0
    
    for i := 0; i < len(graph)-1; i++ {
        for u, edges := range graph {
            for _, edge := range edges {
                if dist[u] != math.MaxInt32 && dist[u]+edge.weight < dist[edge.to] {
                    dist[edge.to] = dist[u] + edge.weight
                }
            }
        }
    }
    return dist
}`,
                rust: `use std::collections::HashMap;

fn bellman_ford(graph: &HashMap<usize, Vec<(usize, i32)>>, start: usize) -> HashMap<usize, i32> {
    let mut dist: HashMap<usize, i32> = graph.keys().map(|&k| (k, i32::MAX)).collect();
    dist.insert(start, 0);
    
    for _ in 0..graph.len() - 1 {
        for (u, edges) in graph {
            for &(v, weight) in edges {
                if dist[u] != i32::MAX && dist[u] + weight < dist[&v] {
                    *dist.get_mut(&v).unwrap() = dist[u] + weight;
                }
            }
        }
    }
    dist
}`,
                typescript: `function bellmanFord(graph: Record<number, [number, number][]>, start: number): Record<number, number> {
    const dist: Record<number, number> = {};
    for (const node in graph) dist[node] = Infinity;
    dist[start] = 0;
    
    for (let i = 0; i < Object.keys(graph).length - 1; i++) {
        for (const u in graph) {
            for (const [v, weight] of graph[u] || []) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }
    return dist;
}`,
                deno: `function bellmanFord(graph: Record<number, [number, number][]>, start: number): Record<number, number> {
    const dist: Record<number, number> = {};
    for (const node in graph) dist[node] = Infinity;
    dist[start] = 0;
    
    for (let i = 0; i < Object.keys(graph).length - 1; i++) {
        for (const u in graph) {
            for (const [v, weight] of graph[u] || []) {
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                }
            }
        }
    }
    return dist;
}`
            }
        },
        tarjan: {
            name: "Tarjan's SCC",
            category: "graphs",
            complexity: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
            description: "Finds strongly connected components in directed graph.",
            code: {
                node: `function tarjan(graph) {
    let index = 0;
    const stack = [];
    const indices = {};
    const lowlinks = {};
    const onStack = {};
    const sccs = [];
    
    function strongConnect(v) {
        indices[v] = index;
        lowlinks[v] = index;
        index++;
        stack.push(v);
        onStack[v] = true;
        
        for (const w of graph[v] || []) {
            if (indices[w] === undefined) {
                strongConnect(w);
                lowlinks[v] = Math.min(lowlinks[v], lowlinks[w]);
            } else if (onStack[w]) {
                lowlinks[v] = Math.min(lowlinks[v], indices[w]);
            }
        }
        
        if (lowlinks[v] === indices[v]) {
            const scc = [];
            let w;
            do {
                w = stack.pop();
                onStack[w] = false;
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    }
    
    for (const node in graph) {
        if (indices[node] === undefined) {
            strongConnect(node);
        }
    }
    return sccs;
}`,
                python: `def tarjan(graph):
    index = 0
    stack = []
    indices = {}
    lowlinks = {}
    on_stack = {}
    sccs = []
    
    def strong_connect(v):
        nonlocal index
        indices[v] = index
        lowlinks[v] = index
        index += 1
        stack.append(v)
        on_stack[v] = True
        
        for w in graph.get(v, []):
            if w not in indices:
                strong_connect(w)
                lowlinks[v] = min(lowlinks[v], lowlinks[w])
            elif on_stack[w]:
                lowlinks[v] = min(lowlinks[v], indices[w])
        
        if lowlinks[v] == indices[v]:
            scc = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                scc.append(w)
                if w == v:
                    break
            sccs.append(scc)
    
    for node in graph:
        if node not in indices:
            strong_connect(node)
    return sccs`,
                java: `public List<List<Integer>> tarjan(Map<Integer, List<Integer>> graph) {
    int[] index = {0};
    Stack<Integer> stack = new Stack<>();
    Map<Integer, Integer> indices = new HashMap<>();
    Map<Integer, Integer> lowlinks = new HashMap<>();
    Set<Integer> onStack = new HashSet<>();
    List<List<Integer>> sccs = new ArrayList<>();
    
    for (int node : graph.keySet()) {
        if (!indices.containsKey(node)) {
            strongConnect(node, graph, index, stack, indices, lowlinks, onStack, sccs);
        }
    }
    return sccs;
}

private void strongConnect(int v, Map<Integer, List<Integer>> graph, int[] index, 
    Stack<Integer> stack, Map<Integer, Integer> indices, Map<Integer, Integer> lowlinks,
    Set<Integer> onStack, List<List<Integer>> sccs) {
    indices.put(v, index[0]);
    lowlinks.put(v, index[0]);
    index[0]++;
    stack.push(v);
    onStack.add(v);
    
    for (int w : graph.getOrDefault(v, List.of())) {
        if (!indices.containsKey(w)) {
            strongConnect(w, graph, index, stack, indices, lowlinks, onStack, sccs);
            lowlinks.put(v, Math.min(lowlinks.get(v), lowlinks.get(w)));
        } else if (onStack.contains(w)) {
            lowlinks.put(v, Math.min(lowlinks.get(v), indices.get(w)));
        }
    }
    
    if (lowlinks.get(v).equals(indices.get(v))) {
        List<Integer> scc = new ArrayList<>();
        int w;
        do {
            w = stack.pop();
            onStack.remove(w);
            scc.add(w);
        } while (w != v);
        sccs.add(scc);
    }
}`,
                cpp: `#include <vector>
#include <stack>
#include <map>
#include <algorithm>

std::vector<std::vector<int>> tarjan(std::map<int, std::vector<int>>& graph) {
    int index = 0;
    std::stack<int> stack;
    std::map<int, int> indices, lowlinks;
    std::map<int, bool> onStack;
    std::vector<std::vector<int>> sccs;
    
    std::function<void(int)> strongConnect = [&](int v) {
        indices[v] = index;
        lowlinks[v] = index++;
        stack.push(v);
        onStack[v] = true;
        
        for (int w : graph[v]) {
            if (indices.find(w) == indices.end()) {
                strongConnect(w);
                lowlinks[v] = std::min(lowlinks[v], lowlinks[w]);
            } else if (onStack[w]) {
                lowlinks[v] = std::min(lowlinks[v], indices[w]);
            }
        }
        
        if (lowlinks[v] == indices[v]) {
            std::vector<int> scc;
            int w;
            do {
                w = stack.top();
                stack.pop();
                onStack[w] = false;
                scc.push_back(w);
            } while (w != v);
            sccs.push_back(scc);
        }
    };
    
    for (auto& [node, _] : graph) {
        if (indices.find(node) == indices.end()) {
            strongConnect(node);
        }
    }
    return sccs;
}`,
                csharp: `using System.Collections.Generic;
using System.Linq;

public List<List<int>> Tarjan(Dictionary<int, List<int>> graph) {
    int index = 0;
    var stack = new Stack<int>();
    var indices = new Dictionary<int, int>();
    var lowlinks = new Dictionary<int, int>();
    var onStack = new HashSet<int>();
    var sccs = new List<List<int>>();
    
    void StrongConnect(int v) {
        indices[v] = index;
        lowlinks[v] = index++;
        stack.Push(v);
        onStack.Add(v);
        
        foreach (int w in graph.GetValueOrDefault(v, new List<int>())) {
            if (!indices.ContainsKey(w)) {
                StrongConnect(w);
                lowlinks[v] = Math.Min(lowlinks[v], lowlinks[w]);
            } else if (onStack.Contains(w)) {
                lowlinks[v] = Math.Min(lowlinks[v], indices[w]);
            }
        }
        
        if (lowlinks[v] == indices[v]) {
            var scc = new List<int>();
            int w;
            do {
                w = stack.Pop();
                onStack.Remove(w);
                scc.Add(w);
            } while (w != v);
            sccs.Add(scc);
        }
    }
    
    foreach (int node in graph.Keys) {
        if (!indices.ContainsKey(node)) {
            StrongConnect(node);
        }
    }
    return sccs;
}`,
                go: `func tarjan(graph map[int][]int) [][]int {
    index := 0
    stack := []int{}
    indices := make(map[int]int)
    lowlinks := make(map[int]int)
    onStack := make(map[int]bool)
    var sccs [][]int
    
    var strongConnect func(int)
    strongConnect = func(v int) {
        indices[v] = index
        lowlinks[v] = index
        index++
        stack = append(stack, v)
        onStack[v] = true
        
        for _, w := range graph[v] {
            if _, exists := indices[w]; !exists {
                strongConnect(w)
                if lowlinks[w] < lowlinks[v] {
                    lowlinks[v] = lowlinks[w]
                }
            } else if onStack[w] {
                if indices[w] < lowlinks[v] {
                    lowlinks[v] = indices[w]
                }
            }
        }
        
        if lowlinks[v] == indices[v] {
            scc := []int{}
            for {
                w := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                onStack[w] = false
                scc = append(scc, w)
                if w == v {
                    break
                }
            }
            sccs = append(sccs, scc)
        }
    }
    
    for node := range graph {
        if _, exists := indices[node]; !exists {
            strongConnect(node)
        }
    }
    return sccs
}`,
                rust: `use std::collections::{HashMap, VecDeque};

fn tarjan(graph: &HashMap<usize, Vec<usize>>) -> Vec<Vec<usize>> {
    let mut index = 0;
    let mut stack = Vec::new();
    let mut indices = HashMap::new();
    let mut lowlinks = HashMap::new();
    let mut on_stack = HashMap::new();
    let mut sccs = Vec::new();
    
    fn strong_connect(
        v: usize,
        graph: &HashMap<usize, Vec<usize>>,
        index: &mut usize,
        stack: &mut Vec<usize>,
        indices: &mut HashMap<usize, usize>,
        lowlinks: &mut HashMap<usize, usize>,
        on_stack: &mut HashMap<usize, bool>,
        sccs: &mut Vec<Vec<usize>>,
    ) {
        indices.insert(v, *index);
        lowlinks.insert(v, *index);
        *index += 1;
        stack.push(v);
        on_stack.insert(v, true);
        
        for &w in graph.get(&v).unwrap_or(&Vec::new()) {
            if !indices.contains_key(&w) {
                strong_connect(w, graph, index, stack, indices, lowlinks, on_stack, sccs);
                let lowlink_w = *lowlinks.get(&w).unwrap();
                let lowlink_v = *lowlinks.get(&v).unwrap();
                lowlinks.insert(v, lowlink_v.min(lowlink_w));
            } else if *on_stack.get(&w).unwrap_or(&false) {
                let idx_w = *indices.get(&w).unwrap();
                let lowlink_v = *lowlinks.get(&v).unwrap();
                lowlinks.insert(v, lowlink_v.min(idx_w));
            }
        }
        
        if lowlinks.get(&v) == indices.get(&v) {
            let mut scc = Vec::new();
            loop {
                let w = stack.pop().unwrap();
                on_stack.insert(w, false);
                scc.push(w);
                if w == v {
                    break;
                }
            }
            sccs.push(scc);
        }
    }
    
    for node in graph.keys() {
        if !indices.contains_key(node) {
            strong_connect(*node, graph, &mut index, &mut stack, &mut indices, 
                &mut lowlinks, &mut on_stack, &mut sccs);
        }
    }
    sccs
}`,
                typescript: `function tarjan(graph: Record<number, number[]>): number[][] {
    let index = 0;
    const stack: number[] = [];
    const indices: Record<number, number> = {};
    const lowlinks: Record<number, number> = {};
    const onStack: Record<number, boolean> = {};
    const sccs: number[][] = [];
    
    function strongConnect(v: number): void {
        indices[v] = index;
        lowlinks[v] = index++;
        stack.push(v);
        onStack[v] = true;
        
        for (const w of graph[v] || []) {
            if (indices[w] === undefined) {
                strongConnect(w);
                lowlinks[v] = Math.min(lowlinks[v], lowlinks[w]);
            } else if (onStack[w]) {
                lowlinks[v] = Math.min(lowlinks[v], indices[w]);
            }
        }
        
        if (lowlinks[v] === indices[v]) {
            const scc: number[] = [];
            let w: number;
            do {
                w = stack.pop()!;
                onStack[w] = false;
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    }
    
    for (const node in graph) {
        if (indices[node] === undefined) {
            strongConnect(Number(node));
        }
    }
    return sccs;
}`,
                deno: `function tarjan(graph: Record<number, number[]>): number[][] {
    let index = 0;
    const stack: number[] = [];
    const indices: Record<number, number> = {};
    const lowlinks: Record<number, number> = {};
    const onStack: Record<number, boolean> = {};
    const sccs: number[][] = [];
    
    function strongConnect(v: number): void {
        indices[v] = index;
        lowlinks[v] = index++;
        stack.push(v);
        onStack[v] = true;
        
        for (const w of graph[v] || []) {
            if (indices[w] === undefined) {
                strongConnect(w);
                lowlinks[v] = Math.min(lowlinks[v], lowlinks[w]);
            } else if (onStack[w]) {
                lowlinks[v] = Math.min(lowlinks[v], indices[w]);
            }
        }
        
        if (lowlinks[v] === indices[v]) {
            const scc: number[] = [];
            let w: number;
            do {
                w = stack.pop()!;
                onStack[w] = false;
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    }
    
    for (const node in graph) {
        if (indices[node] === undefined) {
            strongConnect(Number(node));
        }
    }
    return sccs;
}`
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
        },
        lcm: {
            name: "LCM (Least Common Multiple)",
            category: "math",
            complexity: { best: "O(1)", avg: "O(log min(a,b))", worst: "O(log min(a,b))", space: "O(1)" },
            description: "Finds least common multiple of two numbers using GCD.",
            code: {
                node: `function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}`,
                python: `def lcm(a, b):
    return abs(a * b) // gcd(a, b)

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a`,
                java: `public static int lcm(int a, int b) {
    return Math.abs(a * b) / gcd(a, b);
}

public static int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
                cpp: `int lcm(int a, int b) {
    return abs(a * b) / gcd(a, b);
}

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
                csharp: `public static int Lcm(int a, int b) {
    return Math.Abs(a * b) / Gcd(a, b);
}

public static int Gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`
            }
        },
        factorial: {
            name: "Factorial",
            category: "math",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
            description: "Computes factorial of n (n!).",
            code: {
                node: `function factorial(n) {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
                python: `def factorial(n):
    if n <= 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`,
                java: `public static long factorial(int n) {
    if (n <= 1) return 1;
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
                cpp: `long long factorial(int n) {
    if (n <= 1) return 1;
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
                csharp: `public static long Factorial(int n) {
    if (n <= 1) return 1;
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`
            }
        },
        primeCheck: {
            name: "Prime Number Check",
            category: "math",
            complexity: { best: "O(1)", avg: "O(√n)", worst: "O(√n)", space: "O(1)" },
            description: "Checks if a number is prime using trial division.",
            code: {
                node: `function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}`,
                python: `def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True`,
                java: `public static boolean isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}`,
                cpp: `bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}`,
                csharp: `public static bool IsPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}`
            }
        },
        fibonacciIterative: {
            name: "Fibonacci (Iterative)",
            category: "math",
            complexity: { best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
            description: "Computes nth Fibonacci number iteratively.",
            code: {
                node: `function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}`,
                python: `def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b
    return b`,
                java: `public static long fibonacci(int n) {
    if (n <= 1) return n;
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
                cpp: `long long fibonacci(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
                csharp: `public static long Fibonacci(int n) {
    if (n <= 1) return n;
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`
            }
        },
        matrixMultiplication: {
            name: "Matrix Multiplication",
            category: "math",
            complexity: { best: "O(n³)", avg: "O(n³)", worst: "O(n³)", space: "O(n²)" },
            description: "Multiplies two matrices of compatible dimensions.",
            code: {
                node: `function matrixMultiply(A, B) {
    const rowsA = A.length;
    const colsA = A[0].length;
    const colsB = B[0].length;
    const result = Array(rowsA).fill(0).map(() => Array(colsB).fill(0));
    
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}`,
                python: `def matrix_multiply(A, B):
    rowsA, colsA = len(A), len(A[0])
    colsB = len(B[0])
    result = [[0] * colsB for _ in range(rowsA)]
    
    for i in range(rowsA):
        for j in range(colsB):
            for k in range(colsA):
                result[i][j] += A[i][k] * B[k][j]
    return result`,
                java: `public static int[][] matrixMultiply(int[][] A, int[][] B) {
    int rowsA = A.length;
    int colsA = A[0].length;
    int colsB = B[0].length;
    int[][] result = new int[rowsA][colsB];
    
    for (int i = 0; i < rowsA; i++) {
        for (int j = 0; j < colsB; j++) {
            for (int k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}`,
                cpp: `vector<vector<int>> matrixMultiply(vector<vector<int>>& A, vector<vector<int>>& B) {
    int rowsA = A.size();
    int colsA = A[0].size();
    int colsB = B[0].size();
    vector<vector<int>> result(rowsA, vector<int>(colsB, 0));
    
    for (int i = 0; i < rowsA; i++) {
        for (int j = 0; j < colsB; j++) {
            for (int k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}`,
                csharp: `public static int[,] MatrixMultiply(int[,] A, int[,] B) {
    int rowsA = A.GetLength(0);
    int colsA = A.GetLength(1);
    int colsB = B.GetLength(1);
    int[,] result = new int[rowsA, colsB];
    
    for (int i = 0; i < rowsA; i++) {
        for (int j = 0; j < colsB; j++) {
            for (int k = 0; k < colsA; k++) {
                result[i, j] += A[i, k] * B[k, j];
            }
        }
    }
    return result;
}`
            }
        },
        matrixDeterminant: {
            name: "Matrix Determinant",
            category: "math",
            complexity: { best: "O(n³)", avg: "O(n³)", worst: "O(n³)", space: "O(n²)" },
            description: "Computes determinant of a square matrix using cofactor expansion.",
            code: {
                node: `function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let col = 0; col < n; col++) {
        const minor = matrix.slice(1).map(row => row.filter((_, i) => i !== col));
        det += matrix[0][col] * Math.pow(-1, col) * determinant(minor);
    }
    return det;
}`,
                python: `def determinant(matrix):
    n = len(matrix)
    if n == 1:
        return matrix[0][0]
    if n == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    det = 0
    for col in range(n):
        minor = [row[:col] + row[col+1:] for row in matrix[1:]]
        det += matrix[0][col] * ((-1) ** col) * determinant(minor)
    return det`,
                java: `public static int determinant(int[][] matrix) {
    int n = matrix.length;
    if (n == 1) return matrix[0][0];
    if (n == 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    int det = 0;
    for (int col = 0; col < n; col++) {
        int[][] minor = getMinor(matrix, 0, col);
        det += matrix[0][col] * Math.pow(-1, col) * determinant(minor);
    }
    return det;
}

static int[][] getMinor(int[][] matrix, int row, int col) {
    int n = matrix.length;
    int[][] minor = new int[n-1][n-1];
    int r = 0;
    for (int i = 0; i < n; i++) {
        if (i == row) continue;
        int c = 0;
        for (int j = 0; j < n; j++) {
            if (j == col) continue;
            minor[r][c++] = matrix[i][j];
        }
        r++;
    }
    return minor;
}`,
                cpp: `int determinant(vector<vector<int>>& matrix) {
    int n = matrix.size();
    if (n == 1) return matrix[0][0];
    if (n == 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    int det = 0;
    for (int col = 0; col < n; col++) {
        vector<vector<int>> minor = getMinor(matrix, 0, col);
        det += matrix[0][col] * pow(-1, col) * determinant(minor);
    }
    return det;
}

vector<vector<int>> getMinor(vector<vector<int>>& matrix, int row, int col) {
    int n = matrix.size();
    vector<vector<int>> minor(n-1, vector<int>(n-1));
    int r = 0;
    for (int i = 0; i < n; i++) {
        if (i == row) continue;
        int c = 0;
        for (int j = 0; j < n; j++) {
            if (j == col) continue;
            minor[r][c++] = matrix[i][j];
        }
        r++;
    }
    return minor;
}`
            }
        },
        eulerTotient: {
            name: "Euler Totient Function",
            category: "math",
            complexity: { best: "O(√n)", avg: "O(√n)", worst: "O(√n)", space: "O(1)" },
            description: "Counts numbers up to n that are coprime with n.",
            code: {
                node: `function eulerTotient(n) {
    let result = n;
    for (let p = 2; p * p <= n; p++) {
        if (n % p === 0) {
            while (n % p === 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}`,
                python: `def euler_totient(n):
    result = n
    p = 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0:
                n //= p
            result -= result // p
        p += 1
    if n > 1:
        result -= result // n
    return result`,
                java: `public static int eulerTotient(int n) {
    int result = n;
    for (int p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}`,
                cpp: `int eulerTotient(int n) {
    int result = n;
    for (int p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}`,
                csharp: `public static int EulerTotient(int n) {
    int result = n;
    for (int p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}`
            }
        },
        extendedEuclidean: {
            name: "Extended Euclidean Algorithm",
            category: "math",
            complexity: { best: "O(1)", avg: "O(log min(a,b))", worst: "O(log min(a,b))", space: "O(1)" },
            description: "Finds GCD and coefficients x, y such that ax + by = gcd(a,b).",
            code: {
                node: `function extendedGCD(a, b) {
    if (a === 0) return { gcd: b, x: 0, y: 1 };
    const result = extendedGCD(b % a, a);
    return {
        gcd: result.gcd,
        x: result.y - Math.floor(b / a) * result.x,
        y: result.x
    };
}`,
                python: `def extended_gcd(a, b):
    if a == 0:
        return b, 0, 1
    gcd, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return gcd, x, y`,
                java: `public static int[] extendedGCD(int a, int b) {
    if (a == 0) {
        return new int[]{b, 0, 1};
    }
    int[] result = extendedGCD(b % a, a);
    int gcd = result[0];
    int x = result[2] - (b / a) * result[1];
    int y = result[1];
    return new int[]{gcd, x, y};
}`,
                cpp: `int extendedGCD(int a, int b, int& x, int& y) {
    if (a == 0) {
        x = 0;
        y = 1;
        return b;
    }
    int x1, y1;
    int gcd = extendedGCD(b % a, a, x1, y1);
    x = y1 - (b / a) * x1;
    y = x1;
    return gcd;
}`,
                csharp: `public static (int gcd, int x, int y) ExtendedGCD(int a, int b) {
    if (a == 0) {
        return (b, 0, 1);
    }
    var (gcd, x1, y1) = ExtendedGCD(b % a, a);
    int x = y1 - (b / a) * x1;
    int y = x1;
    return (gcd, x, y);
}`
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
    c: { name: 'C', icon: '🔵', color: '#a8b9cc' },
    node: { name: 'Node.js', icon: '🟢', color: '#339933' },
    deno: { name: 'Deno', icon: '🦕', color: '#000000' }
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

