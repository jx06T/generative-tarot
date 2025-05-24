import { useEffect, useState, useRef } from "react";
import Card from "./Card";

interface CardT {
    cardChineseName: string;
    cardEnglishName: string;
    describe: string;
    keywords: string;
    photo_url?: string;
}

interface CardAreaProps {
    getCardsinterpretation: () => void;
    tarotCards: CardT[];
}

function CardArea({ getCardsinterpretation, tarotCards }: CardAreaProps) {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
    const [cards, setCards] = useState<CardT[]>([]);
    const [currentOffset, setCurrentOffset] = useState<number>(5);
    const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
    const isDragging = useRef<boolean>(false);
    const startX = useRef<number>(0);
    const currentX = useRef<number>(5);
    const [scale, setScale] = useState<number>(1 + (window.innerWidth - 1700) / 3000)

    // Initialize cards and handle window resize
    useEffect(() => {
        setCards(
            Array(30)
                .fill({
                    cardChineseName: "",
                    cardEnglishName: "",
                    describe: "",
                    keywords: "",
                    photo_url: "",
                })
                .map((e, i) => ({ ...e, cardEnglishName: i.toString() }))
        );

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
            setScale(1 + (window.innerWidth - 1000) / 2000)
        };

        setScale(1 + (window.innerWidth - 1000) / 2000)
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Handle mouse/touch start
    const handleStart = (clientX: number) => {
        isDragging.current = true;
        startX.current = clientX;
        currentX.current = currentOffset;
    };

    // Handle mouse/touch move
    const handleMove = (clientX: number) => {
        if (!isDragging.current) return;
        const deltaX = clientX - startX.current;
        const newOffset = currentX.current - deltaX * 0.01;

        if (newOffset / scale < 1.5 - (screenWidth / 565) || (cards.length - newOffset) * 105 < (screenWidth - (screenWidth / 13) - 160) / scale) {
            return
        }

        if (Math.abs(deltaX) < 5) {
            return
        }
        setCurrentOffset(newOffset);
    };

    // Handle mouse/touch end
    const handleEnd = () => {
        isDragging.current = false;
    };

    // Mouse event handlers
    const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();

    // Touch event handlers
    const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleEnd();

    // Handle card click
    const handleClick = (index: number) => {
        if (selectedIndex.length >= 3) {
            return
        };

        const newSelectedIndex = [...selectedIndex, index];
        setSelectedIndex(newSelectedIndex);
        setCards(cards.map((e, i) => (i === index ? tarotCards[selectedIndex.length] : e)));

        if (newSelectedIndex.length === 3) {
            getCardsinterpretation();
        }
    };

    // Calculate card position and rotation
    const getCardPosition = (index: number, isSelected: boolean, selectedPosition: number) => {
        if (isSelected) {
            const xOffset = selectedPosition * (screenWidth / 3.1) / scale + screenWidth / 6.4 - (125 / scale);
            const yOffset = screenHeight < 400 ? 10 : screenWidth < 420 ? 430 : 300 / scale;
            return { x: xOffset, y: yOffset, angle: 0, zIndex: 30 };
        }

        const isDone = selectedIndex.length === 3;
        const relativeIndex = (index - currentOffset) * scale;
        const xOffset = relativeIndex * 105 / scale;
        const baseY = isDone ? -320 : -110 / scale;
        const angle =
            Math.asin(
                (relativeIndex - Math.floor(screenWidth / 224) + 0.2) *
                (screenWidth > 1000 ? 0.1 : screenWidth > 600 ? 0.2 : 0.25)
            ) * -50;
        const bY =
            Math.pow(relativeIndex - Math.floor(screenWidth / 224) + 0.2, 2) *
            (screenWidth > 1000 ? -6 : screenWidth > 600 ? -8 : -12);

        return { x: xOffset, y: baseY + bY, angle, zIndex: 20 };
    };

    return (
        <div
            className="w-full fixed bg-gradient-to-b from-black to-transparent top-0 left-0 h-[700px]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full h-screen flex overflow-x-hidden overflow-y-hidden pl-14 no-scrollbar">
                {cards.map((card: CardT, i) => {
                    const isSelected = selectedIndex.includes(i);
                    const selectedPosition = selectedIndex.indexOf(i);
                    const position = getCardPosition(i, isSelected, selectedPosition);
                    if (position.x < (screenWidth / 10 - 285) || position.x > screenWidth - (screenWidth / 5.8 - 75) || position.y < -680) {
                        return null
                    }
                    return (
                        <Card
                            key={i}
                            id={i}
                            handleClick={handleClick}
                            isFlipped={isSelected}
                            position={position}
                            englishName={card.cardEnglishName}
                            chineseName={card.cardChineseName}
                            imgUrl={card.photo_url}
                            describe={card.describe}
                            scale={scale}
                        />
                    );
                })}
            </div>
            <div className="z-[2000] fixed w-full top-0 left-0 h-4 bg-gradient-to-b from-yellow-300/50 to-transparent" />
        </div>
    );
}

export default CardArea;