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

    return { tickets, setTickets, createTicket, updateTicket };
};

export default useTickets;
