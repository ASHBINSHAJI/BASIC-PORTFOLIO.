import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  vx: number;
  vy: number;
}

export const EnergyTrails = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const prev = mouseRef.current;
      const vx = e.clientX - prev.x;
      const vy = e.clientY - prev.y;
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Only emit when moving
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed > 2) {
        const count = Math.min(Math.floor(speed / 8), 3);
        for (let i = 0; i < count; i++) {
          pointsRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            age: 0,
            vx: vx * 0.1 + (Math.random() - 0.5) * 2,
            vy: vy * 0.1 + (Math.random() - 0.5) * 2,
          });
        }
      }
    };
    window.addEventListener("mousemove", handleMove);

    const maxAge = 60;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = pointsRef.current;

      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.age > maxAge) {
          pts.splice(i, 1);
          continue;
        }

        const life = 1 - p.age / maxAge;
        const alpha = life * 0.4;
        const size = life * 3;

        // Orange core
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(24, 100%, 55%, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(24, 100%, 50%, ${alpha * 0.15})`;
        ctx.fill();
      }

      // Keep array bounded
      if (pts.length > 200) pts.splice(0, pts.length - 200);

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
