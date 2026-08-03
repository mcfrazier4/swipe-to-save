import { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  decay: number;
  size: number;
}

function readPalette(el: HTMLElement): string[] {
  const styles = getComputedStyle(el);
  const raw = styles.getPropertyValue('--firework-colors') || styles.getPropertyValue('--confetti-colors');
  const colors = raw
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
  return colors.length ? colors : ['#ff5c8a', '#ffd34d', '#2be5d6'];
}

/**
 * Finale fireworks: staggered shell bursts around the card, additive
 * blending for glow, self-terminating.
 */
export function Fireworks({ duration = 3600 }: { duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const palette = readPalette(canvas);
    const isLight = canvas.closest('[data-theme]')?.getAttribute('data-theme') === 'light';
    const sparks: Spark[] = [];

    // bursts ring the card: corners, edges, then center-top crescendo
    const bursts = [
      { x: 0.16, y: 0.24, at: 0 },
      { x: 0.86, y: 0.32, at: 260 },
      { x: 0.12, y: 0.66, at: 560 },
      { x: 0.88, y: 0.72, at: 840 },
      { x: 0.5, y: 0.12, at: 1150 },
      { x: 0.24, y: 0.42, at: 1500 },
      { x: 0.78, y: 0.52, at: 1800 },
      { x: 0.5, y: 0.4, at: 2150 },
    ];

    const explode = (bx: number, by: number) => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      const count = 56 + Math.floor(Math.random() * 24);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.12;
        const speed = 2 + Math.random() * 4.2;
        sparks.push({
          x: bx * width,
          y: by * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          // white-hot cores only work over the dark theme's night sky
          color: !isLight && Math.random() > 0.75 ? '#ffffff' : color,
          life: 1,
          decay: 0.012 + Math.random() * 0.012,
          size: 2 + Math.random() * 2.2,
        });
      }
    };

    const start = performance.now();
    let fired = 0;
    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      while (fired < bursts.length && bursts[fired].at <= t) {
        explode(bursts[fired].x, bursts[fired].y);
        fired++;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vy += 0.035;
        s.vx *= 0.985;
        s.vy *= 0.985;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';
      if (t < duration || sparks.length) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, width, height);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return <canvas ref={canvasRef} className="fx-canvas fx-canvas--fireworks" aria-hidden />;
}
