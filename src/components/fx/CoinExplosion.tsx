import { useEffect, useRef } from 'react';

interface Coin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  spin: number;
  life: number;
}

/**
 * The finale's payoff: a fountain of hundreds of coins erupting from
 * the piggy's position, spinning (ellipse-squash) as they arc and
 * rain past the card. Shares the fireworks' oversized canvas so
 * coins fly beyond the card bounds. Self-terminating.
 */
export function CoinExplosion({ delay = 0, duration = 3000 }: { delay?: number; duration?: number }) {
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

    const styles = getComputedStyle(canvas);
    const gold = styles.getPropertyValue('--sun').trim() || '#ffc531';
    const rim = styles.getPropertyValue('--tang').trim() || '#f26a1b';

    // the canvas extends 170px above / -24px around the card; the piggy
    // sits near the upper-middle of the celebration card
    const originX = width / 2;
    const originY = 170 + (height - 340) * 0.34;

    const coins: Coin[] = [];
    const spawnBurst = (count: number, speedScale: number) => {
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.4; // upward fan
        const speed = (4 + Math.random() * 7.5) * speedScale;
        coins.push({
          x: originX + (Math.random() - 0.5) * 36,
          y: originY + (Math.random() - 0.5) * 24,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 4.5 + Math.random() * 4,
          phase: Math.random() * Math.PI * 2,
          spin: 0.18 + Math.random() * 0.3,
          life: 1,
        });
      }
    };

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      ctx.clearRect(0, 0, width, height);
      for (let i = coins.length - 1; i >= 0; i--) {
        const c = coins[i];
        c.vy += 0.3;
        c.vx *= 0.995;
        c.x += c.vx;
        c.y += c.vy;
        c.phase += c.spin;
        if (t > duration * 0.7) c.life = Math.max(0, c.life - 0.045);
        if (c.y > height + 24 || c.life <= 0) {
          coins.splice(i, 1);
          continue;
        }
        const squash = Math.max(Math.abs(Math.sin(c.phase)), 0.22);
        ctx.save();
        ctx.globalAlpha = c.life;
        ctx.translate(c.x, c.y);
        ctx.fillStyle = gold;
        ctx.strokeStyle = rim;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(0, 0, c.size, c.size * squash, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      if (t < duration || coins.length) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, width, height);
    };

    const timers = [
      setTimeout(() => {
        spawnBurst(150, 1);
        raf = requestAnimationFrame(tick);
      }, delay),
      setTimeout(() => spawnBurst(70, 0.75), delay + 140),
    ];
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [delay, duration]);

  return <canvas ref={canvasRef} className="fx-canvas fx-canvas--fireworks fx-canvas--coins" aria-hidden />;
}
