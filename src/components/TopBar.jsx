import { AppBar, Toolbar, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <AppBar sx={{ backgroundColor: '#70344c' }} position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <div className="font-bold text-2xl text-white">
                    Helpdesk Support
                </div>
                <Stack>
                    <Link to="/about">
                        <Button sx={{ backgroundColor: 'white' }} variant='contained' to="about">
                            <div className="text-black">
                                About
                            </div>
                        </Button>
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    );

}

export default TopBar