import { useState } from "react";
import StreamText from '../components/StreamText';

interface CardProps {
    id: number;
    handleClick: (id: number) => void;
    isFlipped?: boolean;
    position: { x: number; y: number; angle: number; zIndex: number };
    englishName: string;
    chineseName: string;
    imgUrl?: string;
    describe?: string;
    scale?: number;
    hidden?: boolean
}

function Card({
    id,
    handleClick,
    isFlipped = false,
    position,
    englishName,
    chineseName,
    imgUrl = "",
    describe = "",
    scale = 1,
    hidden = false,
}: CardProps) {
    const [isAnimating, _] = useState<boolean>(!isFlipped);
    const [isFlippedLocal, setIsFlippedLocal] = useState<boolean>(true);
    const [isStreamTextDone, setIsStreamTextDone] = useState<boolean>(false);
    const [shouldBeLarge, setShouldBeLarge] = useState<boolean>(false);

    return (
        <div
            className={`absolute grow-0 shrink-0 card pointer-events-auto select-none rounded-sm w-[184px] h-[318px] bg-opacity-0 scale-100 ${isFlipped && isAnimating ? "duration-700 transition-transform" : "transition-none"}  ${hidden && " hidden"}  `}
            onDoubleClick={() => isFlipped ? setIsFlippedLocal(true) : handleClick(id)}
            onClick={() => { isFlipped && setShouldBeLarge(!shouldBeLarge); isStreamTextDone && setIsStreamTextDone(false) }}
            style={{
                zIndex: shouldBeLarge ? 1000 : position.zIndex,
                transform: `translate(${shouldBeLarge ? (window.innerWidth / 2 - 150) / 1.5 : position.x}px, ${shouldBeLarge ? 80 : position.y}px) rotate(${position.angle}deg)`,
                scale: shouldBeLarge ? 1.5 : scale
            }}
        >
            {/* 背面 */}
            <div
                className="bg-card-bg small-card w-full h-full"
                style={{
                    transform: (isFlippedLocal && isFlipped) ? "rotateY(-180deg)" : "rotateY(0deg)",
                    backfaceVisibility: "hidden",
                }}
            >
                <div className="w-full h-full small-card">
                    <h1 className="mt-60 select-text leading-none text-center text-sm text-white">{id + 1}</h1>
                </div>
            </div>

            {/* 正面 */}
            <div
                className="relative w-full h-full bg-black small-card pl-[4px] pr-[4px] py-[5px]"
                style={{
                    transform: (isFlippedLocal && isFlipped) ? "rotateY(0deg)" : "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                }}
            >
                <div className="w-full h-full">
                    <div className="w-full bg-black h-full rounded-lg overflow-hidden">
                        <img
                            className={`duration-1000 transition-all w-full h-full object-cover ${(isFlippedLocal && isFlipped) ? "opacity-100" : "opacity-0"
                                }`}
                            src={imgUrl != "" ? imgUrl : undefined}
                            alt={describe}
                        />
                    </div>
                </div>
                <div className="absolute bottom-3 left-[1px] right-[2px] pt-32 pb-2 text-center text-white bg-gradient-to-b from-transparent to-black">
                    <span className="!text-base !leading-1">
                        {chineseName}
                        <br />
                        {englishName}
                    </span>
                </div>
                <div className="rounded-b-lg absolute bottom-[1px] left-[1px] right-[2px] h-3 text-center bg-black"></div>
                <div className="absolute left-0 top-0 w-full h-full bg-card-ov pointer-events-none"></div>
            </div>
            {shouldBeLarge &&
                <div className=' w-[150%] scale-90 z-[60] mt-[20rem] -translate-x-[16%] bg-white/4 p-4 overflow-y-auto no-scrollbar  backdrop-blur-sm rounded-md '>
                    <StreamText className=' text-white h-fit text-xs' text={describe} texts={[]} speed={20} complete={isStreamTextDone} onComplete={() => { setIsStreamTextDone(true) }}></StreamText>
                </div>
            }
        </div>
    );
}

export default Card;