// ========================================
// Pathfinding Visualizer
// ========================================

class PathfindingVisualizer {
    constructor() {
        this.gridContainer = document.getElementById('pathGrid');
        this.rows = 25;
        this.cols = 50;
        this.grid = [];
        this.startNode = { row: 12, col: 5 };
        this.endNode = { row: 12, col: 44 };
        this.isMouseDown = false;
        this.currentAction = null;
        this.isRunning = false;
        this.speed = 50;
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        this.createGrid();
        this.renderGrid();
    }
    
    createGrid() {
        this.grid = [];
        for (let row = 0; row < this.rows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.cols; col++) {
                currentRow.push({
                    row,
                    col,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    distance: Infinity,
                    heuristic: 0,
                    fScore: Infinity,
                    previous: null
                });
            }
            this.grid.push(currentRow);
        }
    }
    
    renderGrid() {
        this.gridContainer.innerHTML = '';
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.cols}, 24px)`;
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (row === this.startNode.row && col === this.startNode.col) {
                    cell.classList.add('start');
                } else if (row === this.endNode.row && col === this.endNode.col) {
                    cell.classList.add('end');
                }
                
                cell.addEventListener('mousedown', (e) => this.handleMouseDown(e, row, col));
                cell.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, row, col));
                cell.addEventListener('mouseup', () => this.handleMouseUp());
                
                this.gridContainer.appendChild(cell);
            }
        }
    }
    
    setupEventListeners() {
        document.addEventListener('mouseup', () => this.handleMouseUp());
        
        document.getElementById('startPath').addEventListener('click', () => this.startVisualization());
        document.getElementById('clearPath').addEventListener('click', () => this.clearPath());
        document.getElementById('generateMaze').addEventListener('click', () => this.generateMaze());
        document.getElementById('pathSpeed').addEventListener('input', (e) => {
            this.speed = e.target.value;
        });
    }
    
    handleMouseDown(e, row, col) {
        if (this.isRunning) return;
        e.preventDefault();
        this.isMouseDown = true;
        
        if (row === this.startNode.row && col === this.startNode.col) {
            this.currentAction = 'moveStart';
        } else if (row === this.endNode.row && col === this.endNode.col) {
            this.currentAction = 'moveEnd';
        } else {
            this.currentAction = 'toggleWall';
            this.toggleWall(row, col);
        }
    }
    
    handleMouseEnter(e, row, col) {
        if (!this.isMouseDown || this.isRunning) return;
        
        if (this.currentAction === 'moveStart') {
            this.moveStart(row, col);
        } else if (this.currentAction === 'moveEnd') {
            this.moveEnd(row, col);
        } else if (this.currentAction === 'toggleWall') {
            this.toggleWall(row, col);
        }
    }
    
    handleMouseUp() {
        this.isMouseDown = false;
        this.currentAction = null;
    }
    
    toggleWall(row, col) {
        if ((row === this.startNode.row && col === this.startNode.col) ||
            (row === this.endNode.row && col === this.endNode.col)) return;
            
        this.grid[row][col].isWall = !this.grid[row][col].isWall;
        const cell = this.getCell(row, col);
        cell.classList.toggle('wall');
    }
    
    moveStart(row, col) {
        if (this.grid[row][col].isWall || 
            (row === this.endNode.row && col === this.endNode.col)) return;
            
        const oldCell = this.getCell(this.startNode.row, this.startNode.col);
        oldCell.classList.remove('start');
        
        this.startNode = { row, col };
        const newCell = this.getCell(row, col);
        newCell.classList.add('start');
    }
    
    moveEnd(row, col) {
        if (this.grid[row][col].isWall || 
            (row === this.startNode.row && col === this.startNode.col)) return;
            
        const oldCell = this.getCell(this.endNode.row, this.endNode.col);
        oldCell.classList.remove('end');
        
        this.endNode = { row, col };
        const newCell = this.getCell(row, col);
        newCell.classList.add('end');
    }
    
    getCell(row, col) {
        return this.gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
    
    clearPath() {
        if (this.isRunning) return;
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.grid[row][col];
                node.isVisited = false;
                node.isPath = false;
                node.distance = Infinity;
                node.heuristic = 0;
                node.fScore = Infinity;
                node.previous = null;
                
                const cell = this.getCell(row, col);
                cell.classList.remove('visited', 'path', 'current');
            }
        }
        
        this.updateStats(0, 0, 0);
    }
    
    clearWalls() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col].isWall = false;
                const cell = this.getCell(row, col);
                cell.classList.remove('wall');
            }
        }
    }
    
    async generateMaze() {
        if (this.isRunning) return;
        
        this.clearPath();
        this.clearWalls();
        
        const pattern = document.getElementById('mazePattern').value;
        
        switch (pattern) {
            case 'random':
                await this.generateRandomMaze();
                break;
            case 'recursive':
                await this.generateRecursiveMaze();
                break;
            case 'spiral':
                await this.generateSpiralMaze();
                break;
            case 'clear':
                // Already cleared
                break;
        }
    }
    
    async generateRandomMaze() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if ((row === this.startNode.row && col === this.startNode.col) ||
                    (row === this.endNode.row && col === this.endNode.col)) continue;
                    
                if (Math.random() < 0.3) {
                    this.grid[row][col].isWall = true;
                    const cell = this.getCell(row, col);
                    cell.classList.add('wall');
                }
            }
        }
    }
    
    async generateRecursiveMaze() {
        // Fill with walls first
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if ((row === this.startNode.row && col === this.startNode.col) ||
                    (row === this.endNode.row && col === this.endNode.col)) continue;
                this.grid[row][col].isWall = true;
                this.getCell(row, col).classList.add('wall');
            }
        }
        
        await this.recursiveDivision(1, this.rows - 2, 1, this.cols - 2, 'horizontal');
    }
    
    async recursiveDivision(rowStart, rowEnd, colStart, colEnd, orientation) {
        if (rowEnd < rowStart || colEnd < colStart) return;
        
        if (orientation === 'horizontal') {
            const possibleRows = [];
            for (let i = rowStart; i <= rowEnd; i += 2) {
                possibleRows.push(i);
            }
            if (possibleRows.length === 0) return;
            
            const row = possibleRows[Math.floor(Math.random() * possibleRows.length)];
            const passage = colStart + Math.floor(Math.random() * (colEnd - colStart + 1));
            
            for (let col = colStart; col <= colEnd; col++) {
                if (col === passage) {
                    this.grid[row][col].isWall = false;
                    this.getCell(row, col).classList.remove('wall');
                }
            }
            
            await this.recursiveDivision(rowStart, row - 1, colStart, colEnd, 'vertical');
            await this.recursiveDivision(row + 1, rowEnd, colStart, colEnd, 'vertical');
        } else {
            const possibleCols = [];
            for (let i = colStart; i <= colEnd; i += 2) {
                possibleCols.push(i);
            }
            if (possibleCols.length === 0) return;
            
            const col = possibleCols[Math.floor(Math.random() * possibleCols.length)];
            const passage = rowStart + Math.floor(Math.random() * (rowEnd - rowStart + 1));
            
            for (let row = rowStart; row <= rowEnd; row++) {
                if (row === passage) {
                    this.grid[row][col].isWall = false;
                    this.getCell(row, col).classList.remove('wall');
                }
            }
            
            await this.recursiveDivision(rowStart, rowEnd, colStart, col - 1, 'horizontal');
            await this.recursiveDivision(rowStart, rowEnd, col + 1, colEnd, 'horizontal');
        }
    }
    
    async generateSpiralMaze() {
        let top = 0, bottom = this.rows - 1, left = 0, right = this.cols - 1;
        let layer = 0;
        
        while (top < bottom && left < right) {
            if (layer % 2 === 0) {
                // Create walls on this layer
                for (let col = left; col <= right; col++) {
                    if ((top === this.startNode.row && col === this.startNode.col) ||
                        (top === this.endNode.row && col === this.endNode.col)) continue;
                    if (col !== left + Math.floor((right - left) / 2)) {
                        this.grid[top][col].isWall = true;
                        this.getCell(top, col).classList.add('wall');
                    }
                }
                for (let row = top; row <= bottom; row++) {
                    if ((row === this.startNode.row && right === this.startNode.col) ||
                        (row === this.endNode.row && right === this.endNode.col)) continue;
                    if (row !== top + Math.floor((bottom - top) / 2)) {
                        this.grid[row][right].isWall = true;
                        this.getCell(row, right).classList.add('wall');
                    }
                }
            }
            
            top += 2;
            bottom -= 2;
            left += 2;
            right -= 2;
            layer++;
        }
    }
    
    async startVisualization() {
        if (this.isRunning) return;
        
        this.clearPath();
        this.isRunning = true;
        
        const algorithm = document.getElementById('pathAlgorithm').value;
        const startTime = performance.now();
        
        let visitedNodesInOrder = [];
        
        switch (algorithm) {
            case 'bfs':
                visitedNodesInOrder = await this.bfs();
                break;
            case 'dfs':
                visitedNodesInOrder = await this.dfs();
                break;
            case 'dijkstra':
                visitedNodesInOrder = await this.dijkstra();
                break;
            case 'astar':
                visitedNodesInOrder = await this.astar();
                break;
            case 'greedy':
                visitedNodesInOrder = await this.greedyBestFirst();
                break;
        }
        
        const endTime = performance.now();
        const nodesVisited = visitedNodesInOrder.length;
        
        // Animate visited nodes
        await this.animateVisited(visitedNodesInOrder);
        
        // Get and animate path
        const path = this.getPath();
        await this.animatePath(path);
        
        this.updateStats(nodesVisited, path.length, Math.round(endTime - startTime));
        
        this.isRunning = false;
    }
    
    async bfs() {
        const queue = [this.grid[this.startNode.row][this.startNode.col]];
        const visitedNodesInOrder = [];
        const visited = new Set();
        
        visited.add(`${this.startNode.row}-${this.startNode.col}`);
        
        while (queue.length > 0) {
            const current = queue.shift();
            visitedNodesInOrder.push(current);
            
            if (current.row === this.endNode.row && current.col === this.endNode.col) {
                return visitedNodesInOrder;
            }
            
            const neighbors = this.getNeighbors(current);
            
            for (const neighbor of neighbors) {
                const key = `${neighbor.row}-${neighbor.col}`;
                if (!visited.has(key) && !neighbor.isWall) {
                    visited.add(key);
                    neighbor.previous = current;
                    queue.push(neighbor);
                }
            }
        }
        
        return visitedNodesInOrder;
    }
    
    async dfs() {
        const stack = [this.grid[this.startNode.row][this.startNode.col]];
        const visitedNodesInOrder = [];
        const visited = new Set();
        
        while (stack.length > 0) {
            const current = stack.pop();
            const key = `${current.row}-${current.col}`;
            
            if (visited.has(key)) continue;
            visited.add(key);
            visitedNodesInOrder.push(current);
            
            if (current.row === this.endNode.row && current.col === this.endNode.col) {
                return visitedNodesInOrder;
            }
            
            const neighbors = this.getNeighbors(current);
            
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.row}-${neighbor.col}`;
                if (!visited.has(neighborKey) && !neighbor.isWall) {
                    neighbor.previous = current;
                    stack.push(neighbor);
                }
            }
        }
        
        return visitedNodesInOrder;
    }
    
    async dijkstra() {
        const startNode = this.grid[this.startNode.row][this.startNode.col];
        startNode.distance = 0;
        
        const unvisitedNodes = this.getAllNodes();
        const visitedNodesInOrder = [];
        
        while (unvisitedNodes.length > 0) {
            this.sortByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();
            
            if (closestNode.isWall) continue;
            if (closestNode.distance === Infinity) break;
            
            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);
            
            if (closestNode.row === this.endNode.row && closestNode.col === this.endNode.col) {
                return visitedNodesInOrder;
            }
            
            this.updateNeighborDistances(closestNode);
        }
        
        return visitedNodesInOrder;
    }
    
    async astar() {
        const startNode = this.grid[this.startNode.row][this.startNode.col];
        const endNode = this.grid[this.endNode.row][this.endNode.col];
        
        startNode.distance = 0;
        startNode.heuristic = this.heuristic(startNode, endNode);
        startNode.fScore = startNode.heuristic;
        
        const openSet = [startNode];
        const visitedNodesInOrder = [];
        const visited = new Set();
        
        while (openSet.length > 0) {
            openSet.sort((a, b) => a.fScore - b.fScore);
            const current = openSet.shift();
            
            const key = `${current.row}-${current.col}`;
            if (visited.has(key)) continue;
            visited.add(key);
            
            if (current.isWall) continue;
            
            visitedNodesInOrder.push(current);
            
            if (current.row === this.endNode.row && current.col === this.endNode.col) {
                return visitedNodesInOrder;
            }
            
            const neighbors = this.getNeighbors(current);
            
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.row}-${neighbor.col}`;
                if (visited.has(neighborKey) || neighbor.isWall) continue;
                
                const tentativeDistance = current.distance + 1;
                
                if (tentativeDistance < neighbor.distance) {
                    neighbor.previous = current;
                    neighbor.distance = tentativeDistance;
                    neighbor.heuristic = this.heuristic(neighbor, endNode);
                    neighbor.fScore = neighbor.distance + neighbor.heuristic;
                    
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        
        return visitedNodesInOrder;
    }
    
    async greedyBestFirst() {
        const startNode = this.grid[this.startNode.row][this.startNode.col];
        const endNode = this.grid[this.endNode.row][this.endNode.col];
        
        startNode.heuristic = this.heuristic(startNode, endNode);
        
        const openSet = [startNode];
        const visitedNodesInOrder = [];
        const visited = new Set();
        
        while (openSet.length > 0) {
            openSet.sort((a, b) => a.heuristic - b.heuristic);
            const current = openSet.shift();
            
            const key = `${current.row}-${current.col}`;
            if (visited.has(key)) continue;
            visited.add(key);
            
            if (current.isWall) continue;
            
            visitedNodesInOrder.push(current);
            
            if (current.row === this.endNode.row && current.col === this.endNode.col) {
                return visitedNodesInOrder;
            }
            
            const neighbors = this.getNeighbors(current);
            
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.row}-${neighbor.col}`;
                if (visited.has(neighborKey) || neighbor.isWall) continue;
                
                neighbor.previous = current;
                neighbor.heuristic = this.heuristic(neighbor, endNode);
                openSet.push(neighbor);
            }
        }
        
        return visitedNodesInOrder;
    }
    
    heuristic(nodeA, nodeB) {
        // Manhattan distance
        return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
    }
    
    getNeighbors(node) {
        const neighbors = [];
        const { row, col } = node;
        
        if (row > 0) neighbors.push(this.grid[row - 1][col]);
        if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]);
        if (col > 0) neighbors.push(this.grid[row][col - 1]);
        if (col < this.cols - 1) neighbors.push(this.grid[row][col + 1]);
        
        return neighbors;
    }
    
    getAllNodes() {
        const nodes = [];
        for (const row of this.grid) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    }
    
    sortByDistance(nodes) {
        nodes.sort((a, b) => a.distance - b.distance);
    }
    
    updateNeighborDistances(node) {
        const neighbors = this.getNeighbors(node);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.distance = node.distance + 1;
                neighbor.previous = node;
            }
        }
    }
    
    getPath() {
        const path = [];
        let current = this.grid[this.endNode.row][this.endNode.col];
        
        while (current !== null) {
            path.unshift(current);
            current = current.previous;
        }
        
        // Check if we found a valid path
        if (path.length === 0 || 
            (path[0].row !== this.startNode.row || path[0].col !== this.startNode.col)) {
            return [];
        }
        
        return path;
    }
    
    async animateVisited(visitedNodes) {
        const delay = Math.max(1, 101 - this.speed);
        
        for (let i = 0; i < visitedNodes.length; i++) {
            const node = visitedNodes[i];
            
            if ((node.row === this.startNode.row && node.col === this.startNode.col) ||
                (node.row === this.endNode.row && node.col === this.endNode.col)) {
                continue;
            }
            
            const cell = this.getCell(node.row, node.col);
            cell.classList.add('visited');
            
            if (delay > 5) {
                await this.sleep(delay);
            } else if (i % 5 === 0) {
                await this.sleep(1);
            }
        }
    }
    
    async animatePath(path) {
        const delay = Math.max(20, 101 - this.speed);
        
        for (let i = 0; i < path.length; i++) {
            const node = path[i];
            
            if ((node.row === this.startNode.row && node.col === this.startNode.col) ||
                (node.row === this.endNode.row && node.col === this.endNode.col)) {
                continue;
            }
            
            const cell = this.getCell(node.row, node.col);
            cell.classList.remove('visited');
            cell.classList.add('path');
            
            await this.sleep(delay);
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    updateStats(visited, pathLength, time) {
        document.getElementById('nodesVisited').textContent = visited;
        document.getElementById('pathLength').textContent = pathLength > 0 ? pathLength - 1 : 0;
        document.getElementById('timeTaken').textContent = `${time}ms`;
    }
}

// Initialize pathfinding visualizer when DOM is ready
let pathfindingVisualizer;
document.addEventListener('DOMContentLoaded', () => {
    pathfindingVisualizer = new PathfindingVisualizer();
});

