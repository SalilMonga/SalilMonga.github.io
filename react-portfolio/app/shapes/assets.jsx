import * as THREE from "three";

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

const createAudio = (file) => {
  if (typeof window !== "undefined") {
    return new Audio(file);
  }
  return null;
};

export const SoundEffectsList = [
  createAudio("/sounds/sound1.ogg"),
  createAudio("/sounds/sound2.ogg"),
  createAudio("/sounds/sound3.ogg"),
  createAudio("/sounds/sound4.ogg"),
  createAudio("/sounds/sound5.ogg"),
  createAudio("/sounds/sound6.ogg"),
  createAudio("/sounds/sound7.ogg"),
  createAudio("/sounds/sound8.ogg"),
  createAudio("/sounds/sound9.ogg"),
  createAudio("/sounds/sound10.ogg"),
  createAudio("/sounds/sound11.ogg"),
  createAudio("/sounds/sound12.ogg"),
  createAudio("/sounds/sound13.ogg"),
  createAudio("/sounds/sound14.ogg"),
  createAudio("/sounds/sound15.ogg"),
];
