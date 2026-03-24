# 3D Desk Scene — Design Spec

## Overview

Replace the current CSS/DOM-based DeskView with a Three.js (React Three Fiber) 3D desk scene. The desk is a dark, moody workspace with dual monitors on a single arm mount, a keyboard, and placeholder objects — rendered semi-realistically with PBR materials and subtle ambient motion.

This is Phase 1: geometry, lighting, camera, and ambient feel. Interactive object content (click-to-focus, story panels) comes later.

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Realism level | Semi-realistic | PBR materials, proper lighting/shadows. Premium without being heavy. |
| Construction method | Hybrid (procedural base) | All V1 objects are procedural Three.js geometry. Architecture supports swapping in .glb models later. |
| Camera | Constrained orbital | Mouse-driven subtle orbit (±10° horizontal, ±5° vertical). No zoom/pan. Damped for soft physics feel. |
| Interaction (V1) | Ambient only | Monitor glow pulses, subtle screen gradient shifts. No click interactions yet. |
| Interaction (future) | Click-to-focus | Hover glow → click zooms camera to object → DOM overlay panel. Designed for, not built yet. |
| Monitor mount | Dual arm | Single pole clamped to desk rear-center, two arms branching to hold floating monitors. Clean, intentional. |
| Desk style | Modern slab | Floating slab, no visible legs. Simple geometry, ships fast. |

---

## Scene Composition

### Objects

1. **Desk surface** — Rounded box, dark matte material (dark wood tone or charcoal). Floating slab with no legs. Roughly 3:1 width-to-depth ratio.

2. **Monitor arm** — Single vertical pole at desk rear-center. Two horizontal arms branching left and right, each ending at a monitor mount point. Thin cylindrical geometry. Dark metallic material (metalness: 0.8, roughness: 0.3).

