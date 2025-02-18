import PropTypes from 'prop-types';
import TicketNum from "./TicketNum"
import "./Ticket.css"

export default function Ticket({ ticket }) {
    if (!Array.isArray(ticket)) {
        return <div className="error">Invalid ticket format</div>;
    }

    return (
        <div className="ticket">
            <h4>Your Ticket</h4>
            <div className="ticket-numbers">
                {ticket.map((num, idx) => (
                    <TicketNum num={num} key={idx} />
                ))}
            </div>
        </div>
    );
}

Ticket.propTypes = {
    ticket: PropTypes.arrayOf(PropTypes.number).isRequired
};