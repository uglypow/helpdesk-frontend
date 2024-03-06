const TicketBody = ({ ticket }) => {

    return (
        <div>
            <div className="text-base font-bold py-2 text-textColor">
                <div>
                    {ticket.title}
                </div>
            </div>
            <div className="text-sm text-textColor">
                {ticket.description.length > 60 ? (
                    <div>
                        {`${ticket.description.substring(0, 60)}...`}
                    </div>
                ) : (
                    <div>{ticket.description}</div>
                )}
            </div>
        </div>
    )
}

export default TicketBody