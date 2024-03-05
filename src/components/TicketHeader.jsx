import moment from "moment-timezone"

const ticketHead = ({ ticket }) => {
    return (
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
    )
}

export default ticketHead