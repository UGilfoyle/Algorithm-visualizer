// ========================================
// Algorithm Audio Engine - Genuine Algo Sounds
// Clean beeps, ticks, and satisfying digital sounds
// ========================================

class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.isEnabled = true;
        this.volume = 0.5;
        this.init();
    }

    init() {
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.audioContext.createGain();
                this.masterGain.connect(this.audioContext.destination);
                this.masterGain.gain.value = this.volume;
            }
        }, { once: true });
    }

    setVolume(value) {
        this.volume = value / 100;
        if (this.masterGain) {
            this.masterGain.gain.value = this.volume;
        }
    }

    toggle() {
        this.isEnabled = !this.isEnabled;
        return this.isEnabled;
    }

    // Pure sine wave beep - the classic algorithm sound
    // Maps value to frequency for musical sorting visualization
    playTone(value, maxValue = 100, duration = 50) {
        if (!this.isEnabled || !this.audioContext) return;

        // Map value to frequency (200Hz to 800Hz range - pleasant beep range)
        const minFreq = 200;
        const maxFreq = 800;
        const frequency = minFreq + (value / maxValue) * (maxFreq - minFreq);

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        // Pure sine wave - clean digital beep
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

        oscillator.start(now);
        oscillator.stop(now + duration / 1000);
    }

    // Comparison sound - two quick beeps at different pitches
    playComparison(value1, value2, maxValue = 100) {
        if (!this.isEnabled || !this.audioContext) return;

        const freq1 = 300 + (value1 / maxValue) * 400;
        const freq2 = 300 + (value2 / maxValue) * 400;

        // First beep
        this.playBeep(freq1, 30);
        // Second beep slightly delayed
        setTimeout(() => this.playBeep(freq2, 30), 35);
    }

    // Simple beep helper
    playBeep(frequency, duration = 50) {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

        oscillator.start(now);
        oscillator.stop(now + duration / 1000);
    }

    // Swap sound - satisfying "tick" sound
    playSwap() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'square';

        const now = this.audioContext.currentTime;
        // Quick pitch drop for "tick" effect
        oscillator.frequency.setValueAtTime(1200, now);
        oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.05);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        oscillator.start(now);
        oscillator.stop(now + 0.05);
    }

    // Success sound - ascending arpeggio
    playSuccess() {
        if (!this.isEnabled || !this.audioContext) return;

        const notes = [523, 659, 784]; // C5, E5, G5
        notes.forEach((freq, i) => {
            setTimeout(() => this.playBeep(freq, 100), i * 80);
        });
    }

    // Completion fanfare - satisfying chord
    playComplete() {
        if (!this.isEnabled || !this.audioContext) return;

        // Play a major chord
        const chord = [523, 659, 784, 1047]; // C major with octave
        chord.forEach((freq, i) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.masterGain);

                oscillator.type = 'sine';
                oscillator.frequency.value = freq;

                const now = this.audioContext.currentTime;
                gainNode.gain.setValueAtTime(0.15, now);
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.3);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

                oscillator.start(now);
                oscillator.stop(now + 0.6);
            }, i * 50);
        });
    }

    // Error sound - descending minor
    playError() {
        if (!this.isEnabled || !this.audioContext) return;

        const notes = [400, 350, 300];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playBeep(freq, 150), i * 100);
        });
    }

    // Step sound - soft click for pathfinding
    playStep(depth = 0, maxDepth = 10) {
        if (!this.isEnabled || !this.audioContext) return;

        const frequency = 400 + (depth / maxDepth) * 300;
        this.playBeep(frequency, 30);
    }

    // Visit sound - gentle ping
    playVisit() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';
        oscillator.frequency.value = 600;

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

        oscillator.start(now);
        oscillator.stop(now + 0.04);
    }

    // Path found - triumphant ascending scale
    playPathFound() {
        if (!this.isEnabled || !this.audioContext) return;

        const scale = [523, 587, 659, 698, 784]; // C major scale
        scale.forEach((freq, i) => {
            setTimeout(() => this.playBeep(freq, 80), i * 60);
        });
    }

    // Pop sound - bubble pop effect
    playPop() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';

        const now = this.audioContext.currentTime;
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.08);

        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        oscillator.start(now);
        oscillator.stop(now + 0.08);
    }

    // Merge sound - smooth whoosh
    playMerge() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        const now = this.audioContext.currentTime;
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.linearRampToValueAtTime(400, now + 0.1);

        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Pivot selection - distinctive "ding"
    playPivot() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';
        oscillator.frequency.value = 880; // A5

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        oscillator.start(now);
        oscillator.stop(now + 0.15);
    }

    // Insert sound - soft slide
    playInsert() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';

        const now = this.audioContext.currentTime;
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.linearRampToValueAtTime(600, now + 0.06);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

        oscillator.start(now);
        oscillator.stop(now + 0.06);
    }

    // Heapify - deep rumble
    playHeapify() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'triangle';

        const now = this.audioContext.currentTime;
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.linearRampToValueAtTime(250, now + 0.08);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        oscillator.start(now);
        oscillator.stop(now + 0.08);
    }

    // Battle/Race start - countdown beeps then go
    playBattleStart() {
        if (!this.isEnabled || !this.audioContext) return;

        // Three countdown beeps then a "go" sound
        const beeps = [
            { freq: 440, delay: 0 },
            { freq: 440, delay: 200 },
            { freq: 440, delay: 400 },
            { freq: 880, delay: 600 }
        ];

        beeps.forEach(({ freq, delay }) => {
            setTimeout(() => {
                const dur = delay === 600 ? 200 : 100;
                this.playBeep(freq, dur);
            }, delay);
        });
    }

    // Section change - soft chime
    playSectionChange() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';
        oscillator.frequency.value = 523; // C5

        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Ball moving sound - whoosh effect
    playBallMove() {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        // White noise-ish whoosh
        oscillator.type = 'sawtooth';
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 5;

        const now = this.audioContext.currentTime;
        oscillator.frequency.setValueAtTime(100, now);
        filter.frequency.setValueAtTime(500, now);
        filter.frequency.linearRampToValueAtTime(3000, now + 0.1);

        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Race tick - continuous ticking during race
    playRaceTick(position = 0) {
        if (!this.isEnabled || !this.audioContext) return;

        const freq = 300 + position * 50;
        this.playBeep(freq, 20);
    }

    // Winner sound - triumphant
    playWinner() {
        if (!this.isEnabled || !this.audioContext) return;

        const fanfare = [784, 988, 1175, 1568]; // G5, B5, D6, G6
        fanfare.forEach((freq, i) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.masterGain);

                oscillator.type = 'square';
                oscillator.frequency.value = freq;

                const now = this.audioContext.currentTime;
                gainNode.gain.setValueAtTime(0.15, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

                oscillator.start(now);
                oscillator.stop(now + 0.3);
            }, i * 100);
        });
    }
}

// Global audio engine instance
const audioEngine = new AudioEngine();

// Setup audio controls
document.addEventListener('DOMContentLoaded', () => {
    const audioToggle = document.getElementById('audioToggle');
    const volumeSlider = document.getElementById('volumeSlider');

    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            const isEnabled = audioEngine.toggle();
            const audioOn = audioToggle.querySelector('.audio-on');
            const audioOff = audioToggle.querySelector('.audio-off');
            if (audioOn) audioOn.style.display = isEnabled ? 'inline' : 'none';
            if (audioOff) audioOff.style.display = isEnabled ? 'none' : 'inline';
        });
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audioEngine.setVolume(e.target.value);
        });
    }
});
