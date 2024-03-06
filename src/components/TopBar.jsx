import React from 'react';
import ViewButton from './ViewButton';
import { AppBar, Toolbar, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <AppBar position='sticky'>
                <Toolbar sx={{ justifyContent: 'space-between', background: 'linear-gradient(to right, #e81e77, #880e4f)' }}>
                    <div className="flex gap-4 font-bold text-2xl text-white cursor-pointer">
                        Helpdesk Support
                        <ViewButton />
                    </div>
                    <Stack>
                        <Button
                            sx={{ bgcolor: 'white', color: 'black', '&:hover': { color: 'white' } }}
                            variant='contained'
                            onClick={() => { navigate("/about") }}
                        >
                            About
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default TopBar