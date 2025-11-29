// Playground Manager
class PlaygroundManager {
    constructor() {
        this.editor = null;
        this.output = null;
        this.language = 'javascript';
        this.originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info
        };
        this.languageTemplates = {
            javascript: {
                sorting: `// Bubble Sort
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

const arr = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', arr);
console.log('Sorted:', bubbleSort([...arr]));`,

            searching: `// Binary Search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 7;
const index = binarySearch(sortedArr, target);
console.log('Array:', sortedArr);
console.log('Target:', target);
console.log('Found at index:', index);`,

            recursion: `// Fibonacci with Recursion
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log('Fibonacci(10):', fibonacci(10));
console.log('Factorial(5):', factorial(5));

// Tower of Hanoi
function hanoi(n, from, to, aux) {
    if (n === 1) {
        console.log(\`Move disk 1 from \${from} to \${to}\`);
        return;
    }
    hanoi(n - 1, from, aux, to);
    console.log(\`Move disk \${n} from \${from} to \${to}\`);
    hanoi(n - 1, aux, to, from);
}

console.log('\\nTower of Hanoi (3 disks):');
hanoi(3, 'A', 'C', 'B');`,

            'data-structures': `// Stack Implementation
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        return this.items.pop();
    }
    
    peek() {
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}

// Queue Implementation
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
    }
    
    dequeue() {
        return this.items.shift();
    }
    
    front() {
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log('Stack:', stack.items);
console.log('Popped:', stack.pop());

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log('Queue:', queue.items);
console.log('Dequeued:', queue.dequeue());`,

            math: `// Greatest Common Divisor (GCD)
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// Least Common Multiple (LCM)
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Prime Check
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

console.log('GCD(48, 18):', gcd(48, 18));
console.log('LCM(12, 18):', lcm(12, 18));
console.log('Is 17 prime?', isPrime(17));
console.log('Is 20 prime?', isPrime(20));`,

            strings: `// Reverse String
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Palindrome Check
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// Count Vowels
function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    return str.split('').filter(char => vowels.includes(char)).length;
}

// Find Longest Word
function longestWord(str) {
    return str.split(' ').reduce((longest, word) => 
        word.length > longest.length ? word : longest, ''
    );
}

const text = 'Hello World Algorithm Universe';
console.log('Original:', text);
console.log('Reversed:', reverseString(text));
console.log('Is "racecar" palindrome?', isPalindrome('racecar'));
console.log('Vowel count:', countVowels(text));
console.log('Longest word:', longestWord(text));`
            },
            java: {
                sorting: `public class Main {
    public static void bubbleSort(int[] arr) {
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
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.print("Original: ");
        for (int num : arr) System.out.print(num + " ");
        System.out.println();
        
        bubbleSort(arr);
        System.out.print("Sorted: ");
        for (int num : arr) System.out.print(num + " ");
        System.out.println();
    }
}`,
                searching: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        int target = 7;
        int index = binarySearch(arr, target);
        System.out.println("Array: " + java.util.Arrays.toString(arr));
        System.out.println("Target: " + target);
        System.out.println("Found at index: " + index);
    }
}`,
                recursion: `public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println("Fibonacci(10): " + fibonacci(10));
        System.out.println("Factorial(5): " + factorial(5));
    }
}`,
                'data-structures': `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Stack
        Stack<Integer> stack = new Stack<>();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.println("Stack: " + stack);
        System.out.println("Popped: " + stack.pop());
        
        // Queue
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        System.out.println("Queue: " + queue);
        System.out.println("Dequeued: " + queue.poll());
    }
}`,
                math: `public class Main {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static int lcm(int a, int b) {
        return (a * b) / gcd(a, b);
    }
    
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println("GCD(48, 18): " + gcd(48, 18));
        System.out.println("LCM(12, 18): " + lcm(12, 18));
        System.out.println("Is 17 prime? " + isPrime(17));
        System.out.println("Is 20 prime? " + isPrime(20));
    }
}`,
                strings: `public class Main {
    public static String reverseString(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    public static boolean isPalindrome(String str) {
        String cleaned = str.toLowerCase().replaceAll("[^a-z0-9]", "");
        return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
    }
    
    public static void main(String[] args) {
        String text = "Hello World Algorithm Universe";
        System.out.println("Original: " + text);
        System.out.println("Reversed: " + reverseString(text));
        System.out.println("Is 'racecar' palindrome? " + isPalindrome("racecar"));
    }
}`
            },
            cpp: {
                sorting: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    cout << "Original: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    bubbleSort(arr);
    cout << "Sorted: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    return 0;
}`,
                searching: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
    int target = 7;
    int index = binarySearch(arr, target);
    cout << "Target: " << target << endl;
    cout << "Found at index: " << index << endl;
    return 0;
}`,
                recursion: `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << "Fibonacci(10): " << fibonacci(10) << endl;
    cout << "Factorial(5): " << factorial(5) << endl;
    return 0;
}`,
                'data-structures': `#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    // Stack
    stack<int> st;
    st.push(1);
    st.push(2);
    st.push(3);
    cout << "Stack top: " << st.top() << endl;
    st.pop();
    cout << "After pop: " << st.top() << endl;
    
    // Queue
    queue<int> q;
    q.push(1);
    q.push(2);
    q.push(3);
    cout << "Queue front: " << q.front() << endl;
    q.pop();
    cout << "After pop: " << q.front() << endl;
    return 0;
}`,
                math: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << "GCD(48, 18): " << gcd(48, 18) << endl;
    cout << "LCM(12, 18): " << lcm(12, 18) << endl;
    cout << "Is 17 prime? " << (isPrime(17) ? "Yes" : "No") << endl;
    cout << "Is 20 prime? " << (isPrime(20) ? "Yes" : "No") << endl;
    return 0;
}`,
                strings: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string reverseString(string str) {
    reverse(str.begin(), str.end());
    return str;
}

