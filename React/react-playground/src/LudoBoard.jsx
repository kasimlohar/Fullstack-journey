import { useState } from 'react';
import './LudoBoard.css';

export default function LudoBoard() {
    const [gameState, setGameState] = useState({
        moves: {
            blue: 0,
            yellow: 0,
            green: 0,
            red: 0
        },
        history: ["Game started"]
    });

    const updateMove = (color) => {
        setGameState(prev => ({
            moves: {
                ...prev.moves,
                [color]: prev.moves[color] + 1
            },
            history: [...prev.history, `${color} moved`]
        }));
    };

    const colors = [
        { name: 'blue', textColor: 'white' },
        { name: 'yellow', textColor: 'black' },
        { name: 'green', textColor: 'white' },
        { name: 'red', textColor: 'white' }
    ];

    return (
        <div className="ludo-container">
            <h2>Game Progress</h2>
            <div className="move-history">
                {gameState.history.map((move, index) => (
                    <p key={index}>{move}</p>
                ))}
            </div>
            <div className="board">
                {colors.map(color => (
                    <div key={color.name} className="player-section">
                        <p>{`${color.name} moves: ${gameState.moves[color.name]}`}</p>
                        <button 
                            style={{
                                backgroundColor: color.name,
                                color: color.textColor
                            }}
                            onClick={() => updateMove(color.name)}
                        >
                            +1
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
