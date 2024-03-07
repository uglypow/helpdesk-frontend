import CreateTicketButton from './CreateTicketButton';
import SortButton from './SortButton';
import { Circle } from '@mui/icons-material';
import TicketCard from "./TicketCard"

const Column = ({ column, createTicket, setToSort, updateTicket }) => {
    return (
        <>
            <div className="flex justify-between p-2">
                <div className="flex items-center">
                    <Circle sx={{ color: getStatusColor(column.status), marginRight: '8px' }} />
                    <h2 className="text-xl p-2 capitalize font-bold text-textColor">
                        {column.status} ({column.tickets.length})
                    </h2>
                </div>
                <div className="flex">
                    <SortButton
                        status={column.status}
                        setToSort={setToSort} />
                    <CreateTicketButton
                        status={column.status}
                        createTicket={createTicket} />
                </div>
            </div>
            <div className="overflow-auto max-h-[70vh] scrollbar-thin scrollbar.webkit">
                {column.tickets.map((ticket) =>
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        updateTicket={updateTicket} />
                )}
            </div>
        </>
    )
}

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'orange';
        case 'accepted':
            return 'green';
        case 'resolved':
            return 'blue';
        case 'rejected':
            return 'red';
        default:
            return 'gray';
    }
}

export default Column