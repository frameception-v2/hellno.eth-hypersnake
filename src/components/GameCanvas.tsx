"use client";

import { useEffect, useRef, useCallback } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const ctx2dRef = useRef<CanvasRenderingContext2D | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement>();
  const animationFrameRef = useRef<number>();

  // Setup resize observer and double buffering
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Create main canvas context
    const gl = canvas.getContext('webgl2', { alpha: false, antialias: true }) || 
                canvas.getContext('experimental-webgl2', { alpha: false, antialias: true });
    const ctx2d = canvas.getContext('2d');
    
    if (!gl && !ctx2d) {
      console.error('Failed to get any rendering context');
      return;
    }

    // Create offscreen canvas for double buffering
    const offscreen = document.createElement('canvas');
    offscreenRef.current = offscreen;
    let offscreenCtx: CanvasRenderingContext2D | WebGL2RenderingContext | null = null;
    
    if (gl) {
      glRef.current = gl;
      // WebGL setup
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 1);
    } else if (ctx2d) {
      ctx2dRef.current = ctx2d;
      offscreenCtx = offscreen.getContext('2d');
    }

    const resizeCanvases = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const width = rect.width * dpr;
      const height = rect.height * dpr;

      // Set main canvas dimensions
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Set offscreen canvas dimensions
      if (offscreen) {
        offscreen.width = width;
        offscreen.height = height;
      }

      // Clear/resize viewport
      if (gl) {
        gl.viewport(0, 0, width, height);
      }
    };

    const observer = new ResizeObserver(() => {
      resizeCanvases();
      // Render initial frame
      animationFrameRef.current = requestAnimationFrame(() => {
        if (glRef.current) {
          const gl = glRef.current;
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        } else if (ctx2dRef.current && offscreenRef.current) {
          const ctx = ctx2dRef.current;
          const offscreen = offscreenRef.current;
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.drawImage(offscreen, 0, 0);
        }
      });
    });

    observer.observe(container);
    resizeCanvases();

    return () => {
      observer.unobserve(container);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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
