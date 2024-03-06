import React from 'react';
import TicketHeader from './TicketHeader';
import TicketBody from './TicketBody';
import TicketFooter from './TicketFooter';
import TicketEditForm from './TicketEditForm';


const TicketCard = ({ ticket, updateTicketTitle, updateTickets }) => {
    const [formOpen, setFormOpen] = React.useState(false);

    const handleClickOpen = () => {
        setFormOpen(true);
    }

    const handleClose = () => {
        setFormOpen(false);
    }

    return (
        <React.Fragment>
            <div
                draggable
                onDragStart={(event) => event.dataTransfer.setData("id", ticket.id)}
                className="rounded-xl p-2 m-3 bg-white border-4 hover:border-blue-400 cursor-pointer"
                onClick={handleClickOpen}>
                <TicketHeader ticket={ticket} />
                <TicketBody ticket={ticket} updateTicketTitle={updateTicketTitle} updateTickets={updateTickets} />
                <TicketFooter ticket={ticket} />
            </div>
            <TicketEditForm
                ticket={ticket}
                formOpen={formOpen}
                handleClose={handleClose}
                updateTickets={updateTickets} />
        </React.Fragment>

    )
}

export default TicketCard