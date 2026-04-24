import React, { use, useState } from 'react'
import { motion, spring, useSpring, useTransform } from 'motion/react';
import laptop2 from './assets/laptop2.png'
import instaLogo from './assets/instaLogo.png'
import linkedinLogo from './assets/linkedinLogo.png'
import githubLogo from './assets/githubLogo.png'
import xLogo from './assets/xLogo.png'
import gmailLogo from './assets/gmailLogo.png'
import { PiHammerFill } from 'react-icons/pi';


// {/* <img src={laptop2} alt="laptop" className='absolute h-200 -left-100 -bottom-120 -rotate-200 drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)] ' /> */ }

function Sticker({ src, alt, top, left, rotation, href }) {

    const [hovered, setHovered] = useState(false);

    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <motion.img
                src={src}
                alt={alt}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="absolute h-15 cursor-pointer"
                style={{
                    top: `${top * 4}px`,
                    left: `${left * 4}px`,
                    rotate: `${rotation}deg`
                }}

                animate={{
                    scale: hovered ? 1.1 : 1,
                    y: hovered ? -6 : 0,
                    rotate: hovered ? 0 : Number(rotation), // ← animates to straight
                    filter: hovered
                        ? 'drop-shadow(4px 10px 18px rgba(0,0,0,0.28))' : 'drop-shadow(2px 3px 6px rgba(0,0,0,0))', // - no shadow on resting pos
                }}

                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            /></a>
    )
}

export default function laptop({ y }) {
    //banking up -> stays ->rotates-> enters -> scalesUp -> stays -> exits
    const laptopRedyStart = 1500
    const laptopRedyEnd = 1600

    const laptopEntryStart = 1600
    const laptopEntryEnd = 1800
    const laptopScaleUpStart = 1800
    const laptopScaleUpEnd = 2000
    // stop all movments after 2000


    const laptopTrack = [laptopRedyStart, laptopRedyEnd, laptopEntryStart, laptopEntryEnd];

    const laptopRotateTrack = [laptopRedyStart, laptopEntryStart];

    const laptopScaleTrack = [laptopScaleUpStart, laptopScaleUpEnd];

    const springConfig = { stiffness: 80, damping: 20, mass: 1 }

    const laptopX = useSpring(useTransform(y, laptopTrack, [0, 100, 100, 550]), springConfig)
    const laptopY = useSpring(useTransform(y, laptopTrack, [0, 200, 150, -450]), springConfig)
    const laptopRotate = useSpring(useTransform(y, laptopRotateTrack, [0, -30]), springConfig)
    const laptopScale = useSpring(useTransform(y, laptopScaleTrack, [1, 1.5]), springConfig)
    const zIndex = useTransform(laptopX, (value) => (value > 100 ? 1 : 0));

    const logos = {
        github: { src: githubLogo, alt: "GitHub", rotation: 10, top: 3, left: 5, href: "https://github.com" },

        x: { src: xLogo, alt: "X", rotation: -8, top: 10, left: 40, href: "https://x.com" },

        linkedin: { src: linkedinLogo, alt: "LinkedIn", rotation: 10, top: 25, left: 15, href: "https://linkedin.com" },

        insta: { src: instaLogo, alt: "Instagram", rotation: -7, top: 50, left: 5, href: "https://instagram.com" },

        gmail: { src: gmailLogo, alt: "Gmail", rotation: 10, top: 40, left: 40, href: "https://gmail.com" }
    }

    return (

        <motion.div className={`relative w-140 h-170 flex items-center justify-center overflow-hidden  -left-70 -top-30 rotate-30 drop-shadow-[2px_10px_5px_rgba(0,0,0,0.2)]`} style={{
            x: laptopX,
            y: laptopY,
            rotate: laptopRotate,
            scale: laptopScale,
            zIndex: zIndex
        }}>

            <img src={laptop2} alt="notes" className='w-full h-full object-cover' />

            {/* blur-[0.3px] */}

            <div className=' absolute text-black   w-full h-full  flex top-10'>

                <form action="" className='h-70 w-60 relative  border-white border-5 top-42 left-5 text-sm flex flex-col items-center justify-center gap-4 rounded-2xl bg-black text-white rotate-3 '>

                    <h3>Contact me</h3>

                    <input type="text" placeholder='name' className='w-2/3 border-3 rounded-2xl pl-2 pb-1' />

                    <input type="text" placeholder='email' className='w-2/3 border-3 rounded-2xl pl-2 pb-1' />

                    <input type="text" placeholder='subject' className='w-2/3 border-3 rounded-2xl pl-2 pb-1' />

                    <textarea name="" id="" rows="2" placeholder='message' className='w-2/3 border-3 rounded-2xl pl-2 pb-1'></textarea>

                    <button type='submit' className='border-3 rounded-3xl pl-8 pr-8 text-center cursor-pointer' >Submit</button>
                </form>

                <div className='relative h-70 w-60 top-40 left-10'>

                    {Object.entries(logos).map(([key, logo]) => (
                        <Sticker
                            key={key}
                            src={logo.src}
                            alt={logo.alt}
                            rotation={logo.rotation}
                            top={logo.top}
                            left={logo.left}
                            href={logo.href}
                        />
                    ))}

                </div>

            </div>

        </motion.div>
    )
}