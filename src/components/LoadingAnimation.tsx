import SimpleCard from "./SimpleCard";

function LoadingAnimation({ className }: { className: string }) {
    return (
        <div className={`flex items-center justify-center bg-transparent ${className}`}>
            <div className="relative">
                <div className="relative w-48 h-48">
                    {[0, 1, 2].map((index) => {
                        const animationDuration = 3 + index * 0.5; 

                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 left-[60%]"
                                style={{
                                    animation: `orbit${index} ${animationDuration}s linear infinite`,
                                }}
                            >
                                <SimpleCard
                                    size={50}
                                    className="shadow-lg"
                                    style={{
                                        animation: `cardRotate${index} ${animationDuration}s linear infinite reverse`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-white text-lg font-medium animate-pulse">Generating...</p>
                </div>
            </div>

        </div>
    );
}

export default LoadingAnimation