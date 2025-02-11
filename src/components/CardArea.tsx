import { useEffect, useState, useRef } from 'react';
import Card from './Card';

function CardArea({ getCardsinterpretation, tarotCards }: { getCardsinterpretation: Function, tarotCards: CardT[] }) {

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

    const [cards, setCards] = useState<CardT[]>([]);
    // const [done, setDone] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
    const lastXRef = useRef<number>(0)

    useEffect(() => {
        setCards((Array(22)).fill({
            cardChineseName: "",
            cardEnglishName: "",
            describe: "",
            keywords: ""
        }).map((e, i) => ({ ...e, cardEnglishName: i.toString() })));

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        requestAnimationFrame(() => {
            const newIndex = Math.floor(scrollLeft / 10) / 10;
            lastXRef.current = scrollLeft

            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }
        });
    };

    const handleClick = (index: number) => {
        if (selectedIndex.length >= 3) {
            return
        };

        const newSelectedIndex = [...selectedIndex, index];
        setSelectedIndex(newSelectedIndex);
        setCards(cards.map((e, i) =>
            i === index ? tarotCards[selectedIndex.length] : e
        ));

        if (newSelectedIndex.length === 3) {
            getCardsinterpretation();
        }
    };

    const getCardPosition = (index: number, isSelected: boolean, selectedPosition: number) => {
        if (isSelected) {
            const xOffset = (selectedPosition) * (screenWidth / 3.2) + screenWidth / 6.4 - 100;
            const yOffset = screenHeight < 400 ? 25 : (screenWidth < 420 ? 280 : 340);
            return { x: xOffset, y: yOffset };
        }

        const isDone = selectedIndex.length === 3;
        const xOffset = (index - currentIndex) * 105;
        const baseY = (isDone ? -320 : -110);

        return { x: xOffset, y: baseY };
    };

    return (
        <div className="w-full fixed bg-gradient-to-b from-black to-transparent top-0 left-0 h-[700px]">
            <div
                className={`w-full h-screen /bg-red-300 flex overflow-x-hidden overflow-y-hidden pl-14 no-scrollbar`}
            >
                {cards.map((card: CardT, i) => {
                    const isSelected = selectedIndex.includes(i);
                    const selectedPosition = selectedIndex.indexOf(i);
                    const position = getCardPosition(i, isSelected, selectedPosition);

                    return (
                        <Card
                            key={i}
                            handleClick={handleClick}
                            defaultIsFlipped={isSelected}
                            id={i}
                            currentIndex={currentIndex}
                            screenWidth={screenWidth}
                            imgUrl={card.photo_url}
                            move={position}
                            englishName={card.cardEnglishName}
                            chineseName={card.cardChineseName}
                            describe={card.describe}
                        />
                    );
                })}
            </div>
            <div
                onScroll={handleScroll}
                className=' bg-gray-600/5 absolute top-0 left-0 w-full h-36 overflow-x-auto z-50  no-scrollbar'
            >
                <div className=' h-full w-[2200px]'></div>
            </div>
            <div className="z-[2000] fixed w-full top-0 left-0 h-4 bg-gradient-to-b from-yellow-300/50 to-transparent" />
        </div>
    );
}

export default CardArea;