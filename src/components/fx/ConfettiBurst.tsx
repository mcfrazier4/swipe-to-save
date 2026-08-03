import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  shape: 'rect' | 'dot';
  life: number;
}

function readPalette(el: HTMLElement): string[] {
  const raw = getComputedStyle(el).getPropertyValue('--confetti-colors');
  const colors = raw
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
  return colors.length ? colors : ['#f2336b', '#ffc531', '#00a99f'];
}

/**
 * One-shot canvas confetti filling its parent. Bursts from the top
 * center, tumbles down under gravity, and stops on its own.
 */
export function ConfettiBurst({ duration = 2000 }: { duration?: number }) {
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
    const particles: Particle[] = Array.from({ length: 130 }, () => {
      const angle = Math.random() * Math.PI - Math.PI; // upward fan
      const speed = 3 + Math.random() * 7;
      return {
        x: width / 2 + (Math.random() - 0.5) * 60,
        y: height * 0.28,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.35,
        w: 5 + Math.random() * 6,
        h: 3 + Math.random() * 5,
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: Math.random() > 0.35 ? 'rect' : 'dot',
        life: 1,
      };
    });

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.vy += 0.16;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life = Math.max(0, 1 - t / duration);
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (t < duration) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, width, height);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden />;
}
