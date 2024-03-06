import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
const TicketEditForm = ({ ticket, formOpen, handleClose, updateTickets }) => {

    return (
        <Dialog
            open={formOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const updateTicket = {...ticket, ...formJson, updated_at: new Date()}
                    updateTickets(updateTicket);
                    handleClose();
                },
            }}
        >
            <DialogTitle>Update Ticket</DialogTitle>
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
                    defaultValue={ticket.title}
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
                    defaultValue={ticket.contact}
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
                    defaultValue={ticket.description}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Update</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TicketEditForm
