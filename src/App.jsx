import { useState, useEffect } from 'react'
import ticketService from './services/tickets'
import TicketCard from './components/TicketCard';
import TopBar from './components/TopBar';
import './index.css'

function App() {
  const [tickets, setTickets] = useState([])
  const [nowHoverOver, setNowHoverOver] = useState(null)

  const statuses = ['pending', 'accepted', 'resolved', 'rejected']

  useEffect(() => {
    ticketService
      .getAll()
      .then(initialTickets => {
        setTickets(initialTickets)
      })
  }, [])

  const updateTicketTitle = (ticket, newTitle) => {
    console.log(newTitle)
    const updatedTickets = tickets.map((t) => (t.id === ticket.id ? { ...t, title: newTitle } : t))
    setTickets(updatedTickets)
  }

  const updateTickets = (ticket) => {
    const updatedTickets = tickets.map((t) => (t.id === ticket.id ? ticket : t))

    ticketService
      .update(ticket.id, ticket)
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
      updateTickets({ ...ticket, status })
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
    <div>
      <TopBar />
      <div className="flex divide m-20" style={{ alignItems: 'start' }}>
        {columns.map((column) => {// Map columns according to statuses
          return (
            <div
              onDrop={(event) => { handleDrop(event, column.status) }}
              onDragOver={(event) => event.preventDefault()}
              onDragEnter={() => handleDragEnter(column.status)}
              key={column.status}
              className={`rounded-xl p-2 m-2 bg-black ${nowHoverOver === column.status ? 'bg-gray-100' : ''}`}
            >
              <h2 className="text-xl p-2 capitalize font-bold text-textColor">
                {column.status} ({column.tickets.length})
              </h2>
              <div>
                {column.tickets.map((ticket) =>  // Map tickets in each column
                  <TicketCard key={ticket.id}
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

export default App
