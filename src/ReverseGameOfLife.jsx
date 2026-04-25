import React, { useState, useRef, useEffect, useCallback } from 'react';
// import font from './pixelFont1.json';
import font from './fontElegant.json';

const CELL_SIZE = 15;
const GRID_ROWS = 30;
const GRID_COLS = 80;

const ReverseGameOfLife = ({ text = 'Hey veer here' }) => {
  const canvasRef = useRef(null);
  const historyRef = useRef(null);
  const animationRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const textToGrid = useCallback((text) => {
    const grid = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(false));

    // Vintage blocky pixel font (similar to the image)

    const upperText = text.toUpperCase();
    const startRow = Math.floor(GRID_ROWS / 2) - 3;
    const totalWidth = upperText.length * 6 - 1;
    const startCol = Math.floor(GRID_COLS / 2) - Math.floor(totalWidth / 2);

    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i];
      const pattern = font[char] || font[' '];
      const colOffset = startCol + i * 6;

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col]) {
            const gridRow = startRow + row;
            const gridCol = colOffset + col;
            if (gridRow >= 0 && gridRow < GRID_ROWS && gridCol >= 0 && gridCol < GRID_COLS) {
              grid[gridRow][gridCol] = true;
            }
          }
        }
      }
    }

    return grid;
  }, []);

  const countNeighbors = useCallback((grid, row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < GRID_ROWS && newCol >= 0 && newCol < GRID_COLS) {
          if (grid[newRow][newCol]) count++;
        }
      }
    }
    return count;
  }, []);

  const getNextState = useCallback((grid) => {
    const newGrid = grid.map(arr => [...arr]);
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        const neighbors = countNeighbors(grid, i, j);
        if (grid[i][j]) {
          newGrid[i][j] = neighbors === 2 || neighbors === 3;
        } else {
          newGrid[i][j] = neighbors === 3;
        }
      }
    }
    return newGrid;
  }, [countNeighbors]);

  useEffect(() => {
    if (!historyRef.current) {
      const initialGrid = textToGrid(text);
      const newHistory = [initialGrid];
      let currentGrid = initialGrid;

      for (let i = 0; i < 50; i++) {
        currentGrid = getNextState(currentGrid);
        newHistory.push(currentGrid);
      }

      historyRef.current = newHistory;
      setCurrentStep(newHistory.length - 1);
      setIsInitialized(true);
    }
  }, [text, textToGrid, getNextState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !historyRef.current || !historyRef.current[currentStep]) return;

    const ctx = canvas.getContext('2d');
    const grid = historyRef.current[currentStep];

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        if (grid[i][j]) {
          ctx.fillRect(
            j * (CELL_SIZE ),
            i * (CELL_SIZE ),
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    }
  }, [currentStep]);

  useEffect(() => {
    if (!isInitialized || !historyRef.current) return;

    const startAnimation = () => {
      let step = historyRef.current.length - 1;

      const playReverse = () => {
        if (step > 0) {
          step--;
          setCurrentStep(step);
          animationRef.current = setTimeout(playReverse, 60);
        }
      };

      setTimeout(playReverse, 60);
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isInitialized]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <canvas
        ref={canvasRef}
        width={GRID_COLS * (CELL_SIZE + 1)}
        height={GRID_ROWS * (CELL_SIZE + 1)}
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default ReverseGameOfLife;