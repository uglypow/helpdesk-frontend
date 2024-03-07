import * as React from 'react';
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import ticketService from '../../services/tickets'
import TopBar from '../../components/TopBar';
import { formatDate } from '../../utils/formatDate';
import { Box, Popper, Paper, Typography } from '@mui/material';
import CreateTicketButton from './CreateTicketButton';
import UpdateTicketButton from './UpdateTicketButton';

// Didn't intended to do this at first so most of the code are copied from MUI documentation

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, marginLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

const columns = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
        renderCell: renderCellExpand,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 4,
        renderCell: renderCellExpand,

    },
    {
        field: 'contact',
        headerName: 'Contact',
        flex: 2,
        renderCell: renderCellExpand,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
    },
    {
        field: 'created_at',
        headerName: 'Create',
        flex: 1,
        valueFormatter: (params) => formatDate(params.value),
    },
    {
        field: 'updated_at',
        headerName: 'Update',
        flex: 1,
        valueFormatter: (params) => formatDate(params.value),
    },
];

const Table = () => {
    const [tickets, setTickets] = useState([])
    const [selected, setSelected] = useState({})


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
            .then(() => {
                setTickets([...tickets, newTicket])
            })
    }

    const updateTicket = (ticket) => {
        const updatedTickets = tickets.map((t) => (t.id === ticket.id ? ticket : t))

        ticketService
            .update(ticket.id, ticket)
            .then(() => {
                setTickets(updatedTickets)
            })
    }

    const handleSelectionChange = (selectedID) => {
        if (!selectedID) {
            return
        }
        console.log(selectedID)
        console.log(tickets)
        const selectedTicket = tickets.find((ticket) => ticket.id == selectedID)
        console.log(selectedTicket)
        setSelected(selectedTicket)
    }

    return (
        <React.Fragment>
            <TopBar />
            <CreateTicketButton createTicket={createTicket} />
            <UpdateTicketButton ticket={selected} updateTicket={updateTicket} />
            <div style={{ width: '' }}>
                <DataGrid
                    rows={tickets}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    onRowSelectionModelChange={((params) => handleSelectionChange(params))}
                />
            </div>
        </React.Fragment>
    )
}

export default Table