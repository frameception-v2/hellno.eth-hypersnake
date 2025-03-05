Here's the optimized prompt sequence for incremental implementation:

```markdown
# Phase 1: Core Infrastructure Setup

## Prompt 1: Initialize Next.js Project Structure
```text
Using Next.js 14 with TypeScript, create a new project with:
- Customized layout.tsx with cyberpunk theme colors (#00ff88 primary)
- /app directory structure with core pages
- Add Farcaster Frame SDK configuration
- Set up initial CSS with:
  - CSS Grid for root layout
  - Viewport meta tags for mobile
  - Clamped typography scale
- Custom _document.tsx with critical CSS inlined
- Title set to "HyperSnake v2" with favicon
```

## Prompt 2: Canvas Context Setup
```text
Create a GameCanvas component with:
- Dynamic sizing using ResizeObserver
- Double buffering technique
- WebGL2 context fallback to 2D
- GPU-accelerated transforms via will-change
- Frame rate counter overlay (dev only)
- Cleanup handlers for resize events
```

## Prompt 3: Game State Management
```text
Implement React reducer for game state:
- TypeScript types for GameState
- Immutable updates with Immer
- Circular buffer for snake segments
- Local storage integration for high score
- Reducer actions for:
  - MOVE_SNAKE
  - SPAWN_FOOD
  - UPDATE_SCORE
  - RESET_GAME
- Performance optimizations for 60fps
```

# Phase 2: Core Gameplay Implementation

## Prompt 4: Snake Movement System
```text
Create movement controller with:
- Velocity-based update loop using requestAnimationFrame
- Direction queue for input buffering
- Collision detection worker thread
- Edge wrapping logic
- Speed multiplier system (base 1.15)
- Food consumption checks
- Segment growth mechanics
```

## Prompt 5: Rendering Pipeline
```text
Implement canvas rendering system:
- Snake segment glow effect using composite operations
- Food particle animation with requestAnimationFrame
- Optimized path drawing for snake body
- HUD overlay rendering with score display
- Dynamic color gradients based on speed
- Off-screen canvas buffering
```

## Prompt 6: Touch Input Handling
```text
Add mobile input system with:
- Hammer.js swipe recognition
- Virtual D-pad overlay
- Touch event normalization
- Input debouncing (150ms threshold)
- Vibration API integration for feedback
- Priority system for conflicting inputs
- Keyboard event fallback (arrows/WASD)
```

# Phase 3: Farcaster Integration

## Prompt 7: Frame Metadata Setup
```text
Implement Frame metadata in page.tsx:
- Dynamic frame dimensions based on viewport
- Wallet context integration
- Shareable state URL encoding
- Frame button handlers for:
  - Restart game
  - Share score
  - Toggle controls
- Post-init game validation
```

## Prompt 8: Social Features
```text
Add social sharing capabilities:
- Score screenshot using html2canvas
- Frame action post redirects
- Deep link preservation
- Achievement toast system
- High score comparison
- Temporary session storage
- Farcaster user mention tagging
```

# Phase 4: Polish & Optimization

## Prompt 9: Mobile Performance Tweaks
```text
Implement mobile optimizations:
- Touch-action: manipulation CSS
- Orientation change handlers
- Memory-optimized buffers
- Critical CSS extraction
- GPU particle rendering
- Web worker task partitioning
- Frame rate limiter for slow devices
```

## Prompt 10: Final Game Flow
```text
Connect all systems with:
- Game start/over state transitions
- Speed multiplier visual feedback
- Loading screen with progress bar
- Input system enable/disable toggles
- Sound effects manager stub
- Analytics event tracking
- Final integration tests
```

# Phase 5: Post-Launch Features

## Prompt 11: Experimental Features
```text
Add optional stretch goals:
- WebGL shader effects
- Daily challenge system
- Snake skin unlocks
- Social leaderboard stub
- Replay system
- Battery level optimizations
- Advanced haptic patterns
```
```

Implementation Strategy:
1. Each prompt builds on previous components
2. Critical path: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 10
3. Mobile optimizations added after core gameplay
4. Social features implemented last to avoid distractions
5. Each step includes integration with existing systems
6. Performance monitoring added at each phase

Key Challenge Mitigations:
- Double buffering prevents canvas flicker
- Web Workers keep main thread responsive
- Input queuing avoids missed controls
- Speed ceiling prevents unplayable states
- CSS containment improves paint performance
- Touch normalization handles device variations

Mobile-Specific Considerations:
- Viewport units for control sizing
- Orientation change handlers
- Touch-action CSS properties
- Vibration API feedback
- Performance budget enforcement
- Mobile-first media queries
- Input latency optimizations