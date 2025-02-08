import { useEffect, useRef, useState } from "react";

function Card({ id, handleClick, move, englishName, chineseName, defaultIsFlipped = false, imgUrl = "" }: { id: number, handleClick: Function, defaultIsFlipped?: boolean, move: { x: number, y: number }, englishName: string, chineseName: string, imgUrl?: string, describe: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState<number>(0);
    const bX = -300
    const bY = -500

    useEffect(() => {
        if (defaultIsFlipped) {
            setAngle(0)
            return
        }
        setAngle(Math.sin(move.x * 0.001) * -10)
    }, [move])


    return (
        <div
            ref={cardRef}
            className={`${defaultIsFlipped ? " duration-1000" : (move.y < -350 ? "duration-700" : " duration-75 ")} transition-all  origin-center card pointer-events-auto absolute select-none mt-3 rounded-2xl  w-[365px] h-[626px] bg-opacity-0 scale-50`}
            // @ts-ignore
            onClick={(e) => handleClick(id)}
            style={{
                zIndex: 20 + (move.x) * 0.05,
                transform: `translate(${move.x + bX}px, ${move.y + bY}px) rotate(${angle}deg)`,
            }}
        >
            <div
                className={` bg-card-bg  small-card w-full h-full `}
                style={{
                    transform: defaultIsFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
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
                className={` relative w-full h-full bg-black small-card pl-[9px] pr-[11px] py-[10px]`}
                style={{
                    transform: defaultIsFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                }}>
                <div
                    className={`w-full h-full `}
                    style={{
                    }}
                >
                    <div className=" w-full  bg-black h-full rounded-md overflow-hidden">
                        <img className={` duration-[10000ms] transition-all w-full h-full object-cover ${defaultIsFlipped ? "opacity-100" : "opacity-0"}`} src={`https://picsum.photos/seed/${imgUrl}/500/900`} alt="佔位" />
                    </div>
                </div>
                <div className=" absolute bottom-6 left-[9px] right-[11px] pb-4 pt-72 text-center text-white bg-gradient-to-b from-transparent to-black">
                    <span className=" !text-3xl px-4">
                        {chineseName}<br></br>{englishName}
                    </span>
                </div>
                <div className=" absolute bottom-[1px] left-[9px] right-[11px] h-6 text-center bg-black">
                </div>
                <div className=" absolute left-0 top-0 w-full h-full bg-card-ov">

                </div>
            </div>
        </div >
    )
}

export default Card