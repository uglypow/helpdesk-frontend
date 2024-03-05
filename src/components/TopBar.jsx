import { AppBar, Toolbar, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate()

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between', background: 'linear-gradient(to right, #e81e77, #880e4f)' }}>
                <div className="font-bold text-2xl text-white cursor-pointer" onClick={() => {navigate("/")}}>
                    Helpdesk Support
                </div>
                <Stack>
                    <Button sx={{ bgcolor: 'white' }} variant='contained' onClick={() => {navigate("/about")}}>
                        <div className="text-black hover:text-white">
                            About
                        </div>
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar