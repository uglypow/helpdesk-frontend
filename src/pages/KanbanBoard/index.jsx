import { useState, useEffect } from 'react'
import ticketService from '../../services/tickets'
import TopBar from '../../components/TopBar';
import '../../index.css'
import Column from './Column';

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
            .then((createdTicket) => {
                setTickets((prevTickets) => [...prevTickets, createdTicket]);
            })
    }

    const updateTicket = (ticket) => {
        const newTicket = { ...ticket, updated_at: new Date() }
        const updatedTickets = tickets.map((t) => (t.id === newTicket.id ? newTicket : t))

        ticketService
            .update(newTicket.id, newTicket)
            .then(() => {
                setTickets(updatedTickets)
            })
    }

    const handleDrop = (event, status) => {
        event.preventDefault()
        setNowHoverOver(null)
        const id = event.dataTransfer.getData('id')
        const ticket = tickets.find((ticket) => ticket.id === id)

        if (ticket) {
            updateTicket({ ...ticket, status: status })
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
        <>
            <TopBar />
            <div className="flex m-2 items-start overflow-auto scrollbar-thin scrollbar.webkit">
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
                            <Column
                                column={column}
                                createTicket={createTicket}
                                setToSort={setToSort}
                                updateTicket={updateTicket} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default KanbanBoard