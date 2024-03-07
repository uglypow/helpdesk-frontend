import { useState } from 'react';
import TicketHeader from './TicketHeader';
import TicketBody from './TicketBody';
import TicketEditForm from './TicketEditForm';


const TicketCard = ({ ticket, updateTicket }) => {
    const [formOpen, setFormOpen] = useState(false);

    const handleClickOpen = () => {
        setFormOpen(true);
    }

    const handleClose = () => {
        setFormOpen(false);
    }

    return (
        <>
            <div
                draggable
                onDragStart={(event) => event.dataTransfer.setData("id", ticket.id)}
                className="rounded-xl p-2 m-3 bg-white border-4 hover:border-blue-400 cursor-pointer"
                onClick={handleClickOpen}>
                <TicketHeader ticket={ticket} />
                <TicketBody ticket={ticket}/>
            </div>
            <TicketEditForm
                ticket={ticket}
                formOpen={formOpen}
                handleClose={handleClose}
                updateTicket={updateTicket} />
        </>
    )
}

export default TicketCard