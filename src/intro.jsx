import React from 'react'
import { motion, useTransform, easeInOut } from 'motion/react';
// import IntroName from './assets/introName.svg';

export default function Intro() {
    return (
        <div>
            <div className='text-4xl text-center text-[#333] mb-10'>
                Hi, I am
            </div>

            <div className='text-6xl text-center text-[#333] mb-6 font-hw w-full flex items-center justify-center'>
            Veerbhadra Panchal
            </div>

            <div className='text-4xl font-bold text-center text-[#333] mb-10'>
                a full stack developer
            </div>
        </div>
    )
}