bool isPalindrome(string str) {
    string cleaned = str;
    cleaned.erase(remove_if(cleaned.begin(), cleaned.end(), 
        [](char c) { return !isalnum(c); }), cleaned.end());
    transform(cleaned.begin(), cleaned.end(), cleaned.begin(), ::tolower);
    string reversed = cleaned;
    reverse(reversed.begin(), reversed.end());
    return cleaned == reversed;
}

int main() {
    string text = "Hello World";
    cout << "Original: " << text << endl;
    cout << "Reversed: " << reverseString(text) << endl;
    cout << "Is 'racecar' palindrome? " << (isPalindrome("racecar") ? "Yes" : "No") << endl;
    return 0;
}`
            }
        };
        
        // Backward compatibility - keep old templates structure
        this.codeTemplates = this.languageTemplates.javascript;
        
        this.init();
    }

    init() {
        this.editor = document.getElementById('playgroundEditor');
        this.output = document.getElementById('playgroundOutput');
        
        if (!this.editor || !this.output) return;

        this.setupEditor();
        this.setupControls();
        this.setupTemplates();
        this.setupLanguageSelector();
    }

    setupEditor() {
        if (!this.editor) return;

        // Track cursor position
        this.editor.addEventListener('input', () => {
            this.updateCursorPosition();
        });

        this.editor.addEventListener('keydown', (e) => {
            // Tab support
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.editor.selectionStart;
                const end = this.editor.selectionEnd;
                this.editor.value = this.editor.value.substring(0, start) + '    ' + this.editor.value.substring(end);
                this.editor.selectionStart = this.editor.selectionEnd = start + 4;
            }
            // Ctrl/Cmd + Enter to run
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
        });

        this.editor.addEventListener('scroll', () => {
            this.updateCursorPosition();
        });

        this.updateCursorPosition();
    }

    updateCursorPosition() {
        if (!this.editor) return;
        const lineCount = document.getElementById('editorLineCount');
        if (!lineCount) return;

        const text = this.editor.value.substring(0, this.editor.selectionStart);
        const lines = text.split('\n');
        const line = lines.length;
        const col = lines[lines.length - 1].length + 1;
        lineCount.textContent = `Line ${line}, Col ${col}`;
    }

    setupControls() {
        const runBtn = document.getElementById('runCode');
        const clearBtn = document.getElementById('clearCode');
        const resetBtn = document.getElementById('resetCode');
        const clearOutputBtn = document.getElementById('clearOutput');

        if (runBtn) {
            runBtn.addEventListener('click', () => this.runCode());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCode());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetCode());
        }

        if (clearOutputBtn) {
            clearOutputBtn.addEventListener('click', () => this.clearOutput());
        }
    }

    setupTemplates() {
        const templateBtns = document.querySelectorAll('.template-btn');
        templateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const template = btn.dataset.template;
                const langTemplates = this.languageTemplates[this.language];
                if (langTemplates && langTemplates[template]) {
                    this.editor.value = langTemplates[template];
                    this.updateCursorPosition();
                } else if (this.codeTemplates[template]) {
                    // Fallback to JavaScript templates
                    this.editor.value = this.codeTemplates[template];
                    this.updateCursorPosition();
                }
            });
        });
    }

    setupLanguageSelector() {
        const langSelect = document.getElementById('playgroundLanguage');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                this.language = e.target.value;
                // Update placeholder and code based on language
                if (this.editor) {
                    let placeholder = '';
                    let defaultCode = '';
                    
                    if (this.language === 'javascript') {
                        placeholder = `// Write your code here...
