"use client";

import { useEffect, useRef, useCallback } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement>();

  // Setup resize observer and double buffering
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('webgl2') || canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to initialize rendering context');
      return;
    }

    // Create offscreen canvas for double buffering
    offscreenRef.current = document.createElement('canvas');
    
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      
      // Set display canvas size
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Set offscreen canvas size
      offscreenRef.current!.width = width * devicePixelRatio;
      offscreenRef.current!.height = height * devicePixelRatio;
      
      // Initialize viewport
      if ('webgl2' in ctx) {
        (ctx as WebGL2RenderingContext).viewport(0, 0, canvas.width, canvas.height);
      }
    });

    resizeObserver.observe(container);
    
    return () => {
      resizeObserver.unobserve(container);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          touchAction: 'none',
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  );
}
