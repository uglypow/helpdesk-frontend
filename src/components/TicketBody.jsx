import { useState } from "react"

const TicketBody = ({ ticket, updateTicketTitle, updateTickets }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const handleOnEnter = (ticket, key) => {
        if (key === 'Enter') {
            setIsEditingTitle(false)
            updateTickets({ ...ticket, updated_at: new Date() })
        }
    }

    return (
        <div>
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
                {ticket.description.length > 60 ? (
                    <div>
                        {`${ticket.description.substring(0, 60)}...`}
                    </div>
                ) : (
                    <div>{ticket.description}</div>
                )}
            </div>
        </div>

    )
}

export default TicketBody