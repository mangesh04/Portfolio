import React from 'react'
import { useEffect, useState } from "react";
import { SpecialWord } from './SpecialWord';
import { TypingAnim } from './TypingAnim';
import reactPng from "./assets/react.PNG";
import mongoPng from "./assets/mongo.PNG";
import nodePng from "./assets/nodeJs.PNG";
import expressPng from "./assets/express.PNG";

export const Summery = ({isHeadline}) => {
    if (!isHeadline) {
        return;
    }
    //summery is dividied into multiple parts for different animations
    const s1 = " I am a Full-stack developer focused on the MERN stack [ ";
    const s2 = " react ";
    const s3 = " mongodb ";
    const s4 = "express ";
    const s5 = "nodejs ";
    const s6 = " ] with strong foundations in Python and automation. Experienced in designing end-to-end web solutions, building REST APIs, optimizing performance, and automating repetitive tasks with scripts. Enjoy creating small games and logic-driven projects that enhance problem-solving and data-structure skills.";

    //summeryState is the current index of summery we are on.
    //which will help to decide which component to start.
    const [currentPart, setCurrentPart] = useState(0);

    // animate-pulse can be added
    return (
        <>
            <div className='text-white p-18 font-pixi text-2xl [word-spacing:8px] w-fit relative text-justify pr-20'>

                <TypingAnim text={s1} currentPart={currentPart} setCurrentPart={setCurrentPart} expectedPart={0} />

                {" "}
                <SpecialWord text={s2} currentPart={currentPart} setCurrentPart={setCurrentPart} expectedPart={1}
                    style={{
                        '--glow-color': '#61dafb',
                        '--glow-rgb': '97, 218, 251'
                    }}
                    image={reactPng}
                />

                {" "}
                <SpecialWord text={s3} currentPart={currentPart} setCurrentPart={setCurrentPart} expectedPart={2}
                    style={{
                        '--glow-color': '#4db33d',
                        '--glow-rgb': '77, 179, 61'
                    }}
                    image={mongoPng}
                />
                {" "}
                <SpecialWord text={s4} currentPart={currentPart} setCurrentPart={setCurrentPart} expectedPart={3}
                    style={{
                        '--glow-color': 'white',
                        '--glow-rgb': '97, 218, 251'
                    }} image={expressPng}
                />
                {" "}
                <SpecialWord text={s5} currentPart={currentPart} setCurrentPart={setCurrentPart} expectedPart={4}
                    style={{
                        '--glow-color': '#4db33d',
                        '--glow-rgb': '77, 179, 61'
                    }} image={nodePng}
                />
                {" "}

                <TypingAnim text={s6} currentPart={currentPart} setCurrentPart={setCurrentPart} expectedPart={5} />
            </div>
        </>
    )
}
