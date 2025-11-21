import { useState, useEffect, useCallback, useRef } from "react";
import './Bubble';
import './GameUI';
import '../styles/Game.css';

const Game = () => {
    const [bubbles, setBubbles] = useState([]);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameState, setGameState] = useState('waiting');
    const [timeLeft, setTimeLeft] = useState(60);
    const [combo, setCombo] = useState(0);
    const [lastPopTime, setLastPopTime] = useState(0);

    const gameAreaRef = useRef(null);
    const bubbleRef = useRef(0);
    const spawnIntervalRef = useRef(null);
    const gameTimerRef = useRef(null);

    const bubbleTypes = [
        { color: '#2832c2', points: 10, speed: 2, type: 'normal' },
        { color: '#fc46aa', points: 25, speed: 1.5, type: 'normal' },
        { color: '#602a80', points: 40, speed: 2.5, type: 'normal' },
        { color: '#ff2400', points: 50, speed: 4, type: 'splitter' }
    ];

    const createBubble = useCallback((x = null, y = null, customType = null) => {
        if (!gameAreaRef.current) return;

        const gameArea = gameAreaRef.current.getBoundingClientRect();
        const bubbleType = customType ||
            bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];

        return {
            id: bubbleRef.current++,
            x: x !== null ? x : Math.random() *
                (gameArea.width - bubbleType.size),
            y: y !== null ? y : gameArea.height,
            ...bubbleType,
            speed: bubbleType.speed + (level - 1) * 0.5,
        };
    }, [level, bubbleTypes]);

    const spawnBubble = useCallback(() => {
        if (gameState !== 'playing') return;

        const newBubble = createBubble();
        if (newBubble) {
            setBubbles(prev => [...prev, newBubble]);
        }
    }, [createBubble, gameState]);

    const handleBubblePop = useCallback((bubbleId, wasClicked) => {
        setBubbles(prev => {
            const bubble = prev.find(b => b.id === bubbleId);

            if (wasClicked) {
                const now = Date.now();
                const timeSinceLastPop = now - lastPopTime;

                //combo system
                let newCombo = timeSinceLastPop < 1000 ? combo + 1 : 1;
                setCombo(newCombo);
                setLastPopTime(now);

                //calculate score
                const basePoint = bubble.points;
                const comboMultiplier = Math.min(newCombo, 5);
                const earnedPoits = basePoint * comboMultiplier;

                setScore(prevScore => prevScore + earnedPoits);
            }

            return prev.filter(b => b.id !== bubbleId);
        });
    }, [combo, lastPopTime, createBubble]);

    const startGame = useCallback(() => {
        setGameState('playing');
        setScore(0);
        setLevel(1);
        setTimeLeft(60);
        setCombo(0);
        setBubbles([]);
        setLastPopTime(0);
    }, []);

    const pauseGame = useCallback(() => {
        setGameState('paused');
    }, []);

    const resumeGame = useCallback(() => {
        setGameState('playing');
    }, []);

    const resetGame = useCallback(() => {
        setGameState('waiting');
        setBubbles([]);
    }, []);

    //Game timer
    useEffect(() => {
        if (gameState === 'playing') {
            gameTimerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameState('gameOver');
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000);
        } else {
            clearInterval(gameTimerRef.current)
        }
        return () => clearInterval(gameTimerRef.current);
    }, [gameState]);
}

export default Game;
