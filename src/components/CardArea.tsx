import { useEffect, useState, } from 'react'
import Card from './Card';


function CardArea({ getCardsinterpretation, tarotCards }: { getCardsinterpretation: Function, tarotCards: CardT[] }) {
    const [cards, setCards] = useState<CardT[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(7)
    const [selectedIndex, setSelectedIndex] = useState<number[]>([])
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight)
    const cardW = 200

    useEffect(() => {
        setCards((Array(22)).fill({
            cardChineseName: "",
            cardEnglishName: "",
            describe: "",
            keywords: ""
        }).map((e, i) => ({ ...e, cardEnglishName: i.toString() })))

        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            setScreenHeight(window.innerHeight)

        }

        window.addEventListener("resize", handleResize)

        return () => {
            console.log("!!0")
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        setCurrentIndex(Math.floor(scrollLeft / 100) + 7)
    }

    const handleClick = (index: number) => {
        if (selectedIndex.length == 3) {
            return
        }
        if (selectedIndex.length == 2) {
            getCardsinterpretation()
        }
        setCards(cards.map((e, i) => i == index ? tarotCards[selectedIndex.length] : e))
        setSelectedIndex([...selectedIndex, index])
    }

    useEffect(() => {
        console.log(cards, selectedIndex)
    }, [cards, selectedIndex])

    return (
        <div className=' w-full fixed bg-gradient-to-b from-black to-transparent top-0 left-0 h-[700px]'>
            <div className=' w-10 h-full mx-auto'>
                {cards.map((card: CardT, i) => {
                    const sed = selectedIndex.includes(i)
                    const sedid = selectedIndex.indexOf(i)
                    const isDone = selectedIndex.length == 3;

                    return <Card handleClick={handleClick} defaultIsFlipped={sed} id={i} key={i} imgUrl={card.keywords} move={{ x: sed ?(screenWidth>420? 1.8:1.2) * ((sedid - 1) * (screenWidth / 3)) - 30 : (i - currentIndex) * cardW, y: sed ? (screenHeight < 400 ? 260 : 835) : (0.1 * Math.pow((i - currentIndex), 2) * -30 + (isDone ? -400 : 0)) }} englishName={card.cardEnglishName} chineseName={card.cardChineseName} describe={card.describe}></Card>
                })}
            </div>
            <div className='z-[2000] fixed w-full top-0 left-0 h-4 bg-gradient-to-b from-yellow-300/50 to-transparent'></div>
            <div onScroll={handleScroll} className=' /no-scrollbar bg-white/50 z-[1500] fixed w-full top-0 left-0 h-44 /bg-transparent overflow-x-auto'>
                <div className=' w-[1800px] h-full'></div>
            </div>
        </div>
    )
}

export default CardArea