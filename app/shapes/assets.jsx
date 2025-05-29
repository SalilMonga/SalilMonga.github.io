import * as THREE from "three";
import { Howl } from "howler";

export const GeometriesList = [
  {
    position: [-1.4, 2, -3],
    rate: 0.6,
    geometry: new THREE.IcosahedronGeometry(2), // Gem
  },
  {
    position: [1, -0.75, 4],
    rate: 0.7,
    geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
  },
  {
    position: [0, 0, 0],
    rate: 0.8,
    geometry: new THREE.TorusKnotGeometry(2, 0.5, 100, 10), // Knot
  },
  {
    position: [-0.8, -0.75, 5],
    rate: 0.75,
    geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut
  },
  {
    position: [1.6, 1.6, -2.5],
    rate: 0.7,
    geometry: new THREE.OctahedronGeometry(1.5), // Diamond
  },
];

export const MaterialsList = [
  new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
  new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
  new THREE.MeshStandardMaterial({
    color: 0xf1c40f,
    roughness: 0.4,
    metalness: 0.8,
  }),
  new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
  new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
  new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0x2980b9,
  }),
  new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.1,
    metalness: 0.8,
  }),
  new THREE.MeshStandardMaterial({
    color: 0x9b59b6,
    roughness: 0.1,
    metalness: 1,
  }),

  new THREE.MeshStandardMaterial({
    color: 0x0984e3,
    roughness: 0.1,
    metalness: 1,
  }),
];

export const SoundEffectsList = [
  new Howl({ src: ["/sounds/sound1.mp3"] }),
  new Howl({ src: ["/sounds/sound2.mp3"] }),
  new Howl({ src: ["/sounds/sound3.mp3"] }),
  new Howl({ src: ["/sounds/sound4.mp3"] }),
  new Howl({ src: ["/sounds/sound5.mp3"] }),
  new Howl({ src: ["/sounds/sound6.mp3"] }),
  new Howl({ src: ["/sounds/sound7.mp3"] }),
  new Howl({ src: ["/sounds/sound8.mp3"] }),
  new Howl({ src: ["/sounds/sound9.mp3"] }),
  new Howl({ src: ["/sounds/sound10.mp3"] }),
  new Howl({ src: ["/sounds/sound11.mp3"] }),
  new Howl({ src: ["/sounds/sound12.mp3"] }),
  new Howl({ src: ["/sounds/sound13.mp3"] }),
  new Howl({ src: ["/sounds/sound14.mp3"] }),
  new Howl({ src: ["/sounds/sound15.mp3"] }),
];
