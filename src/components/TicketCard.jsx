import moment from 'moment';

const ticketCard = ({ ticket }) => {
    return (
        <div className="border rounded-lg p-2 m-2 bg-gray-50 w-50">
            <div className="text-base font-semibold py-2">
                {ticket.title}
            </div>
            <div className="flex gap-4 justify-between py-2 text-gray-700 text-sm">
                <div>{ticket.description}</div>
                <div>{moment(ticket.created_at).format('DD/MM/YYYY')}</div>
            </div>
        </div>
    )
}

export default ticketCard