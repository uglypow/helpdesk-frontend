import moment from 'moment';
import { useState } from 'react';


const TicketCard = ({ ticket, updateTicketTitle, updateTickets }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false)

    const handleOnEnter = (ticket, key) => {
        if (key === 'Enter') {
            setIsEditingTitle(false)
            updateTickets(ticket)
        }
    }

    return (
        <div
            draggable
            onDragStart={(event) => event.dataTransfer.setData("id", ticket.id)}
            className="rounded-xl p-2 m-3 bg-ticketColor hover:border-4 hover:border-blue-400 cursor-pointer"
        >
            <div className="flex gap-2">
                <div id="container" className="bg-gray-400">
                    <div id="name">
                        {ticket.contact.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div>
                    <div className="text-base font-base text-textColor">
                        {ticket.contact}
                    </div>
                    <div className="text-xsopacity-75 text-textColor">
                        {moment(ticket.created_at).format('DD/MM/YYYY HH:mm:ss')}
                    </div>
                </div>
            </div>
            <div className="text-base font-bold py-2 text-textColor">
                {isEditingTitle ? (
                    <input
                        autoFocus
                        className="w-full bg-ticketColor"
                        onBlur={() => setIsEditingTitle(false)}
                        value={ticket.title}
                        onChange={(event) => updateTicketTitle(ticket, event.target.value)}
                        onKeyUp={(event) => handleOnEnter(ticket, event.key)}
                    />
                ) : (
                    <div onClick={() => setIsEditingTitle(true)}>
                        {ticket.title}
                    </div>
                )}
            </div>
            <div className="text-sm text-textColor">
                <div>{ticket.description}</div>
            </div>
        </div>
    )
}

export default TicketCard