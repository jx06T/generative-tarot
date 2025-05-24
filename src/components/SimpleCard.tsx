interface SimpleCardProps {
    size?: number;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}

function SimpleCard({ size = 184, delay = 0, className = '', style = {} }: SimpleCardProps) {
    const height = size * (318 / 184);

    return (
        <div
            className={`rounded-sm select-none bg-card-bg bg-cover bg-center ${className}`}
            style={{
                width: size,
                height,
                animationDelay: `${delay}s`,
                transformOrigin: 'center center',
                ...style
            }}
        />
    );
}
export default SimpleCard