import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { useUserDispatch } from '../../redux/dispatch/userdispatch';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarNotification = () => {
    const common = useSelector((state) => state?.user);
    const { showNotification } = useUserDispatch();

    const handleClick = () => showNotification({ isOpen: true });

    const handleClose = () => showNotification({ isOpen: false, status: ''});

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={common?.snackbar?.isOpen} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={common?.snackbar?.status} sx={{ width: '100%' }}>
                    {common?.snackbar?.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default SnackbarNotification;