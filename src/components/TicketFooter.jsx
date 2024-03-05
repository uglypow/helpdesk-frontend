import moment from "moment-timezone"

const TicketFooter = ({ ticket }) => {
    return (
        <div className="text-right text-xs opacity-75 mt-2">
            { // If the ticket was updated today only display time
            moment(ticket.updated_at).isSame(new Date(), 'day') ? (
                `Last updated ${moment(ticket.updated_at).format('HH:mm')} (today)`
            ) : (
                `Last updated ${moment(ticket.updated_at).format('DD/MM/YYYY')}`
            )
            }
        </div>
    )
}

export default TicketFooter