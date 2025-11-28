# 🌌 Algorithm Universe

An interactive, comprehensive algorithm visualization platform with **50+ algorithms**, **12 programming languages**, **interactive sound effects**, and a **Programming Language Arena**!

![Algorithm Universe](https://img.shields.io/badge/Algorithms-50+-00f5ff?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-12-ff00ff?style=for-the-badge)
![Sound](https://img.shields.io/badge/Sound-Interactive-ffd700?style=for-the-badge)

## 🎮 Features

### 📊 Sorting Algorithms (11 algorithms)
- Bubble Sort, Quick Sort, Merge Sort, Insertion Sort
- Selection Sort, Heap Sort, Counting Sort, Radix Sort
- Shell Sort, Tim Sort, and more!

### 🔍 Searching Algorithms (6 algorithms)
- Binary Search, Linear Search, Jump Search
- Interpolation Search, Exponential Search, Ternary Search

### 🗺️ Pathfinding Algorithms (5 algorithms)
- BFS, DFS, Dijkstra's, A* Search, Greedy Best-First

### 🕸️ Graph Algorithms (9 algorithms)
- BFS, DFS, Dijkstra's, Bellman-Ford, Floyd-Warshall
- Kruskal's MST, Prim's MST, Topological Sort, A*

### 🌳 Tree Algorithms (5 algorithms)
- Inorder, Preorder, Level Order Traversal
- BST Insert, Lowest Common Ancestor

### 📐 Dynamic Programming (6 algorithms)
- Fibonacci, 0/1 Knapsack, LCS, LIS
- Coin Change, Edit Distance

### 📝 String Algorithms (2 algorithms)
- KMP Pattern Matching, Rabin-Karp

### 🔢 Mathematical Algorithms (4 algorithms)
- GCD (Euclidean), Sieve of Eratosthenes
- Fast Exponentiation, Modular Exponentiation

### ⚔️ Programming Language Arena
Race different programming languages against each other!
- Compare execution speeds
- Visualize with animated runners
- See which language wins for different algorithms
- Languages: JavaScript, Python, Java, C++, Go, Rust, C#, Ruby

## 💻 Programming Languages Supported

| Language | Icon | Code Display |
|----------|------|--------------|
| JavaScript | 🟨 | ✅ |
| Python | 🐍 | ✅ |
| Java | ☕ | ✅ |
| C++ | ⚡ | ✅ |
| C# | 🟣 | ✅ |
| Go | 🐹 | ✅ |
| Rust | 🦀 | ✅ |
| TypeScript | 🔷 | ✅ |
| Ruby | 💎 | ✅ |
| Swift | 🍎 | ✅ |
| Kotlin | 🎯 | ✅ |
| C | 🔵 | ✅ |

## 🔊 Sound Effects

Interactive sounds for:
- 🎵 Value comparisons (pitch based on value)
- 🔀 Swaps (swoosh effect)
- ✅ Success/Found (major chord)
- 🎉 Algorithm completion (fanfare)
- ❌ Not found (error tone)
- 📍 Step/Visit sounds (for graphs/trees)

## 🚀 Running Locally

### Quick Start

```bash
# Clone the repository
git clone https://github.com/UGilfoyle/Algorithm-visualizer.git
cd Algorithm-visualizer

# Start a local server (Python 3)
python3 -m http.server 8000

# Or with Node.js
npx http-server -p 8000
```

Then open: **http://localhost:8000**

### Other Methods

1. **VS Code Live Server** - Install extension, right-click `index.html`
2. **Direct open** - Double-click `index.html` (some features may not work)

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1-9` | Switch between sections |
| `Space` | Start visualization |
| `R` | Reset/Shuffle |
| `M` | Toggle sound |

## 📁 Project Structure

```
algorithm-visualizer/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── main.js         # Main app controller
├── algorithms.js   # 50+ algorithms with multi-language code
├── visualizer.js   # Visualization engines
├── audio.js        # Sound effects engine
└── README.md       # This file
```

## 🎨 Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Animations, Grid, Flexbox
- **JavaScript ES6+** - Async/await, Classes, Modules
- **Web Audio API** - Sound synthesis
- **Canvas API** - Graph visualizations
- **No dependencies** - Pure vanilla JavaScript!

## 🏆 Language Arena Speed Multipliers

Based on real-world benchmarks:

| Language | Speed Factor | Type |
|----------|-------------|------|
| C/C++ | 1.0x | Native compiled |
| Rust | 1.05x | Native compiled |
| Swift | 1.5x | LLVM compiled |
| Go | 1.8x | Compiled + GC |
| Java | 2.0x | JIT compiled |
| C# | 2.2x | JIT compiled |
| JavaScript | 3.0x | V8 JIT |
| Python | 45x | Interpreted |
| Ruby | 50x | Interpreted |

## 📝 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for learning algorithms

**🌟 Star this repo if you find it useful!**
