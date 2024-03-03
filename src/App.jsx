import { useState, useEffect } from 'react'
import ticketService from './services/tickets'
import './index.css'
import TicketCard from './components/TicketCard';
import { statuses } from './utils/data-tasks'

function App() {
  const [tickets, setTickets] = useState(null)


  useEffect(() => {
    ticketService
      .getAll()
      .then(initialTickets => {
        setTickets(initialTickets)
      })
  }, [])

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

  // console.log(columns)

  return (
    <div className="flex divide-x">
      {columns.map((column) => {// Map columns according to statuses
        return (
          <div key={column.status}>
            <h2 className="text-3xl p-2 capitalize font-bold">
              {column.status}
            </h2>
            {column.tickets.map((ticket) =>  // Map tickets in each column
              <TicketCard key={ticket.id} ticket={ticket} />
            )}
          </div>
        )
      })}

    </div>
  )
}

export default App
