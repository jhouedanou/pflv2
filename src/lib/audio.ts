// Audio utility for workout timer sounds
class AudioManager {
  private context: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Beep sound for countdown
  private playBeep(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.context) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration);
  }

  // Short beep for countdown (3, 2, 1)
  playCountdownBeep() {
    this.playBeep(800, 0.1, 0.3);
  }

  // Final beep when timer ends
  playFinalBeep() {
    this.playBeep(1200, 0.3, 0.4);
    setTimeout(() => this.playBeep(1200, 0.3, 0.4), 150);
  }

  // Success sound when exercise is completed
  playSuccess() {
    this.playBeep(600, 0.1, 0.3);
    setTimeout(() => this.playBeep(800, 0.1, 0.3), 100);
    setTimeout(() => this.playBeep(1000, 0.2, 0.3), 200);
  }
}

export const audioManager = new AudioManager();
