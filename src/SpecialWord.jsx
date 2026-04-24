import { useEffect, useState } from "react";
import styles from "./TextReveal.module.css";
import { TypingAnim } from './TypingAnim';

export const SpecialWord = ({ text, currentPart, setCurrentPart, expectedPart,style,image }) => {

  const [burstComplete, setBurstComplete] = useState(false);
  const [startBurst, setStartBurst] = useState(false);

  useEffect(() => {

        if (currentPart === expectedPart) {
    // Start the burst animation after typing completes
    setTimeout(() => {
      setStartBurst(true);
    }, 1000); // Small delay after typing

    // Trigger the image burst at the peak of the glow
    setTimeout(() => {
      setBurstComplete(true);
    }, 1100); // 100ms + 1000ms (50% of 2s animation)
  }
  },[currentPart]);


  const BouncyImage = ({ show }) => {
    if (show)
      return (
        <div className={`img_container h-20 w-20 animate-bounce  ${styles.imageBurst} w-full `}>
          <img src={image} alt="" className="w-full absolute" />
        </div>
      )
  }

  return (
    <div className='flex-col inline-flex p-0 relative items-center'>
      <div className={`${startBurst ? styles.textReveal : ""}`}style={style}>

        <BouncyImage show={burstComplete} />

        <TypingAnim text={text} currentPart={currentPart} setCurrentPart={setCurrentPart} expectedPart={expectedPart} />

      </div>
    </div>
  )
}