3. **Main monitor (left-center)** — Larger screen (~27" proportions). Thin bezel frame (dark, near-black). Screen is a self-lit plane with emissive gradient in accent color (`#6B9FC8`). Slightly angled toward center. Connected to left arm.

4. **Secondary monitor (right)** — Same or slightly smaller. Same construction. Slightly angled toward center. Connected to right arm.

5. **Keyboard** — Low-profile rectangular slab on desk surface. Dark material, subtle rounded edges. Centered below monitors.

6. **Placeholder objects (2-3)** — Simple geometric shapes (rounded box, cylinder, sphere) placed on desk surface at positions where VR headset, car model, notebook will eventually go. Subtle accent-color emissive edge/outline to hint at future interactivity.

### Environment

- Background: matches site background `#18181B` (set as scene background and CSS)
- No visible room geometry (walls, floor) — the desk floats in darkness
- Contact shadows beneath objects via `@react-three/drei` `ContactShadows`

### Lighting

- **Ambient light** — low intensity (0.15–0.2), warm-neutral tone. Provides base fill so nothing is pure black.
- **Directional light** — from above-left (position roughly [-3, 5, 2]). Moderate intensity (0.6–0.8). Casts soft shadows.
- **Monitor glow** — each monitor has a point light in front of its screen, accent color, low intensity (0.3–0.5), small distance. Creates the signature desk glow on the surface below.

### Camera

- **Position**: elevated, slightly in front of desk center. Roughly (0, 3, 5) looking at (0, 1, 0).
- **Controls**: `OrbitControls` from `@react-three/drei`
  - `minPolarAngle` / `maxPolarAngle`: constrain vertical to ±5° from default
  - `minAzimuthAngle` / `maxAzimuthAngle`: constrain horizontal to ±10° from default
  - `enableZoom: false`
  - `enablePan: false`
  - `enableDamping: true`, `dampingFactor: 0.05`
  - `autoRotate: false`
- **Feel**: mouse movement anywhere on the page subtly shifts the view. No click-drag required. Soft, weighted motion.

### Ambient Motion

- Monitor screens: very slow gradient hue shift (cycle over 8–12 seconds), subtle opacity breathing
- Monitor glow point lights: gentle intensity oscillation (±0.1 over 4–6 seconds)
- Nothing else moves — restraint is intentional

---

## Technical Architecture

### File Structure

```
app/v2/components/desk/
├── DeskScene.tsx          # R3F Canvas, lighting, camera, ContactShadows, Suspense
├── DeskSurface.tsx        # Desk slab geometry + material
├── MonitorArm.tsx         # Pole + two arm branches (cylinders)
├── Monitor.tsx            # Reusable: frame (box) + screen (plane with emissive)
├── Keyboard.tsx           # Low-profile slab
├── PlaceholderObject.tsx  # Generic shape with accent glow outline
└── DeskView.tsx           # (refactored) Mounts DeskScene, handles scroll fade-in, Suspense fallback
```

### Component Responsibilities

**DeskScene.tsx**
- Wraps everything in `<Canvas>`
- Sets up camera (perspective, position, fov)
- Configures `OrbitControls` with constraints
- Places lighting (ambient + directional + monitor point lights)
- Adds `ContactShadows` on a plane below the desk
- Composes all object components
- Handles ambient animation loops (useFrame for glow oscillation)

**DeskSurface.tsx**
- Single `RoundedBox` from drei (or box with bevel)
- `meshStandardMaterial` with dark wood/charcoal color, roughness ~0.8, metalness ~0.1
- Receives shadows

**MonitorArm.tsx**
- Vertical pole: thin cylinder at desk rear-center
- Two horizontal arms: thin cylinders branching left and right
- Optional: small joint spheres at connection points
- Dark metallic material (roughness: 0.3, metalness: 0.8)

**Monitor.tsx**
- Props: `position`, `rotation`, `size` (width/height), `screenColor`
- Frame: thin box around screen, near-black material
- Screen: plane with `meshBasicMaterial`, emissive accent color
- Each instance can have unique screen content later

**Keyboard.tsx**
- Thin rounded box, dark matte material
- Positioned on desk surface, centered below monitors

**PlaceholderObject.tsx**
- Props: `position`, `shape` ('box' | 'cylinder' | 'sphere'), `size`
- Simple geometry with dark base material
- Subtle emissive edge glow in accent color (can use `Edges` from drei)

**DeskView.tsx (refactored)**
- Removes old CSS parallax layers, monitor panels, skills/projects DOM content
- Keeps `useInViewOnce` for scroll-triggered fade-in
- Wraps `DeskScene` in `<Suspense>` with a minimal loading state
- Handles the section container, background color, and CSS transition from hero
- Any future DOM overlays (click-to-focus panels) mount here as siblings to the Canvas

### Materials Summary

| Object | Material | Color | Roughness | Metalness | Notes |
|--------|----------|-------|-----------|-----------|-------|
| Desk | meshStandardMaterial | #3a2a1a (dark wood) | 0.8 | 0.1 | Receives shadows |
| Monitor frame | meshStandardMaterial | #1a1a1a | 0.5 | 0.3 | Near-black |
| Monitor screen | meshBasicMaterial | #6B9FC8 | — | — | Emissive, self-lit |
| Monitor arm | meshStandardMaterial | #2a2a2a | 0.3 | 0.8 | Dark chrome |
| Keyboard | meshStandardMaterial | #252525 | 0.7 | 0.2 | Matte dark |
| Placeholders | meshStandardMaterial | #2a2a2e | 0.6 | 0.2 | + accent edge glow |

### Integration Points

- **Replaces**: current CSS parallax DeskView implementation
- **Keeps**: `useInViewOnce` hook for scroll-triggered entrance
- **Removes**: `usePeripheralParallax` dependency for desk section (OrbitControls replaces it)
- **Preserves**: scroll-triggered opacity transition from V2Hero → DeskView
- **Dependencies**: `three`, `@react-three/fiber`, `@react-three/drei` (all already installed)

---

## What This Spec Does NOT Cover (Future Phases)

- Click-to-focus object interaction and DOM overlay panels
- Actual content on monitor screens (code editor, project previews)
- Detailed .glb models replacing placeholder objects
- Garage transition (Level 3)
- XR layer (Level 4)
- Scroll animation between Hero and Desk sections (separate spec)

---

## Success Criteria

The desk scene succeeds if:
- It feels like a real, moody workspace — not a tech demo
- The monitor glow creates atmosphere without being distracting
- The subtle orbital camera makes visitors realize "this is 3D" within 2 seconds
- It loads fast (< 1 second on modern hardware, no .glb files to fetch)
- The architecture cleanly supports adding detailed models and interactions later
