import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';

const SortButton = ({ tickets, setTickets }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAscUpdateSort = () => {
        console.log('unsorted data: ', tickets)
        const sortedData = tickets.sort((a, b) => a.title.localeCompare(b.title));
        console.log('sorted data: ', sortedData)
        setTickets(sortedData)
    }

    
    const handleAscCreateSort = (tickets) => {
        console.log('unsorted data: ', tickets.map((t) => t.created_at))
        const sortedData = tickets.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        console.log('sorted data: ', sortedData.map((t) => t.created_at))
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{height: '100%', ':hover': { bgcolor: 'white' },}}
            >
                <SortIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleAscCreateSort(tickets)}>Date created (Asc)</MenuItem>
                <MenuItem onClick={() => handleAscUpdateSort(tickets)}>Date updated (Asc)</MenuItem>
            </Menu>
        </div>
    );
}

export default SortButton