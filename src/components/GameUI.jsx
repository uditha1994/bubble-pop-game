import '../styles/GameUI.css';

const GameUI = ({
    score, level, timeLeft, gameState, onStart, onPause,
    onResume, onRestart, combo
}) => {
    return (
        <div className="game-ui">
            <div className="top-bar">
                <div className="score-section">
                    <div className="score">
                        <span className="label">Score</span>
                        <span className="value">{score.toLocaleString()}</span>
                    </div>
                    <div className="level">
                        <span className="label">Level</span>
                        <span className="value">{level}</span>
                    </div>
                    <div className="timer">
                        <span className="label">Time</span>
                        <span className="value">{timeLeft}</span>
                    </div>
                </div>

                <div className="controls">
                    {gameState === 'waiting' && (
                        <button className="btn btn-primary" onClick={onStart}>
                            Start Game
                        </button>
                    )}
                    {gameState === 'playing' && (
                        <button className="btn btn-secondary" onClick={onPause}>
                            Pause
                        </button>
                    )}
                    {gameState === 'paused' && (
                        <button className="btn btn-primary" onClick={onResume}>
                            Resume
                        </button>
                    )}
                    {gameState === 'gameOver' && (
                        <button className="btn btn-primary" onClick={onRestart}>
                            Play Again
                        </button>
                    )}
                </div>
            </div>

            {combo > 1 && (
                <div className="combo-indicator">
                    <span className="combo-text">COMBO x{combo}</span>
                </div>
            )}

            {gameState === 'waiting' && (
                <div className="game-overlay">
                    <div className="welcome-screen">
                        <h1>Bubble Pop Challenge</h1>
                        <ul className="introductions">
                            <li>Blue Bubble: 10 points</li>
                            <li>Pink Bubble : 25 points</li>
                            <li>Purple Bubble : 40 points</li>
                            <li>Red Bubble : 50 points</li>
                            <li>Chain pops for combo multipliers!</li>
                        </ul>
                    </div>
                </div>
            )}

            {gameState === 'paused' && (
                <div className="game-overlay">
                    <div className="pause-screen">
                        <h2>Game Paused</h2>
                        <p>Click resume to continue</p>
                    </div>
                </div>
            )}

            {gameState === 'gameOver' && (
                <div className="game-overlay">
                    <div className="game-over-screen">
                        <h2>Game Over!!!</h2>
                        <div className="final-score">
                            <span>Final Score: {score.toLocaleString()}</span>
                        </div>
                        <div className="final-level">
                            <span>Level Reached: {level}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameUI;