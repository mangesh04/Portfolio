import { useEffect, useRef, useState } from 'react';
import './App.css'
import { useMotionValue } from 'motion/react'
import Intro from './intro'
import NonInteractive from './NonInteractive'
import ScreenDevice from './ScreenDevice'
import ScreenDevice2 from './ScreenDevice2'
import Notes from './Notes'
import Notes2 from './Notes2'
import CursorTrail from './CursorTrail'
import Laptop from './Laptop'
import Laptop2 from './Laptop2'
import Keyboard from './keyboard'
import ReverseGame from './ReverseGameOfLife'

// Resolves true once every <img> currently in the page has loaded AND decoded
// (or after timeoutMs, so the loader can never hang forever).
function useAllImagesLoaded(timeoutMs = 10000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const waits = Array.from(document.images).map((img) =>
      img.decode
        ? img.decode().catch(() => { })
        : new Promise((res) => {
          if (img.complete) res();
          else img.onload = img.onerror = res;
        })
    );
    const timeout = new Promise((res) => setTimeout(res, timeoutMs));

    Promise.race([Promise.all(waits), timeout]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => { cancelled = true; };
  }, [timeoutMs]);

  return ready;
}

function App() {

  const y = useMotionValue(0)

  const [loading, setLoading] = useState(true);
  const lockedRef = useRef(true);          // blocks scrolling while the loader is visible
  const imagesReady = useAllImagesLoaded();

  const handleLoaderFinish = () => {
    lockedRef.current = false;
    setLoading(false);
  };

  useEffect(() => {

    const cooldown = { active: false };
    let touchStartY = 0;

    const clamp = (next) => {
      if (cooldown.active) return;

      if (next >= 2100) {
        y.set(0);
        cooldown.active = true;
        setTimeout(() => { cooldown.active = false; }, 800);
        return;
      }

      if (next < 0) return;
      y.set(next);
    };

    const handleWheel = (e) => {
      if (lockedRef.current) return;
      clamp(y.get() + e.deltaY);
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (lockedRef.current) return;
      const delta = touchStartY - e.touches[0].clientY; // inverted: swipe up = scroll down
      touchStartY = e.touches[0].clientY;
      clamp(y.get() + delta);
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      {/* The page stays mounted UNDER the loader so its images download while the loader plays */}
      <div className='mainContainer bg-[#f5f3f0] h-screen p-20 relative overflow-hidden overscroll-none touch-none'>

        <CursorTrail />

        <Intro y={y} />

        <NonInteractive y={y} />

        <Keyboard y={y} />

        <span className=" hidden md:block">
          <ScreenDevice y={y} />
        </span>

        <span className="block md:hidden">
          <ScreenDevice2 y={y} />
        </span>

        <span className=" hidden md:block">
          <Notes y={y} /></span>

        <span className="block md:hidden">
          <Notes2 y={y} />
        </span>

        <span className=" hidden md:block">
          <Laptop y={y} />
        </span>
        <span className="block md:hidden">
          <Laptop2 y={y} />
        </span>

      </div>

      {loading && (
        <ReverseGame
          text="Welcome"
          ready={imagesReady}
          onFinish={handleLoaderFinish}
        />
      )}
    </>
  )
}

export default App
