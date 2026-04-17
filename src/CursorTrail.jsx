import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let W, H;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const LENGTH = 20;
    const pts = [];
    let mouse = null;
    let head = { x: 0, y: 0 };
    let animId;

    const lerp = (a, b, t) => a + (b - a) * t;
    const EASE = 0.08;

    const onMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      if (mouse) {
        head.x = lerp(head.x, mouse.x, EASE);
        head.y = lerp(head.y, mouse.y, EASE);
        pts.unshift({ x: head.x, y: head.y });
        if (pts.length > LENGTH) pts.length = LENGTH;
      }

      if (pts.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const mx = (pts[i].x + pts[i + 1].x) / 2;
          const my = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",  // ← lets clicks pass through to your components
          zIndex: 0,
        }}
      />
    </div>
  );
}