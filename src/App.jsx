import { useEffect, useState } from 'react';
import './App.css'
import ReverseGameOfLife from './ReverseGameOfLife';
import { Summery } from './Summery';
import { easeInOut, motion, useMotionValue, useTransform, useMotionTemplate } from 'motion/react'

import keyboard from "./assets/keyboard.PNG";
import mouse from "./assets/mouse.PNG";
import headphone from "./assets/headphone.PNG";
import notes from "./assets/notes.PNG";
import notes2 from "./assets/notes2.png";
import laptop from "./assets/laptop1.PNG";
import laptop2 from "./assets/laptop2.png";
import mobile from "./assets/mobile.png";
import tablet from "./assets/tablet2.png";
import dsa from "./assets/dsa.PNG";
// import pencil from "./assets/pencil.PNG";
import pencil from "./assets/pencil.PNG";

import react from "./assets/react.PNG";
import js from "./assets/js.PNG";
import tailwind from "./assets/tailwind.PNG";
import express from "./assets/express.PNG";
import mongo from "./assets/mongo.PNG";
import node from "./assets/node.PNG";
import logos from "./assets/logos.PNG";
import stickyNote from "./assets/stickyNote.PNG";
import sevens from "./assets/sevens.PNG";
import { table } from 'motion/react-client';