// Example:
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));`;
                        defaultCode = placeholder;
                    } else if (this.language === 'java') {
                        placeholder = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;
                        defaultCode = placeholder;
                    } else if (this.language === 'cpp') {
                        placeholder = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`;
                        defaultCode = placeholder;
                    } else if (this.language === 'python') {
                        placeholder = `# Write your Python code here
# Example:
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print('Fibonacci(10):', fibonacci(10))

# Try sorting a list
arr = [64, 34, 25, 12, 22, 11, 90]
print('Original:', arr)
arr.sort()
print('Sorted:', arr)`;
                        defaultCode = placeholder;
                    } else if (this.language === 'typescript') {
                        placeholder = `// Write your TypeScript code here
// Example:
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));

// Try sorting an array
const arr: number[] = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', arr);
arr.sort((a, b) => a - b);
console.log('Sorted:', arr);`;
                        defaultCode = placeholder;
                    }
                    
                    // Update placeholder
                    this.editor.placeholder = placeholder;
                    
                    // If editor is empty or contains only placeholder/old code, replace with new template
                    const currentCode = this.editor.value.trim();
                    const oldPlaceholder = this.editor.placeholder || '';
                    if (!currentCode || currentCode === oldPlaceholder || currentCode.length < 10) {
                        this.editor.value = defaultCode;
                        this.updateCursorPosition();
                    }
                }
            });
        }
    }

    async runCode() {
        if (!this.editor || !this.output) return;

        const code = this.editor.value.trim();
        if (!code) {
            this.addOutput('⚠️ Please write some code first!', 'warn');
            return;
        }

        // Clear previous output
        this.clearOutput();

        // Handle different languages
        if (this.language === 'javascript') {
            this.runJavaScript(code);
        } else if (this.language === 'java') {
            await this.runJava(code);
        } else if (this.language === 'cpp') {
            await this.runCpp(code);
        } else if (this.language === 'python') {
            await this.runPython(code);
        } else if (this.language === 'typescript') {
            await this.runTypeScript(code);
        } else {
            this.addOutput(`⚠️ Language "${this.language}" is not yet supported!`, 'warn');
        }
    }

    runJavaScript(code) {
        // Override console methods to capture output
        const outputLines = [];
        console.log = (...args) => {
            outputLines.push({ type: 'log', message: args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') });
        };
        console.error = (...args) => {
            outputLines.push({ type: 'error', message: args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') });
        };
        console.warn = (...args) => {
            outputLines.push({ type: 'warn', message: args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') });
        };
        console.info = (...args) => {
            outputLines.push({ type: 'info', message: args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') });
        };

        try {
            // Execute code in a sandboxed environment
            const startTime = performance.now();
            
            // Wrap code in a function to prevent global scope pollution
            const wrappedCode = `
                (function() {
                    ${code}
                })();
            `;

            // Use Function constructor for safer execution
            const func = new Function(wrappedCode);
            func();

            const endTime = performance.now();
            const executionTime = (endTime - startTime).toFixed(2);

            // Display output
            if (outputLines.length === 0) {
                this.addOutput('✓ Code executed successfully (no output)', 'success');
            } else {
                outputLines.forEach(line => {
                    this.addOutput(line.message, line.type);
                });
            }

            this.addOutput(`\n⏱️ Execution time: ${executionTime}ms`, 'info');

        } catch (error) {
            this.addOutput(`❌ Error: ${error.message}`, 'error');
            this.addOutput(`   at ${error.stack || 'unknown location'}`, 'error');
        } finally {
            // Restore original console methods
            console.log = this.originalConsole.log;
            console.error = this.originalConsole.error;
            console.warn = this.originalConsole.warn;
            console.info = this.originalConsole.info;
        }
    }

    async runJava(code) {
        this.addOutput('⏳ Compiling and running Java code...', 'info');
        
        try {
            // Use Piston API (public, no API key required)
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'java',
                    version: '15.0.2',
                    files: [
                        {
                            name: 'Main.java',
                            content: code
                        }
                    ],
                    stdin: '',
                    args: []
                })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(`Rate limit exceeded. Please wait a moment and try again. (HTTP ${response.status})`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display results
            if (result.run && result.run.stdout) {
                this.addOutput(result.run.stdout, 'log');
            }
            
            if (result.run && result.run.stderr) {
                this.addOutput(`\n⚠️ Runtime Errors/Warnings:\n${result.run.stderr}`, 'warn');
            }
            
            if (result.compile && result.compile.stderr) {
                this.addOutput(`\n❌ Compilation Errors:\n${result.compile.stderr}`, 'error');
            }
            
            if (result.run && result.run.code !== 0) {
                this.addOutput(`\n⚠️ Program exited with code: ${result.run.code}`, 'warn');
            }
            
            if (result.run && !result.run.stdout && !result.run.stderr && (!result.compile || !result.compile.stderr)) {
                this.addOutput('✓ Code executed successfully (no output)', 'success');
            }

        } catch (error) {
            // Fallback: Try alternative API
            try {
                this.addOutput('⚠️ Trying alternative execution method...', 'info');
                await this.runJavaFallback(code);
            } catch (fallbackError) {
                this.addOutput(`❌ Error: ${error.message}`, 'error');
                this.addOutput('   Make sure you have a public class named "Main" with a main method.', 'error');
                this.addOutput('   Note: Code execution requires internet connection.', 'error');
            }
        }
    }

    async runJavaFallback(code) {
        // Alternative: Use JDoodle API (requires free account but works)
        // For now, we'll show a helpful message
        this.addOutput('❌ Unable to execute Java code at this time.', 'error');
        this.addOutput('   Please ensure your code has a public class named "Main" with a main method.', 'error');
        this.addOutput('   Example:', 'info');
        this.addOutput('   public class Main {', 'info');
        this.addOutput('       public static void main(String[] args) {', 'info');
        this.addOutput('           System.out.println("Hello, World!");', 'info');
        this.addOutput('       }', 'info');
        this.addOutput('   }', 'info');
    }

    async runCpp(code) {
        this.addOutput('⏳ Compiling and running C++ code...', 'info');
        
        try {
            // Use Piston API (public, no API key required)
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'cpp',
                    version: '10.2.0',
                    files: [
                        {
                            name: 'main.cpp',
                            content: code
                        }
                    ],
                    stdin: '',
                    args: []
                })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(`Rate limit exceeded. Please wait a moment and try again. (HTTP ${response.status})`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display results
            if (result.run && result.run.stdout) {
                this.addOutput(result.run.stdout, 'log');
            }
            
            if (result.run && result.run.stderr) {
                this.addOutput(`\n⚠️ Runtime Errors/Warnings:\n${result.run.stderr}`, 'warn');
            }
            
            if (result.compile && result.compile.stderr) {
                this.addOutput(`\n❌ Compilation Errors:\n${result.compile.stderr}`, 'error');
            }
            
            if (result.run && result.run.code !== 0) {
                this.addOutput(`\n⚠️ Program exited with code: ${result.run.code}`, 'warn');
            }
            
            if (result.run && !result.run.stdout && !result.run.stderr && (!result.compile || !result.compile.stderr)) {
                this.addOutput('✓ Code executed successfully (no output)', 'success');
            }

        } catch (error) {
            // Fallback: Try alternative API
            try {
                this.addOutput('⚠️ Trying alternative execution method...', 'info');
                await this.runCppFallback(code);
            } catch (fallbackError) {
                this.addOutput(`❌ Error: ${error.message}`, 'error');
                this.addOutput('   Make sure your code includes necessary headers and has a main() function.', 'error');
                this.addOutput('   Note: Code execution requires internet connection.', 'error');
            }
        }
    }

    async runCppFallback(code) {
        // Alternative fallback
        this.addOutput('❌ Unable to execute C++ code at this time.', 'error');
        this.addOutput('   Please ensure your code includes necessary headers and has a main() function.', 'error');
        this.addOutput('   Example:', 'info');
        this.addOutput('   #include <iostream>', 'info');
        this.addOutput('   using namespace std;', 'info');
        this.addOutput('   int main() {', 'info');
        this.addOutput('       cout << "Hello, World!" << endl;', 'info');
        this.addOutput('       return 0;', 'info');
        this.addOutput('   }', 'info');
    }

    async runPython(code) {
        this.addOutput('⏳ Running Python code...', 'info');
        
        try {
            // Use Piston API (public, no API key required)
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'python',
                    version: '3.10.0',
                    files: [
                        {
                            name: 'main.py',
                            content: code
                        }
                    ],
                    stdin: '',
                    args: []
                })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(`Rate limit exceeded. Please wait a moment and try again. (HTTP ${response.status})`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display results
            if (result.run && result.run.stdout) {
                this.addOutput(result.run.stdout, 'log');
            }
            
            if (result.run && result.run.stderr) {
                this.addOutput(`\n⚠️ Runtime Errors/Warnings:\n${result.run.stderr}`, 'warn');
            }
            
            if (result.compile && result.compile.stderr) {
                this.addOutput(`\n❌ Compilation Errors:\n${result.compile.stderr}`, 'error');
            }
            
            if (result.run && result.run.code !== 0) {
                this.addOutput(`\n⚠️ Program exited with code: ${result.run.code}`, 'warn');
            }
            
            if (result.run && !result.run.stdout && !result.run.stderr && (!result.compile || !result.compile.stderr)) {
                this.addOutput('✓ Code executed successfully (no output)', 'success');
            }

        } catch (error) {
            this.addOutput(`❌ Error: ${error.message}`, 'error');
            this.addOutput('   Note: Code execution requires internet connection.', 'error');
            this.addOutput('   Example Python code:', 'info');
            this.addOutput('   print("Hello, World!")', 'info');
        }
    }

    async runTypeScript(code) {
        this.addOutput('⏳ Compiling and running TypeScript code...', 'info');
        
        try {
            // Use Piston API (public, no API key required)
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'typescript',
                    version: '5.0.3',
                    files: [
                        {
                            name: 'main.ts',
                            content: code
                        }
                    ],
                    stdin: '',
                    args: []
                })
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(`Rate limit exceeded. Please wait a moment and try again. (HTTP ${response.status})`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Display results
            if (result.run && result.run.stdout) {
                this.addOutput(result.run.stdout, 'log');
            }
            
            if (result.run && result.run.stderr) {
                this.addOutput(`\n⚠️ Runtime Errors/Warnings:\n${result.run.stderr}`, 'warn');
            }
            
            if (result.compile && result.compile.stderr) {
                this.addOutput(`\n❌ Compilation Errors:\n${result.compile.stderr}`, 'error');
            }
            
            if (result.run && result.run.code !== 0) {
                this.addOutput(`\n⚠️ Program exited with code: ${result.run.code}`, 'warn');
            }
            
            if (result.run && !result.run.stdout && !result.run.stderr && (!result.compile || !result.compile.stderr)) {
                this.addOutput('✓ Code executed successfully (no output)', 'success');
            }

        } catch (error) {
            // Fallback: Try transpiling TypeScript to JavaScript
            try {
                this.addOutput('⚠️ Trying to transpile TypeScript to JavaScript...', 'info');
                // Simple TypeScript to JavaScript transpilation (basic)
                // Remove type annotations for basic transpilation
                let jsCode = code
                    .replace(/:\s*\w+(\[\])?/g, '') // Remove type annotations
                    .replace(/<[^>]+>/g, ''); // Remove generic types
                
                this.addOutput('⚠️ Note: Type checking is disabled. Running as JavaScript...', 'warn');
                this.runJavaScript(jsCode);
            } catch (fallbackError) {
                this.addOutput(`❌ Error: ${error.message}`, 'error');
                this.addOutput('   Note: Code execution requires internet connection.', 'error');
                this.addOutput('   Example TypeScript code:', 'info');
                this.addOutput('   function greet(name: string): void {', 'info');
                this.addOutput('       console.log("Hello, " + name);', 'info');
                this.addOutput('   }', 'info');
                this.addOutput('   greet("World");', 'info');
            }
        }
    }

    addOutput(message, type = 'log') {
        if (!this.output) return;

        // Remove placeholder if exists
        const placeholder = this.output.querySelector('.output-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        const outputLine = document.createElement('div');
        outputLine.className = `output-line output-${type}`;
        outputLine.textContent = message;
        this.output.appendChild(outputLine);

        // Auto-scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
    }

    clearOutput() {
        if (!this.output) return;
        // Update hint based on language
        let hint = '💡 Tip: Use console.log() to print values';
        if (this.language === 'python') {
            hint = '💡 Tip: Use print() to display output';
        } else if (this.language === 'java') {
            hint = '💡 Tip: Use System.out.println() to display output';
        } else if (this.language === 'cpp') {
            hint = '💡 Tip: Use cout or printf() to display output';
        }
        
        this.output.innerHTML = `
            <div class="output-placeholder">
                <p>Output will appear here when you run your code</p>
                <p class="output-hint">${hint}</p>
            </div>
        `;
    }

    clearCode() {
        if (this.editor) {
            this.editor.value = '';
            this.updateCursorPosition();
        }
    }

    resetCode() {
        if (this.editor) {
            this.editor.value = this.editor.placeholder;
            this.updateCursorPosition();
        }
        this.clearOutput();
    }
}

// Initialize playground manager
let playgroundManager;
document.addEventListener('DOMContentLoaded', () => {
    playgroundManager = new PlaygroundManager();
    window.playgroundManager = playgroundManager;
});

