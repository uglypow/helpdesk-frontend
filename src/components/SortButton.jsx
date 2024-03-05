import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const SortButton = ({ status, setToSort }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
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
        <div>
            <ThemeProvider theme={darkTheme}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ height: '100%', ':hover': { bgcolor: 'white' }, }}
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
                    <MenuItem onClick={() => handleSort((a, b) => moment(a.updated_at).diff(moment(b.updated_at)))}>
                        Date updated (Asc)
                    </MenuItem>
                </Menu>
            </ThemeProvider>
        </div>
    );
}

export default SortButton