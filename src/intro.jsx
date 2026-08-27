import React from 'react'
import { motion, useTransform, easeInOut, easeOut } from 'motion/react';
import { useEffect, useState } from "react";
import svgPath from './svgPath.json'

// import IntroName from './assets/introName.svg';





function MyWay() {
    return (
        <div className="w-full h-full flex items-center justify-center mb-10">

            <svg
                viewBox="0 0 480 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                // className="overflow-visible"
                className="overflow-visible w-full min-w-[350px] max-w-[480px] h-auto px-4"
            >
                <defs>
                    {/* soft shadow for better look */}
                    {/* <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="1.2" floodOpacity="0.25" />
                    </filter> */}

                    <mask
                        id="hole-mask"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="480"
                        height="70"
                    >
                        {/* white = visible */}
                        <rect x="0" y="0" width="480" height="70" fill="white" />

                        {/* black = erase */}
                        <motion.path
                            d={svgPath.mask}
                            initial={{ pathLength: 1, pathOffset: 0 }}
                            animate={{ pathLength: 0, pathOffset: 1 }}
                            transition={{
                                duration: 4.5, // smoother than 6
                                ease: [0.25, 0.1, 0.25, 1], // better than "anticipate"
                                ease: [0.65, 0, 0.35, 1]
                            }}
                            stroke="black"
                            strokeWidth="5" // slightly bigger for clean erase
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </mask>
                </defs>

                <motion.path
                    d={svgPath.name}
                    fill="black"
                    stroke="black"
                    strokeWidth="0.1"
                    mask="url(#hole-mask)"
                    filter="url(#soft-shadow)"
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </svg>
        </div>
    );
}






export default function Intro() {
    return (
        <div className='w-full flex flex-col justify-center px-4 relative sm:top-30 top-15'>

            <MyWay />

            <div className='sm:text-3xl text-xl text-center text-[#333] mb-5 font-qurova'>
                full stack developer
            </div>

            <div className='text-center max-w-3xl flex items-center justify-center mx-auto text-lg text-[#555] mb-20 font-aqua'>
                Full stack developer building good-looking, scalable web apps with the MERN stack and Python. I aim to integrate AI efficiently — squeezing the most out of it without burning budget. When I'm not working on serious stuff, I'm probably building a small game. Always interested in projects worth building.
            </div>

        </div>
    )
}