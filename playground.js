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
        this.codeTemplates = {
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
        };
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
                if (this.codeTemplates[template]) {
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
                // For now, only JavaScript is fully supported
                if (this.language !== 'javascript') {
                    this.addOutput('⚠️ Only JavaScript is currently supported. Python and TypeScript support coming soon!', 'warning');
                }
            });
        }
    }

    runCode() {
        if (!this.editor || !this.output) return;

        const code = this.editor.value.trim();
        if (!code) {
            this.addOutput('⚠️ Please write some code first!', 'warning');
            return;
        }

        // Clear previous output
        this.clearOutput();

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
        this.output.innerHTML = `
            <div class="output-placeholder">
                <p>Output will appear here when you run your code</p>
                <p class="output-hint">💡 Tip: Use console.log() to print values</p>
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

