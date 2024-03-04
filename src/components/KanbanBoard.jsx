import { useState, useEffect } from 'react'
import ticketService from '../services/tickets'
import TicketCard from './TicketCard';
import FormPopUpButton from './FormPopUpButton';
import '../index.css'

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([])
    const [nowHoverOver, setNowHoverOver] = useState(null)

    const statuses = ['pending', 'accepted', 'resolved', 'rejected']

    useEffect(() => {
        ticketService
            .getAll()
            .then(initialTickets => {
                setTickets(initialTickets)
                console.log('useEffect')
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
        const date = new Date()
        if (ticket) {
            updateTickets({ ...ticket, status: status, updated_at: date })
        }
    }

    const handleDragEnter = (status) => {
        setNowHoverOver(status)
    }

    if (!tickets) {
        return
    }

    const columns = statuses.map((status) => {
        const ticketsInColumn = tickets.filter((ticket) => ticket.status === status)
        return {
            status,
            tickets: ticketsInColumn
        }
    })

    return (
        <div className="flex divide mt-20 items-start">
            {columns.map((column) => {
                return (
                    <div
                        onDrop={(event) => { handleDrop(event, column.status) }}
                        onDragOver={(event) => event.preventDefault()}
                        onDragEnter={() => handleDragEnter(column.status)}
                        key={column.status}
                        className={`flex-1 rounded-xl p-2 m-2 bg-black 
                        ${nowHoverOver === column.status ? "border-4 border-blue-400" : ''}`}                    >
                        <div className="flex justify-between p-2">
                            <h2 className="text-xl p-2 capitalize font-bold text-textColor">
                                {column.status} ({column.tickets.length})
                            </h2>
                            <FormPopUpButton
                                createTicket={createTicket}
                                status={column.status} />
                        </div>
                        <div className="overflow-auto max-h-[75vh] scrollbar-thin scrollbar.webkit">
                            {column.tickets.map((ticket) =>  // Map tickets in each column
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
    )
}

export default KanbanBoard