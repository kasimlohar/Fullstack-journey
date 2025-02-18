import PropTypes from 'prop-types';
import "./TicketNum.css"

export default function TicketNum({num}) {
    return (
        <span className="TicketNum" title={`Ticket number: ${num}`}>
            {num}
        </span>
    );
}

TicketNum.propTypes = {
    num: PropTypes.number.isRequired
};