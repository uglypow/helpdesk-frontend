import { useState, useEffect } from 'react'
import ticketService from '../services/tickets'
import TicketCard from './TicketCard';
import TopBar from './TopBar';
import FormPopUpButton from './FormPopUpButton';
import '../index.css'
import SortButton from './SortButton';
import { Circle } from '@mui/icons-material';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([])
    const [nowHoverOver, setNowHoverOver] = useState(null)
    const [toSort, setToSort] = useState(null)

    const statuses = ['pending', 'accepted', 'resolved', 'rejected']

    useEffect(() => {
        ticketService
            .getAll()
            .then(initialTickets => {
                setTickets(initialTickets)
            })
    }, [])

    const createTicket = (ticket, status) => {
        const newTicket = {
            title: ticket.title,
            description: ticket.description,
            contact: ticket.contact,
            status: status
        }

        console.log(newTicket)

        ticketService
            .create(newTicket)
            .then(() => {
                setTickets([...tickets, newTicket])
            })
    }

    const updateTickets = (ticket) => {
        const updatedTickets = tickets.map((t) => (t.id === ticket.id ? ticket : t))

        ticketService
            .update(ticket.id, ticket)
            .then(() => {
                setTickets(updatedTickets)
            })
    }

    const updateTicketTitle = (ticket, newTitle) => {
        console.log(newTitle)
        const updatedTickets = tickets.map((t) => (t.id === ticket.id ? { ...t, title: newTitle } : t))
        setTickets(updatedTickets)
    }

    const handleDrop = (event, status) => {
        event.preventDefault()
        setNowHoverOver(null)
        const id = event.dataTransfer.getData('id')
        const ticket = tickets.find((ticket) => ticket.id === id)

        if (ticket) {
            updateTickets({ ...ticket, status: status, updated_at: new Date() })
        }
    }

    const handleDragEnter = (status) => {
        setNowHoverOver(status)
    }

    if (!tickets) {
        return
    }

    // Create a column for each status
    const columns = statuses.map((status) => {
        const ticketsInColumn = tickets.filter((ticket) => ticket.status === status)
        return {
            status,
            tickets: ticketsInColumn
        }
    })

    if (toSort) {
        const toSortColumn = columns.find((column) => column.status === toSort.status);
        const sortedTickets = [...toSortColumn.tickets].sort(toSort.sortType);

        // console.log('sortedTickets', sortedTickets)

        const updatedColumns = columns.map((column) => {
            return {
                ...column,
                tickets: column.status === toSort.status ? sortedTickets : [...column.tickets]
            };
        });

        // console.log('updatedColumns', updatedColumns)

        setToSort(null);
        setTickets(updatedColumns.flatMap((column) => column.tickets));
    }

    return (
        <div>
            <TopBar />
            <div className="flex m-2 items-start overflow-auto max-h-100% scrollbar-thin scrollbar.webkit">
                {columns.map((column) => {
                    return (
                        <div
                            onDrop={(event) => { handleDrop(event, column.status) }}
                            onDragOver={(event) => event.preventDefault()}
                            onDragEnter={() => handleDragEnter(column.status)}
                            key={column.status}
                            className={`flex-1 rounded-xl p-2 m-2 shadow border bg-columnColor
                            ${nowHoverOver === column.status ? "border-4 border-blue-400" : ''}`}
                        >
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
                                    <FormPopUpButton
                                        createTicket={createTicket}
                                        status={column.status} />
                                </div>
                            </div>
                            <div className="overflow-auto max-h-[70vh] scrollbar-thin scrollbar.webkit">
                                {column.tickets.map((ticket) => 
                                    <TicketCard
                                        key={ticket.id}
                                        ticket={ticket}
                                        updateTicketTitle={updateTicketTitle}
                                        updateTickets={updateTickets} />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>       
    )
}

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'orange'; // Set your desired color for 'pending'
        case 'accepted':
            return 'green'; // Set your desired color for 'accepted'
        case 'resolved':
            return 'blue'; // Set your desired color for 'resolved'
        case 'rejected':
            return 'red'; // Set your desired color for 'rejected'
        default:
            return 'gray'; // Default color for unknown status
    }
}

export default KanbanBoard