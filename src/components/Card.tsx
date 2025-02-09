import { useEffect, useRef, useState } from "react";

function Card({ screenWidth, currentIndex, id, handleClick, move, englishName, chineseName, defaultIsFlipped = false, imgUrl = "" }: { screenWidth: number, currentIndex: number, id: number, handleClick: Function, defaultIsFlipped?: boolean, move: { x: number, y: number }, englishName: string, chineseName: string, imgUrl?: string, describe: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState<number>(0);
    const [dontAn, setDontAn] = useState<boolean>(false);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [bX, setBX] = useState<number>(0)
    const [bY, setBY] = useState<number>(0)

    useEffect(() => {
        if (defaultIsFlipped) {
            setAngle(0)
            setBX((id - currentIndex) * -104)
            setBY(0)
            setTimeout(() => {
                setDontAn(true)
            }, 1000);
            return
        }

        setAngle(Math.asin((id - currentIndex - Math.floor(screenWidth / 224) + 0.2) * (screenWidth > 1000 ? 0.1 : screenWidth > 600 ? 0.2 : 0.25)) * -50)
        setBY(Math.pow((id - currentIndex - Math.floor(screenWidth / 224) + 0.2), 2) * (screenWidth > 1000 ? -6 : screenWidth > 600 ? -8 : -12))

    }, [defaultIsFlipped, currentIndex, screenWidth, move])



    return (
        <div
            ref={cardRef}
            className={`${(defaultIsFlipped) ? (dontAn ? " transition-none" : " duration-1000  transition-all") : (move.y < -350 ? "duration-700  transition-all" : " transition-none")} -mx-10 grow-0 shrink-0 card pointer-events-auto  select-none rounded-sm  w-[184px] h-[318px] bg-opacity-0 scale-100`}
            // @ts-ignore
            onClick={(e) => {
                if (!defaultIsFlipped) {
                    handleClick(id)
                }
                setIsFlipped(!isFlipped)
            }}
            style={{
                zIndex: !(defaultIsFlipped && isFlipped) ? 20 : 20 + (move.x) * 0.05,
                transform: `translate(${move.x + bX}px, ${move.y + bY}px) rotate(${angle}deg)`,
            }}
        >
            <div
                className={` bg-card-bg  small-card w-full h-full `}
                style={{
                    transform: (defaultIsFlipped && isFlipped) ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    backfaceVisibility: 'hidden',

                }}>
                <div
                    className={` w-full h-full small-card  `}
                    style={{
                    }}
                >
                    <h1 className=" select-text leading-none text-center text-4xl"></h1>
                </div>
            </div>
            <div
                className={` relative w-full h-full bg-black small-card pl-[4px] pr-[4px] py-[5px]`}
                style={{
                    transform: (defaultIsFlipped && isFlipped) ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                }}>
                <div
                    className={`w-full h-full `}
                    style={{
                    }}
                >
                    <div className=" w-full  bg-black h-full rounded-lg overflow-hidden">
                        <img className={` duration-[10000ms] transition-all w-full h-full object-cover ${defaultIsFlipped ? "opacity-100" : "opacity-0"}`} src={`https://picsum.photos/seed/${imgUrl}/500/900`} alt="佔位" />
                    </div>
                </div>
                <div className=" absolute bottom-3 left-[1px] right-[2px] pt-32 pb-2 text-center text-white bg-gradient-to-b from-transparent to-black">
                    <span className=" !text-lg  !leading-2">
                        {chineseName}<br></br>{englishName}
                    </span>
                </div>
                <div className=" rounded-b-lg absolute bottom-[1px] left-[1px] right-[2px] h-3 text-center bg-black">
                </div>
                <div className=" absolute left-0 top-0 w-full h-full bg-card-ov">

                </div>
            </div>
        </div >
    )
}

export default Card