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

  const draglimit = 2000;

  useEffect(() => {
    const handleWheel = (e) => {
      if (y.get() + e.deltaY < 0) return
      if (y.get() + e.deltaY > draglimit) return
      y.set(y.get() + e.deltaY)
    }

    window.addEventListener("wheel", handleWheel)
    return () => window.removeEventListener("wheel", handleWheel) // cleanup!
  }, []);

  return (
    <>
      <div className='mainContainer bg-[#f5f3f0] h-screen p-20 relative overflow-hidden'>

        <CursorTrail />
        <Intro y={y} />
        {/* <NonInteractive y={y} /> */}
        <ScreenDevice y={y} />
        {/* <Notes y={y} />
        <Laptop y={y} /> */}

      </div>
    </>
  )
}

export default App