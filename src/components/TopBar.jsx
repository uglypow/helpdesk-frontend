import { AppBar, Toolbar, Button, Stack } from '@mui/material'

const TopBar = () => {
    return (
        <AppBar sx={{ backgroundColor: '#202424' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <div className="font-bold text-2xl text-textColor">
                    Helpdesk Support System
                </div>
                <Stack>
                    <Button variant='contained'>
                        <div className="text-gray-900">
                            About
                        </div>
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );

}

export default TopBar