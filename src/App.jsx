import { useState, useEffect } from 'react'
import ticketService from './services/tickets'


function App() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    ticketService
      .getAll()
      .then(initialTickets => {
        setTickets(initialTickets)
      })
  }, [])

  return (
    <>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            {ticket.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
