import { motion, useTransform, useSpring } from 'motion/react';
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
            <motion.div className='absolute drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)] ' style={{
                height: 500,
                width: 800,
                top: '50%',
                left: '50%',
                translate: '-50% -50%',
                x: keyboardX,
                y: keyboardY,

                scale: isLargeScreen ? 1.1 : 0.5,
                translateY: isLargeScreen ? 0 : '10%',
                rotate: keyboardRotate,
            }} >

                <img src={keyboard} alt="keyboard" className='w-full h-full object-cover absolute inset-0' />

            </motion.div>

        </>
    )
}