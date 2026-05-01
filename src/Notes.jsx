import { useEffect, useMemo, useState } from 'react'
import { motion, useTransform, useSpring, m } from 'motion/react';
import notes2 from './assets/notes.png'
import cardImage from './assets/card-image.png'
import sevensImage from './assets/sevens.png'
import desktopBuddy from './assets/desktopBuddy.png'
import rps from './assets/rps.png'
import tabdev from './assets/tabdev.png'
import quoteGenetor from './assets/quoteGenerator.png'

const projects = [
  {
    image: tabdev,
    name: 'TabDev',
    description: 'Browser tab manager with custom dev shortcuts.',
    learned: 'Learned a ton about browser extension APIs.',
    status: 'finished',
    tags: ['React', 'Chrome API'],
    live: 'https://your-live-link.com',
    github: 'https://github.com/your-repo',
  },
  {
    image: sevensImage,
    name: 'Sevens Cards',
    description: 'Multiplayer card game real-time, two players.',
    learned: 'First time syncing state across clients.',
    status: 'finished',
    tags: ['React', 'Node', 'Socket.io'],
    live: 'https://your-live-link.com',
    github: 'https://github.com/your-repo',
  },
  {
    image: quoteGenetor,
    name: 'Quote Generator',
    description: 'Generate shareable quote images with custom styles.',
    learned: 'Canvas API is more powerful than expected.',
    status: 'finished',
    tags: ['React', 'Canvas'],
    live: 'https://your-live-link.com',
    github: 'https://github.com/your-repo',
  },
  {
    image: desktopBuddy,
    name: 'Desktop Buddy',
    description: 'A persistent desktop app with a mini game launcher.',
    learned: 'Raylib is surprisingly fun for quick GUIs.',
    status: 'in progress',
    tags: ['C++', 'Raylib'],
    live: null,
    github: 'https://github.com/your-repo',
  },
  {
    image: rps,
    name: 'Terminal Game',
    description: 'A tiny C game written ages ago. Nothing fancy.',
    learned: 'Raw terminal I/O is painful and worth it.',
    status: 'finished',
    tags: ['C'],
    live: null,
    github: 'https://github.com/your-repo',
  },
]

const statusColor = {
  'finished': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'in progress': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  'abandoned lol': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-400' },
}

const CARD_W = Math.min(130, window.innerWidth * 0.2)

function SetCardImage({ image, name, rotation }) {

  return (
    <div style={{
      position: 'relative',
      width: '115%',
      marginLeft: '-8%',
      marginTop: '-10px',
      flexShrink: 0,
      transform: `rotate(${rotation}deg)`
    }}>
      <img
        src={cardImage}
        alt=""
        style={{ width: '100%', display: 'block', position: 'relative', zIndex: 0 }}
      />
      <img
        src={image}
        alt=""
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '86%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
      <span className='absolute text-[50%] top-[80%] left-[10%] font-hw2'>
        {name}
      </span>
    </div>
  )
}

