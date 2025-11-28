// ========================================
// Main Application Controller
// ========================================

class App {
    constructor() {
        this.currentSection = 'pathfinding';
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupKeyboardShortcuts();
        this.addLoadingAnimations();
    }
    
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.switchSection(section);
                
                // Update active nav button
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Trigger any section-specific initialization
            this.onSectionChange(sectionId);
        }
    }
    
    onSectionChange(sectionId) {
        switch (sectionId) {
            case 'pathfinding':
                // Pathfinding is initialized on load
                break;
            case 'sorting':
                // Sorting is initialized on load
                if (sortingVisualizer) {
                    sortingVisualizer.renderAllBars();
                }
                break;
            case 'complexity':
                // Complexity visualizer - resize canvas on show
                if (complexityVisualizer) {
                    complexityVisualizer.resizeCanvas();
                }
                break;
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Number keys 1-3 for section switching
            if (e.key === '1') this.switchToSection('pathfinding');
            if (e.key === '2') this.switchToSection('sorting');
            if (e.key === '3') this.switchToSection('complexity');
            
            // Space to start visualization in current section
            if (e.key === ' ' && !e.target.matches('input, select, textarea')) {
                e.preventDefault();
                this.triggerStart();
            }
            
            // R to reset/clear
            if (e.key === 'r' && !e.target.matches('input, select, textarea')) {
                this.triggerReset();
            }
        });
    }
    
    switchToSection(sectionId) {
        const btn = document.querySelector(`[data-section="${sectionId}"]`);
        if (btn) {
            btn.click();
        }
    }
    
    triggerStart() {
        switch (this.currentSection) {
            case 'pathfinding':
                document.getElementById('startPath')?.click();
                break;
            case 'sorting':
                document.getElementById('startSort')?.click();
                break;
            case 'complexity':
                document.getElementById('startRace')?.click();
                break;
        }
    }
    
    triggerReset() {
        switch (this.currentSection) {
            case 'pathfinding':
                document.getElementById('clearPath')?.click();
                break;
            case 'sorting':
                document.getElementById('shuffleArray')?.click();
                break;
            case 'complexity':
                document.getElementById('inputSize').value = 10;
                document.getElementById('inputSizeValue').textContent = '10';
                if (complexityVisualizer) {
                    complexityVisualizer.inputSize = 10;
                    complexityVisualizer.updateRace();
                }
                break;
        }
    }
    
    addLoadingAnimations() {
        // Stagger animations on initial load
        const animatedElements = document.querySelectorAll('.stat-card, .sort-lane, .race-lane');
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + index * 50);
        });
    }
}

// Tooltip system for algorithm explanations
const algorithmInfo = {
    // Pathfinding
    bfs: {
        name: 'Breadth-First Search',
        description: 'Explores all nodes at the current depth before moving to nodes at the next depth level.',
        complexity: 'O(V + E)',
        guaranteed: 'Yes (unweighted)'
    },
    dfs: {
        name: 'Depth-First Search',
        description: 'Explores as far as possible along each branch before backtracking.',
        complexity: 'O(V + E)',
        guaranteed: 'No'
    },
    dijkstra: {
        name: "Dijkstra's Algorithm",
        description: 'Finds the shortest path from a source to all other nodes in a weighted graph.',
        complexity: 'O((V + E) log V)',
        guaranteed: 'Yes'
    },
    astar: {
        name: 'A* Search',
        description: 'Uses heuristics to find the shortest path efficiently. Combines Dijkstra with greedy best-first.',
        complexity: 'O(E)',
        guaranteed: 'Yes (with admissible heuristic)'
    },
    greedy: {
        name: 'Greedy Best-First',
        description: 'Selects the path that appears best at the moment based on heuristic.',
        complexity: 'O(b^m)',
        guaranteed: 'No'
    },
    
    // Sorting
    bubble: {
        name: 'Bubble Sort',
        description: 'Repeatedly swaps adjacent elements if they are in wrong order.',
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)'
    },
    selection: {
        name: 'Selection Sort',
        description: 'Repeatedly finds the minimum element and moves it to the sorted portion.',
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)'
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds the sorted array one item at a time by inserting each element in its correct position.',
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
        space: 'O(1)'
    },
    merge: {
        name: 'Merge Sort',
        description: 'Divides the array into halves, sorts them, and merges them back together.',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(n)'
    },
    quick: {
        name: 'Quick Sort',
        description: 'Picks a pivot and partitions the array around it, then recursively sorts.',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
        space: 'O(log n)'
    },
    heap: {
        name: 'Heap Sort',
        description: 'Uses a binary heap data structure to sort elements.',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
        space: 'O(1)'
    }
};

// Easter egg: Konami code
let konamiProgress = 0;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiProgress]) {
        konamiProgress++;
        if (konamiProgress === konamiCode.length) {
            activatePartyMode();
            konamiProgress = 0;
        }
    } else {
        konamiProgress = 0;
    }
});

function activatePartyMode() {
    document.body.style.animation = 'partyMode 0.5s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes partyMode {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    
    // Log welcome message
    console.log(`
    %c⚡ Algorithm Arena %c
    
    Welcome to the Algorithm Visualizer!
    
    Keyboard shortcuts:
    - 1, 2, 3: Switch sections
    - Space: Start visualization
    - R: Reset/Clear
    
    Try the Konami code for a surprise! 🎮
    `, 'color: #00f5ff; font-size: 20px; font-weight: bold;', '');
});

