import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import font from './fontElegant.json';

const GRID_ROWS = 30;
const GRID_COLS = 80;
const MAX_CELL = 15;      // cell size in px on large screens
const HISTORY_STEPS = 50; // how many life steps to simulate (played backwards)
const STEP_MS = 60;       // ms per frame
const HOLD_MS = 500;      // pause on the finished text before zooming
const BG = '#0a0a0a';

/* ---------- layout (responsive) ---------- */

const getLayout = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cell = Math.max(3, Math.min(MAX_CELL, Math.floor(w / (GRID_COLS + 4))));
  const ox = Math.round((w - GRID_COLS * cell) / 2);
  const oy = Math.round((h - GRID_ROWS * cell) / 2);
  return { w, h, cell, ox, oy };
};

/* ---------- game of life logic ---------- */

const textToGrid = (text) => {
  const grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false));
  const upper = text.toUpperCase();
  const startRow = Math.floor(GRID_ROWS / 2) - 2; // 5 rows tall -> vertically centred
  const totalWidth = upper.length * 6 - 1;
  const startCol = Math.floor(GRID_COLS / 2) - Math.floor(totalWidth / 2);

  for (let i = 0; i < upper.length; i++) {
    const pattern = font[upper[i]] || font[' '];
    const colOffset = startCol + i * 6;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (pattern[row][col]) {
          const r = startRow + row;
          const c = colOffset + col;
          if (r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS) grid[r][c] = true;
        }
      }
    }
  }
  return grid;
};

const countNeighbors = (grid, row, col) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const r = row + i;
      const c = col + j;
      if (r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS && grid[r][c]) count++;
    }
  }
  return count;
};

const nextState = (grid) =>
  grid.map((rowArr, i) =>
    rowArr.map((alive, j) => {
      const n = countNeighbors(grid, i, j);
      return alive ? n === 2 || n === 3 : n === 3;
    })
  );

// history[0] = the text, history[last] = the chaos. We play it from last -> 0.
const buildHistory = (text) => {
  const history = [textToGrid(text)];
  for (let i = 0; i < HISTORY_STEPS; i++) history.push(nextState(history[i]));
  return history;
};

/* ---------- drawing: dark sheet with the live cells punched out ---------- */

const drawFrame = (canvas, grid) => {
  if (!canvas) return;
  const { w, h, cell, ox, oy } = getLayout();
  const dpr = window.devicePixelRatio || 1;

  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {
      if (grid[i][j]) ctx.clearRect(ox + j * cell, oy + i * cell, cell, cell);
    }
  }
};

/* ---------- zoom target: the text pixel closest to the screen centre ---------- */

const getPivot = (finalGrid) => {
  const { w, h, cell, ox, oy } = getLayout();
  const cx = GRID_COLS / 2;
  const cy = GRID_ROWS / 2;
  let best = { i: 0, j: 0 };
  let bestDist = Infinity;

  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {
      if (finalGrid[i][j]) {
        const d = (j - cx) ** 2 + (i - cy) ** 2;
        if (d < bestDist) {
          bestDist = d;
          best = { i, j };
        }
      }
    }
  }

  const x = ox + (best.j + 0.5) * cell;
  const y = oy + (best.i + 0.5) * cell;

  // the hole is a square of side (cell * scale) centred on the pivot;
  // it must reach the farthest screen edge
  const far = Math.max(x, w - x, y, h - y);
  const scale = ((far * 2) / cell) * 1.1;

  return { x, y, scale };
};

/* ---------- canvas that plays the animation ---------- */

function LifeCanvas({ text, onDone }) {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const history = buildHistory(text);
    let step = history.length - 1;
    let timer;

    const paint = () => drawFrame(canvasRef.current, history[step]);

    const tick = () => {
      if (step > 0) {
        step--;
        paint();
        timer = setTimeout(tick, STEP_MS);
      } else {
        timer = setTimeout(() => onDoneRef.current(getPivot(history[0])), HOLD_MS);
      }
    };

    paint();
    timer = setTimeout(tick, 400);

    const onResize = () => paint();
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', imageRendering: 'pixelated' }}
    />
  );
}

/* ---------- the loader: animation + zoom transition ---------- */

/**
 * Props
 *  - text:     the text to reveal
 *  - ready:    true when the real page (images etc.) is ready
 *  - onFinish: called when the zoom is complete (unmount the loader here)
 */
export default function ReverseGameOfLife({ text = 'Hey veer here', ready = true, onFinish }) {
  const [pivot, setPivot] = useState(null); // set when the text animation finishes
  const progress = useMotionValue(0);       // 0 -> 1 during the zoom
  const scaleRef = useRef(1);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // exponential zoom (scale = S^progress) feels constant-speed, unlike a linear scale
  const scale = useTransform(progress, (p) => Math.pow(scaleRef.current, p));
  // white sheet fades out while we zoom, revealing the page through the letters
  const whiteOpacity = useTransform(progress, [0.25, 0.75], [1, 0]);

  useEffect(() => {
    if (!pivot || !ready) return;
    scaleRef.current = pivot.scale;
    const controls = animate(progress, 1, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => onFinishRef.current?.(),
    });
    return () => controls.stop();
  }, [pivot, ready, progress]);

  return (
    <>
      {/* white sheet behind the stencil */}
      <motion.div
        className="fixed inset-0 z-[99] bg-white pointer-events-none"
        style={{ opacity: whiteOpacity }}
      />

      {/* dark stencil with the text cut out */}
      <motion.div
        className="fixed inset-0 z-[100]"
        style={{
          scale,
          transformOrigin: pivot ? `${pivot.x}px ${pivot.y}px` : '50% 50%',
          willChange: 'transform',
        }}
      >
        <LifeCanvas text={text} onDone={setPivot} />
      </motion.div>
    </>
  );
}
