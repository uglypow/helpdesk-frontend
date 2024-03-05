import { AppBar, Toolbar, Button, Stack } from '@mui/material'

const TopBar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between', background: 'linear-gradient(to right, #e81e77, #880e4f)' }}>
                <div className="font-bold text-2xl text-white">
                    Helpdesk Support
                </div>
                <Stack>
                    <Button sx={{ bgcolor: 'white' }} variant='contained' to="about">
                        <div className="text-black">
                            About
                        </div>
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );

}

export default TopBar