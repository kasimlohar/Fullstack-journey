import { useState } from "react";
import PropTypes from 'prop-types';
import { genTicket, sum } from "./helper";
import Ticket from "./Ticket"

export default function Lottery({n=3, winCondition}) {
    const [ticket, setTicket] = useState(genTicket(n));
    const [isLoading, setIsLoading] = useState(false);
    
    const buyTicket = () => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setTicket(genTicket(n));
            setIsLoading(false);
        }, 500);
    }

    return (
        <div className="lottery-container">
            <h1>Lottery Game!</h1>
            <Ticket ticket={ticket}/>
            <button 
                onClick={buyTicket} 
                disabled={isLoading}
            >
                {isLoading ? 'Generating...' : 'Buy New Ticket'}
            </button>
            {winCondition(ticket) && (
                <h3 className="winning-message">Congratulations, you won!</h3>
            )}
        </div>
    );
}

Lottery.propTypes = {
    n: PropTypes.number,
    winCondition: PropTypes.func.isRequired
};