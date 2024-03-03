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
        <div className="border rounded-lg p-2 m-2 bg-gray-50 w-50 ">
            <div className="flex gap-2">
                <div id="container" className="bg-gray-700">
                    <div id="name">
                        {ticket.contact.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div>
                    <div className="text-base font-base">
                        {ticket.contact}
                    </div>
                    <div className="text-xs text-gray-500 opacity-75">
                        {moment(ticket.created_at).format('DD/MM/YYYY HH:mm:ss')}
                    </div>
                </div>
            </div>

            <div className="text-base font-semibold py-2">
                {isEditingTitle ? (
                    <input
                        autoFocus
                        className='w-full'
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
            <div className="flex gap-4 justify-between text-gray-700 text-sm">
                <div>{ticket.description}</div>
            </div>
        </div>
    )
}

export default TicketCard