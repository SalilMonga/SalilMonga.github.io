"use client";
import { Howl, Howler } from "howler";

let transitionSound: Howl | null = null;
let _isMuted = true;

// Reusable AudioContext for synthetic sounds
let _audioCtx: AudioContext | null = null;
function getAudioContext(): AudioContext {
  if (!_audioCtx) {
    _audioCtx = new AudioContext();
  }
  return _audioCtx;
}

function getTransitionSound(): Howl {
  if (!transitionSound) {
    transitionSound = new Howl({ src: ["/sounds/sound1.mp3"], volume: 0.15 });
  }
  return transitionSound;
}

/**
 * Synthesized click: a warm, short "pop" using Web Audio API.
 * Sine wave at ~900Hz with fast exponential decay — feels like
 * a soft, satisfying toggle. No file dependency.
 */
function playSyntheticClick() {
  if (_isMuted) return;

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Oscillator — warm sine pop
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(900, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

  // Gain envelope — quick attack, smooth decay
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
}

/**
 * Synthesized hover: an even subtler, higher-pitched tick.
 */
function playSyntheticHover() {
  if (_isMuted) return;

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

export function playHoverSound() {
  playSyntheticHover();
}

export function playClickSound() {
  playSyntheticClick();
}

export function playTransitionSound() {
  getTransitionSound().play();
}

export function setMuted(muted: boolean) {
  _isMuted = muted;
  Howler.mute(muted);
}

export function isMuted(): boolean {
  return _isMuted;
}
