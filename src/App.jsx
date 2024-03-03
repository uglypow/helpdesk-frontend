import { useState, useEffect } from 'react'
import ticketService from './services/tickets'
import TicketCard from './components/TicketCard';
import { statuses } from './utils/data-tasks'
import './index.css'

function App() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    ticketService
      .getAll()
      .then(initialTickets => {
        setTickets(initialTickets)
      })
  }, [])

  const updateTicketTitle = (ticket, newTitle) => {
    console.log(ticket, newTitle)
    const updatedTickets = tickets.map((t) => (t.id === ticket.id ? { ...t, title: newTitle } : t))
    console.log(updatedTickets)
    setTickets(updatedTickets)
  }

  const updateTickets = (ticket) => {
    const updatedTickets = tickets.map((t) => (t.id === ticket.id ? { ...t, status: ticket.status } : t))

    ticketService
      .update(ticket.id, ticket)
      .then(() => {
        setTickets(updatedTickets)
      })
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
    <div className="flex divide-x">
      {columns.map((column) => {// Map columns according to statuses
        return (
          <div key={column.status}>
            <h2 className="text-xl p-2 capitalize font-bold">
              {column.status} ({column.tickets.length})
            </h2>
            {column.tickets.map((ticket) =>  // Map tickets in each column
              <TicketCard key={ticket.id}
                ticket={ticket}
                updateTicketTitle={updateTicketTitle} 
                updateTickets={updateTickets}/>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default App
