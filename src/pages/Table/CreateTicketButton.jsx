import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' },
];

const CreateTicketButton = ({ createTicket }) => {
    const [formOpen, setFormOpen] = useState(false);
    const [status, setStatus] = useState('');

    const handleClickOpen = () => {
        setFormOpen(true);
    }

    const handleClose = () => {
        setFormOpen(false);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ height: '100%', margin: '10px', ':hover': { bgcolor: '#d0d5da' }, }}>
                Create
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
                        createTicket(formJson);
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
                    <TextField
                        required
                        margin="dense"
                        id="status"
                        name="status"
                        label="Status"
                        fullWidth
                        variant="standard"
                        select
                        value={status}
                        onChange={handleStatusChange}
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
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
