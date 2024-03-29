import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

const CreateTicketButton = ({ status, createTicket }) => {
    const [formOpen, setFormOpen] = useState(false);

    const handleClickOpen = () => {
        setFormOpen(true);
    }

    const handleClose = () => {
        setFormOpen(false);
    }

    return (
        <>
            <Button
                variant="text"
                onClick={handleClickOpen}
                sx={{ height: '100%', ':hover': { bgcolor: '#d0d5da' }, }}>
                <AddIcon />
            </Button>
            <Dialog
                open={formOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        createTicket({ ...formJson, status: status });
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Create Ticket</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="contact"
                        name="contact"
                        label="Contact (Email)"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        multiline  // Enables multiline mode
                        rows={4}
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreateTicketButton
