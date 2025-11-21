import { useState } from "react";
import '../styles/Leaderboard.css';

const Leaderboard = ({ leaderboard, onSaveScore, currentScore,
    gameState }) => {

    const [playerName, setPlayerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(false);

    const handleSaveScore = () => {
        if (playerName.trim()) {
            onSaveScore(playerName.trim(), currentScore);
            setShowNameInput(false);
            setPlayerName('');
        }
    };

    const shouldShowSaveOption =
        gameState === 'gameOver' && currentScore > 0;

    return (
        <div className="leaderboard">
            <h3>Leaderboard 🏆</h3>

            {shouldShowSaveOption && !showNameInput && (
                <div className="save-score-section">
                    <p>Your Score: {currentScore.toLocaleString()}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowNameInput(true)}
                    >
                        Save Score
                    </button>
                </div>
            )}

            {showNameInput && (
                <div className="name-input-section">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        maxLength={25}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveScore}
                    />
                    <div className="name-input-button">
                        <button className="btn btn-primary" onClick={handleSaveScore}>
                            Save
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowNameInput(false)}
                        >Cancel</button>
                    </div>
                </div>
            )}

            <div className="scores-list">
                {leaderboard.length === 0 ? (
                    <p className="no-scores">No scores yet</p>
                ) : (
                    leaderboard.map((entry, index) => (
                        <div key={entry.id} className="score-entry">
                            <span className="rank">{index + 1}</span>
                            <span className="name">{entry.playerName}</span>
                            <span className="score">{entry.score.toLocaleString()}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Leaderboard;