import React from 'react'
import { motion, useTransform, useSpring } from 'motion/react';
import keyboard from './assets/keyboard.png'
import mouse from './assets/mouse.png'
import pencil from './assets/pencil.png'
import headphone from './assets/headphone.png'

export default function NonInteractive({ y }) {

    // const mouseTrack = [300, 500];
    // const headphoneTrack = [400, 500];
    // const pencilTrack = [400, 500];


    // const mouseX = useSpring(useTransform(y, mouseTrack, [0, -240]), springConfig)
    // const mouseY = useSpring(useTransform(y, mouseTrack, [0, -100]), springConfig)

    // const headphoneX = useSpring(useTransform(y, headphoneTrack, [0, -120]), springConfig)
    // const headphoneY = useSpring(useTransform(y, headphoneTrack, [0, -100]), springConfig)

    // const pencilX = useSpring(useTransform(y, pencilTrack, [0, -120]), springConfig)
    // const pencilY = useSpring(useTransform(y, pencilTrack, [0, 100]), springConfig)


    return (
        <>


            <motion.img src={mouse} alt="mouse" className='absolute w-140 -top-40 left-50 -rotate-20 drop-shadow-[7px_-7px_15px_rgba(0,0,0,0.3)]' style={{
                // x: mouseX,
                // y: mouseY
            }} />

            {/* <motion.img src={pencil} alt="pencil" className='absolute w-80 bottom-50 -left-20 -rotate-10 drop-shadow-[6px_10px_6px_rgba(0,0,0,0.3)]' style={{
                // x: pencilX,
                // y: pencilY
            }} /> */}

            <motion.img src={headphone} alt="headphone" className='absolute w-170 -top-40 -left-40 drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)]' style={{
                // x: headphoneX,
                // y: headphoneY
            }} />

        </>
    )
}