import { useState, useEffect, useRef, useMemo } from 'react';


function StreamText({
    text = '',
    texts = [],
    speed = 90,
    className = '',
    onComplete
}: {
    text?: string;
    texts?: string[];
    speed?: number;
    className?: string;
    onComplete?: () => void;
}) {
    const textArray = useMemo(() => texts.length > 0 ? texts : [text], [text, texts]);

    const stateRef = useRef({
        displayedText: '',
        currentTextIndex: 0,
        currentIndex: 0,
        isDeleting: false,
        key: Date.now()
    });

    // const [displayedText, setDisplayedText] = useState('');
    const [displayedText, setDisplayedText] = useState<string[]>([]);

    const processText = (text: string): string[] => {
        return text.split('\n');
    };

    useEffect(() => {
        // 重置狀態
        stateRef.current = {
            displayedText: '',
            currentTextIndex: 0,
            currentIndex: 0,
            isDeleting: false,
            key: Date.now()
        };

        // setDisplayedText('');
        setDisplayedText([]);

        if (textArray.length === 0) return;

        const timer = setInterval(() => {
            const state = stateRef.current;
            const currentText = "%%" + textArray[state.currentTextIndex] + "%%%";

            if (!state.isDeleting) {
                if (state.currentIndex < currentText.length) {
                    state.displayedText += currentText[state.currentIndex].replace("%", "");
                    state.currentIndex++;
                    setDisplayedText(processText(state.displayedText));
                    // setDisplayedText(state.displayedText);
                } else {
                    state.isDeleting = true;
                    if (texts.length == 0) {
                        console.log("dd")
                        clearInterval(timer)
                    }
                }
            } else {
                if (state.currentIndex > 0) {
                    state.displayedText = state.displayedText.slice(0, -1);
                    state.currentIndex--;
                    setDisplayedText(processText(state.displayedText));
                    // setDisplayedText(state.displayedText);
                } else {
                    state.currentTextIndex = (state.currentTextIndex + 1) % textArray.length;
                    state.isDeleting = false;

                    if (state.currentTextIndex === 0 && onComplete) {
                        onComplete();
                    }
                }
            }
        }, speed * (Math.random() + 1) * (stateRef.current.isDeleting ? 0.5 : 1));

        return () => clearInterval(timer);
    }, [textArray, speed, onComplete]);

    return (
        <div className={className}>
            {displayedText.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                    {line}
                    {index === displayedText.length - 1 && (
                        <span className="animate-pulse ml-1 inline-block">|</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StreamText;