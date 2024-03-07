import { formatTime, formatDate, isToday } from "../../utils/formatDate"

const TicketBody = ({ ticket }) => {

    return (
        <>
            <div className="text-base font-bold py-2 text-textColor">
                <div>
                    {ticket.title}
                </div>
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
            <div className="text-right text-xs opacity-75 mt-2">
                { // If the ticket was updated today only display time
                    isToday(ticket.updated_at) ? (
                        `Last updated ${formatTime(ticket.updated_at)} (today)`
                    ) : (
                        `Last updated ${formatDate(ticket.updated_at)}`
                    )
                }
            </div>
        </>
    )
}

export default TicketBody