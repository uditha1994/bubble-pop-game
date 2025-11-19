import { useState, useEffect } from "react"
import '../styles/Bubble.css';

const Bubble = ({ bubble, onPop, gameArea }) => {
    const [position, setPosition] = useState({ x: bubble.x, y: bubble.y });
    const [isPopping, setIsPopping] = useState(false);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPosition(prev => {
                const newY = prev.y - bubble.speed;
                if (newY < -bubble.size) {
                    onPop(bubble.id, false); //bubble escaped
                }
                return { ...prev, y: newY };
            });
        }, 16);
    })

    const handleClick = () => {
        if (isPopping) {
            return;
        }
        setIsPopping(true);
        setTimeout(() => onPop(bubble.id, true), 200);
    }

    const bubbleStyle = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        backgroundColor: bubble.color,
        transform: isPopping ? 'scale(1.5)' : 'scale(1)',
        opacity: isPopping ? 0 : 1
    };

    return (
        <div
            className={`bubble ${bubble.type} ${isPopping ? 'popping' : ''}`}
            style={bubbleStyle}
            onClick={handleClick}
        >
            <div className="bubble-shine"></div>
            <div className="bubble-hightlight"></div>
            {bubble.points && (
                <span className="bubble-points">+{bubble.points}</span>
            )}
        </div>
    );
};

export default Bubble;