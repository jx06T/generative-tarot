import { useEffect, useState, useRef } from 'react';
import Card from './Card';

function CardArea({ getCardsinterpretation, tarotCards }: { getCardsinterpretation: Function, tarotCards: CardT[] }) {

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

    const [cards, setCards] = useState<CardT[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(Math.floor(screenWidth / 400));
    const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardW = 200;
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
            // const newIndex = 7 + (scrollLeft * scrollMultiplier);
            const b = Math.floor(screenWidth / 400)
            const newIndex = b + Math.floor(scrollLeft / 10) / 10;
            if (Math.abs(scrollLeft - newIndex) < 50) {
                return
            }
            lastXRef.current = scrollLeft

            if (newIndex !== currentIndex) {
                setCurrentIndex(Math.max(b, Math.min(newIndex, cards.length - b)));
            }
        });
    };

    const handleClick = (index: number) => {
        if (selectedIndex.length >= 3) return;

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
            const xOffset = (screenWidth > 420 ? 1.8 : 1.2) * ((selectedPosition - 1) * (screenWidth / 3)) - 30;
            const yOffset = screenHeight < 400 ? 260 : 835;
            return { x: xOffset, y: yOffset };
        }

        const isDone = selectedIndex.length === 3;
        const baseX = (index - currentIndex) * cardW;
        const baseY = 0.1 * Math.pow((index - currentIndex), 2) * -30 + (isDone ? -400 : 0);

        return { x: baseX, y: baseY };
    };

    return (
        <div className="w-full fixed bg-gradient-to-b from-black to-transparent top-0 left-0 h-[700px]">
            <div className="w-10 h-full mx-auto">
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
                            imgUrl={card.keywords}
                            move={position}
                            englishName={card.cardEnglishName}
                            chineseName={card.cardChineseName}
                            describe={card.describe}
                        />
                    );
                })}
            </div>
            <div className="z-[2000] fixed w-full top-0 left-0 h-4 bg-gradient-to-b from-yellow-300/50 to-transparent" />
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="fixed w-full top-0 left-0 h-44 overflow-x-auto  bg-transparent no-scrollbar /bg-white/50 z-[1500]"
            >
                <div className="w-[2600px] h-full" />
            </div>
        </div>
    );
}

export default CardArea;