import TicketHead from './TicketHeader';
import TicketBody from './TicketBody';
import TicketFooter from './TicketFooter';

const TicketCard = ({ ticket, updateTicketTitle, updateTickets }) => {

    return (
        <div
            draggable
            onDragStart={(event) => event.dataTransfer.setData("id", ticket.id)}
            className="rounded-xl p-2 m-3 bg-white border-4 hover:border-blue-400 cursor-pointer">
            <TicketHead ticket={ticket} />
            <TicketBody ticket={ticket} updateTicketTitle={updateTicketTitle} updateTickets={updateTickets} />
            <TicketFooter ticket={ticket} />
        </div>
    )
}

export default TicketCard