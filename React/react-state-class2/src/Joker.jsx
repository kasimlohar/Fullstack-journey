import { useEffect, useState } from "react";
import './Joker.css';

export default function Joker() {
    // Constants
    const API_URL = "https://official-joke-api.appspot.com/random_joke";
    
    // State initialization
    const [joke, setJoke] = useState({ setup: '', punchline: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch joke function with error handling
    const fetchJoke = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch joke');
            const data = await response.json();
            setJoke({
                setup: data.setup,
                punchline: data.punchline
            });
        } catch (err) {
            setError('Failed to fetch joke. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Initial joke fetch
    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div className="joke-container">
            <h3>Random Joke Generator</h3>
            {isLoading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!isLoading && !error && (
                <>
                    <h2 className="joke-setup">{joke.setup}</h2>
                    <h2 className="joke-punchline">{joke.punchline}</h2>
                </>
            )}
            <button 
                className="joke-button" 
                onClick={fetchJoke} 
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'New Joke'}
            </button>
        </div>
    );
}