import { useState, useEffect } from 'react';
import ticketService from './tickets'

const useTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        ticketService
            .getAll()
            .then(initialTickets => {
                setTickets(initialTickets)
            })
            .catch(error => console.log(error.message))
    }, [])

    const createTicket = (ticket) => {
        const newTicket = {
            title: ticket.title,
            description: ticket.description,
            contact: ticket.contact,
            status: ticket.status
        }

        console.log(newTicket)

        ticketService
            .create(newTicket)
            .then((createdTicket) => {
                setTickets((prevTickets) => [...prevTickets, createdTicket]);
            })
            .catch(error => console.log(error.message))
    }

    const updateTicket = (ticket) => {
        const newTicket = { ...ticket, updated_at: new Date() }
        const updatedTickets = tickets.map((t) => (t.id === newTicket.id ? newTicket : t))

        ticketService
            .update(newTicket.id, newTicket)
            .then(() => {
                setTickets(updatedTickets)
            })
            .catch(error => console.log(error.message))
    }

    return { tickets, setTickets, createTicket, updateTicket };
};

export default useTickets;
