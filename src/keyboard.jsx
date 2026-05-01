import { motion,useTransform, useSpring } from 'motion/react';
import { useEffect, useState } from "react";
import keyboard from './assets/keyboard.png'

export default function Keyboard({ y }) {

    const keyboardTrack = [100, 300];
    const keyboardRotateTrack = [550, 600, 800, 900];

    const springConfig = { stiffness: 80, damping: 20, mass: 1 }

    const keyboardX = useSpring(useTransform(y, keyboardTrack, [-10, -40]), springConfig)   // slide left
    const keyboardY = useSpring(useTransform(y, keyboardTrack, [300, 420]), springConfig)

    const keyboardRotate = useSpring(useTransform(y, keyboardRotateTrack, [-5, 20, 20, -5]), springConfig) // rotate into place



    const [isLargeScreen, setScreenSize] = useState(window.innerWidth >= 1000);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth >= 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <motion.img src={keyboard} alt="keyboard" className='absolute drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)]  max-w-5xl ' style={{
                width: '50%',
                top: '50%',
                left: '50%',
                translate: '-50% -50%',
                x: keyboardX,
                y: keyboardY,

                scale: isLargeScreen ? 1.1 : 1.8,
                rotate: keyboardRotate,
            }} />

        </>
    )
}