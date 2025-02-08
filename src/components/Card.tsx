import { useEffect, useRef, useState } from "react";

function Card({ move, englishName, chineseName, imgUrl = "", describe = "" }: { move: { x: number, y: number }, englishName: string, chineseName: string, imgUrl?: string, describe: string }) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [angle, setAngle] = useState<number>(0);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [action, setAction] = useState<number>(0);
    const [alpha, setAlpha] = useState<number>(0);

    const lastX = useRef<number>(0)
    const lastY = useRef<number>(0)
    const cardRef = useRef<HTMLDivElement>(null);
    const overRef = useRef<boolean>(false);
    const overX = useRef<number>(100);
    useEffect(() => {
        setTimeout(() => {
            setIsFlipped(true)
        }, 2000);
    })

    useEffect(() => {
        setAlpha(Math.min(90, Math.max(0, (Math.abs(position.x) - overX.current + 70) * 0.5)))
    }, [position])

    return (
        <div
            ref={cardRef}
            className={` card pointer-events-auto absolute top-16 bottom-[70px] select-none mt-3 rounded-2xl  w-[365px] h-[626px] bg-opacity-0  z-30 scale-50`}
            style={{
                transform: `translate(${move.x}px, ${move.y}px) rotate(${angle}deg)`,
                transition: isDragging || isMoving ? 'none' : 'transform 0.2s ease-out',
                perspective: isDragging || isMoving ? '9000rem' : '100rem'
            }}
        >
            <div
                className={` bg-card-bg  small-card w-full h-full `}
                style={{
                    transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    backfaceVisibility: 'hidden',

                }}>
                <div
                    className={` w-full h-full small-card ${isDragging ? 'dragging' : ''} `}
                    style={{
                        transition: isDragging ? 'none' : 'background-color 0.2s ease-out',
                    }}
                >
                    <h1 className=" select-text leading-none text-center text-4xl"></h1>
                </div>
            </div>
            <div
                className={` relative w-full h-full bg-black small-card pl-[9px] pr-[11px] py-[10px]`}
                style={{
                    transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                }}>
                <div
                    className={`w-full h-full ${isDragging ? 'dragging' : ''} `}
                    style={{
                        transition: isDragging ? 'none' : 'background-color 0.2s ease-out',
                    }}
                >
                    <div className=" w-full  bg-amber-700 h-full rounded-md overflow-hidden">
                        <img className=" w-full h-full object-cover" src={`https://picsum.photos/seed/${imgUrl}/500/900`} alt="佔位" />
                    </div>
                </div>
                <div className=" absolute bottom-0 left-[9px] right-[11px] pb-14 pt-24 text-center text-white bg-gradient-to-b from-transparent to-black">
                    <span className=" !text-3xl">
                        {chineseName}<span className=" mx-1">/</span>{englishName}
                    </span>
                </div>
                <div className=" absolute left-0 top-0 w-full h-full bg-card-ov">

                </div>
            </div>
        </div >
    )
}

export default Card