function Popup({ project }) {
  const { dot } = statusColor[project.status]
  return (
    <div className='absolute -left-1 top-0 ml-0 w-44 z-50 pointer-events-auto '
      style={{ transformOrigin: 'top left' }}
    >
      <div className='bg-[#fffef8] border border-[#ddd9ce] rounded-lg shadow-lg p-3 flex flex-col gap-1.5'
        style={{ width: '176px' }}
      >
        {/* title + status */}
        <div className='flex items-center justify-between gap-2'>
          <span className='font-hw2 text-sm text-[#2a2620] leading-tight'>{project.name}</span>
          <span className={`flex items-center gap-1 text-[9px] ${statusColor[project.status].text} shrink-0`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
            {project.status}
          </span>
        </div>

        {/* description */}
        <p className='text-[10px] text-[#5a5650] leading-relaxed m-0'>
          {project.description}
        </p>

        {/* learned quote */}
        <p className='text-[10px] text-[#7a7268] italic leading-relaxed m-0 border-l-2 border-[#d4cfc4] pl-2'>
          "{project.learned}"
        </p>

        {/* tags */}
        <div className='flex flex-wrap gap-1'>
          {project.tags.map(tag => (
            <span key={tag} className='text-[9px] px-1.5 py-0.5 rounded-full bg-[#edeae0] text-[#5a5650] border border-[#ccc8bc]'>
              {tag}
            </span>
          ))}
        </div>

        {/* links */}
        <div className='flex gap-3 pt-1.5 border-t border-[#e0ddd6] mt-0.5'>
          {project.live && (
            <a href={project.live} target='_blank' rel='noreferrer'
              className='text-[10px] text-[#555] underline hover:text-[#222]'>
              Live ↗
            </a>
          )}
          <a href={project.github} target='_blank' rel='noreferrer'
            className='text-[10px] text-[#555] underline hover:text-[#222]'>
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const rotation = useMemo(() => (Math.random() * 6 - 3).toFixed(2), [])

  return (

    <div
      className='relative m-0'
      style={{ width: '110%', flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* polaroid — straightens + floats on hover */}
      <motion.div
        className='font-hw2 text-3xl w-full h-full'
        animate={{
          scale: hovered ? 1.1 : 1,
          y: hovered ? -6 : 0,
          rotate: hovered ? 0 : Number(rotation), // ← animates to straight
          filter: hovered
            ? 'drop-shadow(4px 10px 18px rgba(0,0,0,0.28))'
            : 'drop-shadow(2px 3px 6px rgba(0,0,0,0))', // - no shadow on resting pos
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{ position: 'relative', zIndex: hovered ? 10 : 1 }}
      >
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            bottom: 8,
            background: 'transparent',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            overflow: 'visible',
          }}
        >
          <SetCardImage image={project.image} name={project.name} rotation={0} />

        </div>

      </motion.div>


      {/* popup div */}
      {hovered && (
        <motion.div
          className='absolute top-0 left-full ml-3 z-50'
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Popup project={project} />

        </motion.div>
      )}
    </div>
  )
}



export default function Notes({ y }) {

  const notesBackStart = 200
  const notesBackEnd = 400

  const notesEntryStart = 700
  const notesEntryEnd = 900

  const notesScaleUpStart = 1000
  const notesScaleUpEnd = 1200

  const notesDScaleUpStart = 1300
  const notesDScaleUpEnd = 1500

  const notesExitStart = 1500
  const notesExitEnd = 1700

  const notesTrack = [notesBackStart, notesBackEnd, notesEntryStart, notesEntryEnd, notesExitStart, notesExitEnd]
  const notesScaleTrack = [notesScaleUpStart, notesScaleUpEnd, notesDScaleUpStart, notesDScaleUpEnd]

  const springConfig = { stiffness: 80, damping: 20, mass: 1 }

  const notesY = useSpring(useTransform(y, notesTrack, [500, 500, 400, 0, 0, 300]), springConfig)
  const notesX = useSpring(useTransform(y, notesTrack, [650, 700, 700, 0, 0, 600]), springConfig)

  const notesRotate = useSpring(useTransform(y, notesTrack, [100, 120, 40, 0, 0, 65]), springConfig)

  const notesScale = useSpring(useTransform(y, notesScaleTrack, [1, 1.5, 1.5, 1]), springConfig)

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
    <motion.div
      className='absolute drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)] z-1'
      style={{

        height: isLargeScreen ? '30vw' : '50vw',
        width: isLargeScreen ? '35vw' : '65vw',

        top: '50%',
        left: '50%',
        translate: '-50% -50%',
        x: notesX,
        y: notesY,
        rotate: notesRotate,
        scale: notesScale,
      }}
    >
      <img src={notes2} alt="notes" className='w-full h-full object-cover absolute inset-0' />

      <div className='absolute inset-0 flex flex-col gap-[6%] items-center justify-center overflow-visible'>

        <div className='font-hw2 relative  font-bold opacity-70 text-[160%]'  >
          Projects
        </div>

        <div
          style={{
            height: '60%',
            width: '80%',
            display: 'grid',
            gridTemplateColumns: `repeat(3, ${30}%)`,
            gap: '5%',
            padding: '6px 4px',
            overflow: 'visible',
          }}
        >
          {projects.map(project => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </motion.div >
  )
}