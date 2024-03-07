import { formatDateTime } from "../../utils/formatDate"

const TicketHeader = ({ ticket }) => {
    return (
        <div className="flex gap-2">
            <div id="container">
                <div id="name">
                    {ticket.contact.charAt(0).toUpperCase()}
                </div>
            </div>
            <div>
                <div className="text-base font-base text-textColor">
                    {ticket.contact}
                </div>
                <div className="text-xsopacity-75 text-textColor">
                    {formatDateTime(ticket.created_at)}
                </div>
            </div>
        </div>
    )
}

export default TicketHeader