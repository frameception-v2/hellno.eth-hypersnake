```markdown
# HyperSnake Frame v2 Specification Document

## 1. OVERVIEW

### Core Functionality
- Mobile-first Snake game implementation within Farcaster Frame v2
- Real-time canvas rendering with dynamic speed mechanics
- Score tracking with exponential speed increase after 2 food consumptions
- Retro cyberpunk visual theme with green snake and neon accents
- Touch-optimized directional controls

### UX Flow
1. Frame Entry: 
   - Loading screen with cyberpunk-style loader
   - Start screen with animated title + instructions overlay
2. Gameplay:
   - Responsive canvas renders snake movement
   - Food spawns at random positions
   - Score updates in real-time
3. Progressive Difficulty:
   - Speed multiplier applied after 2nd food collected
   - Exponential acceleration curve (base 1.15)
4. Game Over:
   - Final score display
   - Restart button with glow effect
   - Optional share-to-feed capability

## 2. TECHNICAL REQUIREMENTS

### Frontend Components
```html
<div class="cyber-container">
  <canvas id="gameCanvas"></canvas>
  <div class="hud">
    <h2 class="neon-text">SCORE: <span id="score">0</span></h2>
    <p class="instruction-text">SWIPE or ARROWS to move</p>
  </div>
  <div class="touch-controls">
    <button class="d-pad up">↑</button>
    <button class="d-pad left">←</button>
    <button class="d-pad right">→</button>
    <button class="d-pad down">↓</button>
  </div>
</div>
```

### API Integrations
- Farcaster Frame SDK for:
  - Wallet context awareness
  - Frame dimension detection
  - Social sharing capabilities
- Window Performance API for:
  - Animation frame optimization
  - Touch gesture velocity calculation

### State Management
```typescript
type GameState = {
  snake: Array<{x: number, y: number}>;
  food: {x: number, y: number};
  direction: 'up'|'down'|'left'|'right';
  score: number;
  speed: number;
  multiplier: number;
};

const [state, dispatch] = useReducer(gameReducer, initialState);
```
- Optimized React state transitions for 60fps performance
- Web Workers for collision detection calculations

### Mobile Responsiveness
1. Viewport meta tag configuration:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```
2. CSS Grid layout with aspect-ratio locking
3. Dynamic canvas sizing:
```javascript
function resizeCanvas() {
  const container = document.querySelector('.cyber-container');
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight * 0.8;
}
```

## 3. FRAMES v2 IMPLEMENTATION

### Interactive Elements
- Canvas-based collision detection
- Touch gesture recognition:
  - Swipe direction analysis
  - Tap zones for control overlay
- Keyboard event fallback (WASD/arrows)

### Animation System
1. Snake segment glow effect:
```css
.snake-segment {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}
```
2. Food spawn particle effect using Canvas API

### Input Handling
- Hammer.js for touch gesture recognition
- Custom debounce system for direction changes
- Priority queue for input buffering

### Notification System
- Farcaster achievement toast on:
  - First food collected
  - Speed multiplier activation
  - New high score

### Sharing Features
- Encoded game state in Frame URL
- Social share button generates:
  - Screenshot of final score
  - Deep link to current game state

## 4. MOBILE CONSIDERATIONS

### Touch Optimization
- 300ms tap delay removal
```css
touch-action: manipulation;
```
- Directional pad with size adaptation:
```css
.d-pad {
  min-width: 15vw;
  min-height: 15vw;
}
```
- Hover state suppression for mobile
- Vibration API feedback on collisions

### Responsive Techniques
1. CSS clamp() for typography
```css
.instruction-text {
  font-size: clamp(0.75rem, 2.5vw, 1rem);
}
```
2. Flexbox-based HUD positioning
3. Orientation change handlers:
```javascript
window.addEventListener('orientationchange', resizeCanvas);
```

### Performance
- Off-screen canvas buffering
- Memory-optimized snake array (circular buffer)
- GPU-accelerated transforms:
```css
canvas {
  will-change: transform;
}
```
- Critical CSS inlining

## 5. CONSTRAINTS COMPLIANCE

### Confirmed Limitations
1. No database requirements - State persists only per session
2. No smart contracts - Pure client-side logic
3. No external APIs beyond Farcaster SDK
4. No complex features:
   - Single-player mode only
   - Local storage only for high score
   - No multiplayer or social graph integration

### Complexity Boundaries
- Max snake length: 255 segments (Uint8Array optimization)
- Speed ceiling at 2x initial rate
- Limited color palette for performance
- 2D collision only (no z-index layers)
```