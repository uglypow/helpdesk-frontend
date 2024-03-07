import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import TopBar from '../../components/TopBar';
import { formatDate } from '../../utils/formatDate';
import CreateTicketButton from './CreateTicketButton';
import UpdateTicketButton from './UpdateTicketButton';
import GridCellExpand from './GridCellExpand';
import fetchTickets from '../../services/fetchTickets'

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
    const { tickets, createTicket, updateTicket } = fetchTickets();
    const [selected, setSelected] = useState(null)

    const handleSelectionChange = (selectedID) => {
        if (!selectedID) {
            return
        } 
        
        const selectedTicket = tickets.find((ticket) => ticket.id == selectedID)
        // console.log(selectedTicket)
        setSelected(selectedTicket)
    }

    return (
        <>
            <TopBar />
            <CreateTicketButton createTicket={createTicket} />
            {selected ? <UpdateTicketButton ticket={selected} updateTicket={updateTicket} setSelected={setSelected}/> : null}
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
                    onRowSelectionModelChange={((selectedID) => handleSelectionChange(selectedID))}
                />
            </div>
        </>
    )
}

export default Table