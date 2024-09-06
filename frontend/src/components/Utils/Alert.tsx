import Snackbar from '@mui/joy/Snackbar';
import { useState } from 'react';
import ReactDOM from 'react-dom';

export function AlertBox({ text, isOpen }: { text: string; isOpen: boolean }) {
    const [open, setOpen] = useState(isOpen);
    return ReactDOM.createPortal(
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={3000}
        >
            <b>{text}</b>
        </Snackbar>,
        document.body,
    );
}
