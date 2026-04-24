import { useEffect, useState } from "react";

export const TypingAnim = ({ text, currentPart, setCurrentPart, expectedPart }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        if (currentPart === expectedPart) {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setDisplay(text.slice(0, i));

                if (i === text.length) {
                    clearInterval(interval);
                    setCurrentPart(expectedPart + 1); // Move to next part
                }
            }, 60);
            return () => clearInterval(interval);
        }
    }, [currentPart, expectedPart, text]);

    return <>{display}</>;
}