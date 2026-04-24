import { motion, useTransform, useMotionTemplate, easeInOut, useSpring, m } from 'motion/react';
import tablet from './assets/tablet2.png';
import { useState, useEffect } from 'react';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaDatabase } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiTailwindcss, SiFramer } from 'react-icons/si'
import { TbBrandVscode } from 'react-icons/tb'

const sections = [
    {
        label: 'Frontend',
        icons: [
            { Icon: FaReact, color: '#61DAFB', bg: '#1a3a45', name: 'React' },
            { Icon: SiTailwindcss, color: '#38BDF8', bg: '#1a3245', name: 'Tailwind' },
            { Icon: SiFramer, color: '#ffffff', bg: '#2a2a2a', name: 'Framer' },
        ],
    },
    {
        label: 'Backend',
        icons: [
            { Icon: FaNodeJs, color: '#68A063', bg: '#1a2e1a', name: 'Node' },
            { Icon: SiExpress, color: '#ffffff', bg: '#2a2a2a', name: 'Express' },
            { Icon: SiMongodb, color: '#47A248', bg: '#1a2e1a', name: 'MongoDB' },
            { Icon: FaPython, color: '#61a8d4', bg: '#1a2a3a', name: 'Python' },
            { Icon: FaDatabase, color: '#6fa8dc', bg: '#1a2a3a', name: 'SQL' },
        ],
    },
    {
        label: 'Tools',
        icons: [
            { Icon: FaGitAlt, color: '#F05032', bg: '#3a1a18', name: 'Git' },
            { Icon: FaGithub, color: '#ffffff', bg: '#2a2a2a', name: 'GitHub' },
            { Icon: TbBrandVscode, color: '#007ACC', bg: '#1a2a3a', name: 'VSCode' },
        ],
    },
]

function SkillIcon({ Icon, color, bg, name }) {
    return (
        <motion.div
            className='flex flex-col items-center gap-[2px] cursor-pointer'
            whileHover={{ scale: 1.25, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
            <div
                className='flex items-center justify-center rounded-[5px] transition-shadow duration-200'
                style={{ width: 22, height: 22, background: bg, boxShadow: `0 0 0px ${color}` }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 6px 1px ${color}88`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0px ${color}`}
            >
                <Icon size={13} color={color} />
            </div>
            <span style={{ fontSize: 4.5, color: '#888', lineHeight: 1 }}>{name}</span>
        </motion.div>
    )
}


export default function ScreenDevice({ y }) {

    const entryStart = 0
    const entryEnd = 200
    const scaleStart = 200
    const scaleEnd = 400
    const dScaleStart = 500
    const dScaleEnd = 700
    const exitStart = 700
    const exitEnd = 900

    const mobileTrack = [entryStart, entryEnd, exitStart, exitEnd]
    const mobileScaleTrack = [scaleStart, scaleEnd, dScaleStart, dScaleEnd]
    const springConfig = { stiffness: 80, damping: 20, mass: 1 }

    const rawX = useTransform(y, mobileTrack, [600, 0, 0, 600])
    const rawY = useTransform(y, mobileTrack, [-300, 0, 0, -400])

    const mobileX = useSpring(rawX, springConfig)
    const mobileY = useSpring(rawY, springConfig)

    const mobileRotate = useSpring(
        useTransform(y, mobileTrack, [50, -90, -90, -120]),
        springConfig
    )

    const mobileScale = useSpring(
        useTransform(y, mobileScaleTrack, [1, 2, 2, 1]),
        springConfig
    )

    return (
        <motion.div
            className='absolute w-60 h-90 flex items-center justify-center  drop-shadow-[5px_3px_10px_rgba(0,0,0,0.3)] z-1 '

            style={{

                top: '50%',
                left: '50%',
                translate: '-50% -50%',
                x: mobileX,
                y: mobileY,
                scale: mobileScale,
                rotate: mobileRotate,
            }}
            transition={{ ease: easeInOut }}
        >
            <img src={tablet} alt="tablet" className='w-full h-full' />

            <div className='absolute text-black w-101 h-104 flex rounded-xl items-center justify-center'>

                <div className='absolute rounded-xl h-50 w-75 rotate-90 overflow-hidden'
                    style={{ background: '#141414' }}>

                    <div className='w-full h-full flex flex-col px-3 py-2 gap-[6px]'>
                        <div className='flex items-center gap-1 mb-[2px]'>
                            <span style={{ fontSize: 7, fontWeight: 600, color: '#ffffff', letterSpacing: '0.04em' }}>
                                My Skills
                            </span>
                            <div style={{ flex: 1, height: 0.5, background: '#333', marginLeft: 3 }} />
                        </div>

                        {sections.map((section) => (
                            <div key={section.label}>
                                <p style={{ fontSize: 4.5, color: '#555', marginBottom: 3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    {section.label}
                                </p>
                                <div className='flex flex-row gap-2 flex-wrap'>
                                    {section.icons.map(({ Icon, color, bg, name }) => (
                                        <SkillIcon key={name} Icon={Icon} color={color} bg={bg} name={name} />
                                    ))}
                                </div>
                                {section.label !== 'Tools' && (
                                    <div style={{ height: 0.5, background: '#222', margin: '4px 0 0' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}