function App() {

  const y = useMotionValue(0)

  function show() {
    console.log(y.get())
  }

  const mobileTrack = [0, 300, 510, 700]; // [start, end, end, final] - for more control over the animation
  const mobileRotateTrack = [0, 300, 510, 700]; // [start, end, end, final] - for more control over the animation
  const mobileUiTrack = [300, 500];
  const mobileScaleTrack = [200, 400, 510, 700];

  const notesTrack = [200, 400, 510, 600, 600, 800];
  const notesRotateTrack = [500, 300, 510, 600];

  const keyboardTrack = [100, 300];
  const keyboardRotateTrack = [550, 600];

  const laptopTrack = [900, 1000, 510, 800];
  const laptopRotateTrack = [910, 800];
  const laptopScaleTrack = [950, 800];

  const mouseTrack = [300, 500];
  const headphoneTrack = [400, 500];
  const pencilTrack = [400, 500];
  const stickyNoteTrack = [400, 500];


  const introOpacity = useTransform(y, mobileTrack, [1, 0]) // fade out

  const mobileX = useTransform(y, mobileTrack, [0, -200, -200, -300])   // slide left
  const mobileY = useTransform(y, mobileTrack, [0, 509, 509, 100])  // slide down
  const mobileRotate = useTransform(y, mobileRotateTrack, [0, -135, -135, -180]) // rotate into place

  const mobileScale = useTransform(y, mobileScaleTrack, [1, 2, 2, 1.2]) // rotate into place

  const mobileUiX = useTransform(y, mobileUiTrack, [0, -300])   // slide left
  const mobileUiBlur = useTransform(y, mobileUiTrack, [0, 8])   // blur effect
  const mobileUiFilter = useMotionTemplate`blur(${mobileUiBlur}px)`

  const notesX = useTransform(y, notesTrack, [0, -120, -120,-100,-100, -500])   // slide left
  const notesY = useTransform(y, notesTrack, [0, 300, 300, -100, -100, 800])  // slide down
  const notesRotate = useTransform(y, notesRotateTrack, [0, -10, -10, -40]) // rotate into place

  const keyboardX = useTransform(y, keyboardTrack, [0, 100, 100, 400])   // slide left
  const keyboardY = useTransform(y, keyboardTrack, [0, 300, 300, 180])
  const keyboardRotate = useTransform(y, keyboardRotateTrack, [0, -20]) // rotate into place

  const laptopX = useTransform(y, laptopTrack, [0, -170, -170, 700])
  const laptopY = useTransform(y, laptopTrack, [0, 100, 100, -200])
  const laptopRotate = useTransform(y, laptopRotateTrack, [0, 25])
  const laptopScale = useTransform(y, laptopScaleTrack, [1, 1.2]) // rotate into place

  const mouseX = useTransform(y, mouseTrack, [0, -240])
  const mouseY = useTransform(y, mouseTrack, [0, -100])

  const headphoneX = useTransform(y, headphoneTrack, [0, -120])
  const headphoneY = useTransform(y, headphoneTrack, [0, -100])

  const pencilX = useTransform(y, pencilTrack, [0, -120])
  const pencilY = useTransform(y, pencilTrack, [0, 100])

  const stickyNoteX = useTransform(y, stickyNoteTrack, [0, 80]);
  const stickyNoteY = useTransform(y, stickyNoteTrack, [0, -50]);

  // const headphoneX = useTransform(y, [400, 500], [0, -120])
  // const headphoneY = useTransform(y, [400, 500], [0, 100])


  // const notesRotate = useTransform(y, [0, 500], [0, -140]) // rotate into place
  // const notesScale = useTransform(y, [300, 600], [1, 5]) // rotate into place

  const draglimit = 1000;

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

        {/* <img src={intro} alt="greetings" className='absolute w-xl left-1/3 ' /> */}



        <motion.span style={{ opacity: introOpacity }}>

          <div className=' text-4xl  text-center text-[#333] mb-10'>
            Hi, I am
          </div>

          <div className=' text-6xl text-center text-[#333] mb-6 font-hw'>
            Veerbhadra Panchal
          </div>

          <div className=' text-4xl font-bold text-center text-[#333] mb-10'>
            a full stack developer
          </div>

        </motion.span>

        {/* <motion.img src={stickyNote} alt="notes" className='absolute h-50 w-50 right-20 top-20 drop-shadow-[7px_1px_7px_rgba(0,0,0,0.2)] -rotate-30' style={{
          x: stickyNoteX,
          y: stickyNoteY,
        }} /> */}

        <motion.img src={keyboard} alt="keyboard" className='absolute w-3xl bottom-10  left-2/8 rotate-6 drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)] ' style={{
          x: keyboardX,
          y: keyboardY,
          rotate: keyboardRotate
        }} />

        <motion.img src={mouse} alt="mouse" className='absolute w-140 bottom-50 left-20 -rotate-10 drop-shadow-[7px_-7px_15px_rgba(0,0,0,0.3)]' style={{
          x: mouseX,
          y: mouseY
        }} />

        <motion.img src={pencil} alt="pencil" className='absolute w-80 bottom-50 -left-20 -rotate-10 drop-shadow-[6px_10px_6px_rgba(0,0,0,0.3)]' style={{
          x: pencilX,
          y: pencilY
        }} />

        <motion.img src={headphone} alt="headphone" className='absolute w-170 -left-40 top-0 drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)]' style={{
          x: headphoneX,
          y: headphoneY
        }} />

        {/* main  div for mobile png*/}
        <motion.div className='absolute w-60 h-90 flex items-center justify-center  -top-10 right-30 rotate-45 drop-shadow-[5px_3px_10px_rgba(0,0,0,0.3)]'
          style={{
            x: mobileX,
            y: mobileY,
            rotate: mobileRotate,
            scale: mobileScale
          }} transition={{
            ease: easeInOut
          }} onClick={show}
        >
          {/* /image */}
          <img src={tablet} alt="notes" className='w-full h-full' />

          {/* screen container of tab */}
          <div className='absolute text-black w-101 h-104 flex rounded-xl items-center justify-center' >

            {/* lockscreen */}
            {/* <motion.div className='absolute text-white font-bold text-xl bg-[#2e2e2e] w-53 h-25 flex rounded-1xl items-center justify-center z-2 font-sans'
              style={{ x: mobileUiX }} >
              <motion.span style={{ filter: mobileUiFilter }}>skills</motion.span>
            </motion.div> */}

            {/* main screen */}
            <div className='absolute bg-[#e3e2e2] rounded-xl h-75 w-50'>

              <div className='flex gap-2 m-3'>

                <a href='https://sevens-card-game.vercel.app/' className='flex flex-col items-center cursor-pointer '>


                  <div className='h-5 w-5 bg-amber-400 rounded-[5px] overflow-hidden'>
                    <img src={sevens} alt="sevens" />
                  </div>

                  <span className='text-[6px]'>Sevens</span>

                </a>

              </div>


            </div>

          </div>


        </motion.div>



        {/* <img src={notes2} alt="notes" className='absolute w-100 -right-20 -rotate-26 -bottom-10 drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)]' /> */}


        <motion.div className='absolute h-120 w-100 -right-15 -rotate-180 -bottom-10 drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden font-hw2' style={{
          x: notesX,
          y: notesY,
          rotate: notesRotate
        }} >

          <img src={notes2} alt="notes" className='w-full h-full object-cover' />

          <div className=' absolute text-black w-full h-full -top-3 -left-6 opacity-80 blur-[0.6px]'>

            <div className='relative top-8 left-55 text-2xl ' >Skills</div>

            <span className='relative top-15 left-25 ' >Frontend : </span>

            <div className='relative top-20 left-25 flex gap-4 '>

              <span className='flex flex-col justify-center items-center'>
                <img src={react} alt="" className='opacity-100 w-15' />
                <span className='text-blue-400'>react</span>
              </span>

              <span className='flex flex-col justify-center items-center'>
                <img src={js} alt="" className='opacity-100 w-15' />
                <span className='text-0'>java script</span>
              </span>

              <span className='flex flex-col justify-center items-center'>
                <img src={tailwind} alt="" className='opacity-100 w-15' />
                <span className='text-[#00bcff]'>tailwind</span>
              </span>

            </div>

            <span className='relative top-25 left-25 ' >backend : </span>

            <div className=' relative top-30 left-25 flex gap-4'>

              <span className='flex flex-col justify-center items-center'>
                <img src={node} alt="" className='opacity-100 w-15' />
                <span className='text-green-700'>node</span>
              </span>

              <span className='flex flex-col justify-center items-center'>
                <img src={mongo} alt="" className='opacity-100 w-15' />
                <span className='text-0'>mongo</span>
              </span>

              <span className='flex flex-col justify-center items-center'>
                <img src={express} alt="" className='opacity-100 w-15' />
                <span className='text-[#00bcff]'>express</span>
              </span>

            </div>


          </div>

        </motion.div>



        {/* <img src={laptop2} alt="laptop" className='absolute h-200 -left-100 -bottom-120 -rotate-200 drop-shadow-[6px_10px_15px_rgba(0,0,0,0.3)] ' /> */}

        <motion.div className='relative w-140 h-170 flex items-center justify-center overflow-hidden   -rotate-25 -left-30 -bottom-50 drop-shadow-[2px_10px_5px_rgba(0,0,0,0.2)]' style={{
          x: laptopX,
          y: laptopY,
          rotate: laptopRotate,
          scale: laptopScale

        }}>

          <img src={laptop2} alt="notes" className='w-full h-full object-cover' />

          <div className=' absolute text-black   w-full h-full blur-[0.3px] flex top-10'>

            <form action="" className='h-70 w-60 relative  border-white border-5 top-42 left-5 text-sm flex flex-col items-center justify-center gap-4 rounded-2xl bg-black text-white rotate-3 '>

              <h3>Contact me</h3>

              <input type="text" placeholder='name' className='w-2/3 border-3 rounded-2xl pl-2 pb-1' />

              <input type="text" placeholder='email' className='w-2/3 border-3 rounded-2xl pl-2 pb-1' />

              <input type="text" placeholder='subject' className='w-2/3 border-3 rounded-2xl pl-2 pb-1' />

              <textarea name="" id="" rows="2" placeholder='message' className='w-2/3 border-3 rounded-2xl pl-2 pb-1'></textarea>

              <button type='submit' className='border-3 rounded-3xl pl-8 pr-8 text-center cursor-pointer' >Submit</button>
            </form>

            <img src={logos} alt="" className='relative top-50 left-10 rotate-3 h-40' />

          </div>

        </motion.div>


        {/* <ReverseGameOfLife /> */}
        {/* <Summery isHeadline={isheadline} /> */}

      </div>
    </>
  )
}

export default App
