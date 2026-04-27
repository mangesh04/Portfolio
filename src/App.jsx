import { useEffect } from 'react';
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
import Keyboard from './keyboard'
import ReverseGame from './ReverseGameOfLife'
import ChromeAIChat from './ChromeAIChat';

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
      {/* <ReverseGame text="Veer" /> */}
      <div className='mainContainer bg-[#f5f3f0] h-screen p-20 relative overflow-hidden overscroll-none touch-none'>


        <CursorTrail />
        <Intro y={y} />
        <NonInteractive y={y} />

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

        <Laptop y={y} />
        <Keyboard y={y} />
      </div>
    </>
  )
}

export default App