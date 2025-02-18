import { useState, useEffect } from "react";
import './Counter.css';

export default function Counter() {
    const [counts, setCounts] = useState({ x: 0, y: 0 });

    const updateCount = (key) => {
        setCounts(prev => ({
            ...prev,
            [key]: prev[key] + 1
        }));
    };

    const resetCounts = () => {
        setCounts({ x: 0, y: 0 });
    };

    useEffect(() => {
        document.title = `Count X: ${counts.x} | Count Y: ${counts.y}`;
    }, [counts]);

    return (
        <div className="counter-container">
            {Object.entries(counts).map(([key, value]) => (
                <div key={key} className="counter-section">
                    <h3 className="counter-value">Count {key.toUpperCase()} = {value}</h3>
                    <button 
                        className="counter-button" 
                        onClick={() => updateCount(key)}
                    >
                        +1
                    </button>
                </div>
            ))}
            <button className="reset-button" onClick={resetCounts}>
                Reset All
            </button>
        </div>
    );
}