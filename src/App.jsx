import { useEffect } from 'react';
import './App.css'
import { useMotionValue } from 'motion/react'
import Intro from './intro'
import NonInteractive from './NonInteractive'
import ScreenDevice from './ScreenDevice'
import Notes from './Notes'
import CursorTrail from './CursorTrail'
import Laptop from './Laptop'


function App() {

  const y = useMotionValue(0)

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
      clamp(y.get() + e.deltaY);
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
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
      <div className='mainContainer bg-[#f5f3f0] h-screen p-20 relative overflow-hidden overscroll-none touch-none'>

        <CursorTrail />
        <Intro y={y} />
        <NonInteractive y={y} />
        <ScreenDevice y={y} />
        <Notes y={y} />
        <Laptop y={y} />

      </div>
    </>
  )
}

export default App