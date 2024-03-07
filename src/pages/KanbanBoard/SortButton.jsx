import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';
import moment from 'moment';

const SortButton = ({ status, setToSort }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (sortType) => {
        const sortData = {
            status: status,
            sortType: sortType
        }
        setToSort(sortData)
    }

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ height: '100%', ':hover': { bgcolor: '#d0d5da' }, }}
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
                <MenuItem onClick={() => handleSort((a, b) => moment(a.created_at).diff(moment(b.created_at)))}>
                    Date created (Asc)
                </MenuItem>
                <MenuItem onClick={() => handleSort((a, b) => moment(b.created_at).diff(moment(a.created_at)))}>
                    Date created (Desc)
                </MenuItem>
                <MenuItem onClick={() => handleSort((a, b) => moment(a.updated_at).diff(moment(b.updated_at)))}>
                    Date updated (Asc)
                </MenuItem>
                <MenuItem onClick={() => handleSort((a, b) => moment(b.updated_at).diff(moment(a.updated_at)))}>
                    Date updated (Desc)
                </MenuItem>
            </Menu>
        </>
    )
}

export default SortButton