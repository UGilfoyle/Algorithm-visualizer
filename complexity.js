// ========================================
// Big O Complexity Visualizer
// ========================================

class ComplexityVisualizer {
    constructor() {
        this.inputSize = 10;
        this.autoRacing = false;
        this.autoInterval = null;
        this.canvas = null;
        this.ctx = null;
        this.dataPoints = {
            '1': [],
            'logn': [],
            'n': [],
            'nlogn': [],
            'n2': [],
            '2n': []
        };
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        this.canvas = document.getElementById('complexityGraph');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }
        this.updateRace();
    }
    
    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.drawGraph();
    }
    
    setupEventListeners() {
        document.getElementById('inputSize').addEventListener('input', (e) => {
            this.inputSize = parseInt(e.target.value);
            document.getElementById('inputSizeValue').textContent = this.inputSize;
            this.updateRace();
        });
        
        document.getElementById('startRace').addEventListener('click', () => {
            this.animateRace();
        });
        
        document.getElementById('autoRace').addEventListener('click', () => {
            this.toggleAutoRace();
        });
    }
    
    calculateOperations(complexity, n) {
        switch (complexity) {
            case '1':
                return 1;
            case 'logn':
                return Math.max(1, Math.log2(n));
            case 'n':
                return n;
            case 'nlogn':
                return n * Math.max(1, Math.log2(n));
            case 'n2':
                return n * n;
            case '2n':
                return Math.pow(2, Math.min(n, 20)); // Cap at 2^20 to prevent overflow
            default:
                return n;
        }
    }
    
    updateRace() {
        const n = this.inputSize;
        const complexities = ['1', 'logn', 'n', 'nlogn', 'n2', '2n'];
        
        // Calculate max for scaling
        const maxOps = this.calculateOperations('n2', n);
        
        for (const complexity of complexities) {
            const ops = this.calculateOperations(complexity, n);
            const racer = document.getElementById(`racer-${complexity}`);
            const opsDisplay = document.getElementById(`ops-${complexity}`);
            
            if (racer && opsDisplay) {
                // Calculate position (percentage of track width)
                // Use log scale for better visualization
                const normalizedOps = Math.min(ops / maxOps, 1);
                const position = 5 + (normalizedOps * 85); // 5% to 90% of track
                
                racer.style.left = `${position}%`;
                
                // Format operations number
                if (ops >= 1e9) {
                    opsDisplay.textContent = `${(ops / 1e9).toFixed(1)}B`;
                } else if (ops >= 1e6) {
                    opsDisplay.textContent = `${(ops / 1e6).toFixed(1)}M`;
                } else if (ops >= 1e3) {
                    opsDisplay.textContent = `${(ops / 1e3).toFixed(1)}K`;
                } else {
                    opsDisplay.textContent = Math.round(ops).toString();
                }
            }
            
            // Store data point for graph
            this.dataPoints[complexity].push({ n, ops });
            if (this.dataPoints[complexity].length > 100) {
                this.dataPoints[complexity].shift();
            }
        }
        
        this.drawGraph();
    }
    
    async animateRace() {
        // Reset to small input
        this.inputSize = 1;
        document.getElementById('inputSize').value = 1;
        document.getElementById('inputSizeValue').textContent = '1';
        
        // Clear data points
        for (const key of Object.keys(this.dataPoints)) {
            this.dataPoints[key] = [];
        }
        
        // Animate growth
        for (let i = 1; i <= 100; i++) {
            this.inputSize = i;
            document.getElementById('inputSize').value = i;
            document.getElementById('inputSizeValue').textContent = i;
            this.updateRace();
            await this.sleep(50);
        }
    }
    
    toggleAutoRace() {
        const btn = document.getElementById('autoRace');
        
        if (this.autoRacing) {
            this.autoRacing = false;
            clearInterval(this.autoInterval);
            btn.innerHTML = '<span class="btn-icon">🔄</span> Auto Grow';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
        } else {
            this.autoRacing = true;
            btn.innerHTML = '<span class="btn-icon">⏸</span> Stop';
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
            
            this.autoInterval = setInterval(() => {
                if (this.inputSize < 100) {
                    this.inputSize++;
                } else {
                    this.inputSize = 1;
                    // Clear data points for fresh cycle
                    for (const key of Object.keys(this.dataPoints)) {
                        this.dataPoints[key] = [];
                    }
                }
                document.getElementById('inputSize').value = this.inputSize;
                document.getElementById('inputSizeValue').textContent = this.inputSize;
                this.updateRace();
            }, 100);
        }
    }
    
    drawGraph() {
        if (!this.ctx || !this.canvas) return;
        
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const padding = 60;
        
        // Clear canvas
        ctx.fillStyle = '#12121a';
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        
        const gridLines = 10;
        for (let i = 0; i <= gridLines; i++) {
            const x = padding + (i / gridLines) * (width - padding * 2);
            const y = padding + (i / gridLines) * (height - padding * 2);
            
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Draw axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        
        // X axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Y axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#a0a0b0';
        ctx.font = '12px JetBrains Mono';
        ctx.textAlign = 'center';
        
        // X axis label
        ctx.fillText('Input Size (n)', width / 2, height - 15);
        
        // Y axis label
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Operations', 0, 0);
        ctx.restore();
        
        // Draw complexity curves
        const colors = {
            '1': '#00ff88',
            'logn': '#00f5ff',
            'n': '#ffd700',
            'nlogn': '#ff6b35',
            'n2': '#ff00ff',
            '2n': '#ff0000'
        };
        
        const labels = {
            '1': 'O(1)',
            'logn': 'O(log n)',
            'n': 'O(n)',
            'nlogn': 'O(n log n)',
            'n2': 'O(n²)',
            '2n': 'O(2ⁿ)'
        };
        
        // Calculate theoretical curves up to current n
        const maxN = 100;
        const maxY = maxN * maxN; // n^2 at max
        
        for (const [complexity, color] of Object.entries(colors)) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            let firstPoint = true;
            
            for (let n = 1; n <= this.inputSize; n++) {
                const ops = this.calculateOperations(complexity, n);
                
                // Use log scale for Y to make it visible
                const normalizedX = (n / maxN);
                const normalizedY = Math.min(Math.log10(ops + 1) / Math.log10(maxY + 1), 1);
                
                const x = padding + normalizedX * (width - padding * 2);
                const y = height - padding - normalizedY * (height - padding * 2);
                
                if (firstPoint) {
                    ctx.moveTo(x, y);
                    firstPoint = false;
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        // Draw legend
        const legendX = width - padding - 100;
        let legendY = padding + 20;
        
        ctx.font = '11px JetBrains Mono';
        
        for (const [complexity, color] of Object.entries(colors)) {
            ctx.fillStyle = color;
            ctx.fillRect(legendX, legendY - 8, 20, 3);
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.fillText(labels[complexity], legendX + 30, legendY);
            legendY += 20;
        }
        
        // Draw current n marker
        ctx.fillStyle = '#ffd700';
        ctx.font = '14px JetBrains Mono';
        ctx.textAlign = 'right';
        ctx.fillText(`n = ${this.inputSize}`, width - padding, height - 30);
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize complexity visualizer when DOM is ready
let complexityVisualizer;
document.addEventListener('DOMContentLoaded', () => {
    complexityVisualizer = new ComplexityVisualizer();
});

