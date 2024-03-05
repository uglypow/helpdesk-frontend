import { AppBar, Toolbar, Button, Stack } from '@mui/material'

const TopBar = () => {
    return (
        <AppBar sx={{ backgroundColor: '#70344c' }} position="sticky">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <div className="font-bold text-2xl text-white">
                    Kanban Board
                </div>
                <Stack>
                    <Button sx={{ backgroundColor: 'white' }} variant='contained'>
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