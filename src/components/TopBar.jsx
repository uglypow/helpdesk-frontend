import ViewButton from './ViewButton';
import { AppBar, Toolbar, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate()

    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ justifyContent: 'space-between', background: 'linear-gradient(to right, #e81e77, #880e4f)' }}>
                <div className="flex gap-4 font-bold text-2xl text-white cursor-pointer">
                    Helpdesk Support
                    <ViewButton />
                </div>
                <Button
                    sx={{ bgcolor: 'white', color: 'black', '&:hover': { color: 'white' } }}
                    variant='contained'
                    onClick={() => { navigate("/about") }}
                >
                    About
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar