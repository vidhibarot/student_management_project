import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Button } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { FormButton } from '../form';
import { useState } from 'react';
import { Box } from '@mui/system';
import { useUserDispatch } from '../../redux/dispatch/userdispatch';


export const DialogPopUpForm = ({ props, children }) => {

    const common = useSelector((state) => state?.user);
    const { setIsFormOpen } = useUserDispatch();
    const [scroll, setScroll] = useState('paper');
    const handleOnCloseForm = () => {
        setIsFormOpen(false);
        if (props?.setCancelButton) {
            props?.setCancelButton(false);
        }
        // setTimeout(() => {
        //     setIsEditForm(false);
        //     setEditFormData({});
        // }, 500);
    }

    const handleOpenForm = () => {
        setIsFormOpen(true)
        // setIsEditForm(false);
        // setEditFormData({});
    }

    return (
        <>

            {props?.hasButton &&
                <FormButton
                    label={props?.btnText}
                    size="large"
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenForm}
                    sx={{
                        marginBottom: '20px'
                    }}
                />
            }

            <Dialog
                open={common.isFormOpen}
                onClick={handleOnCloseForm}
                PaperProps={{
                    sx: {
                        minWidth: {
                            xs: '95%',
                            sm: '80%',
                            md: props?.modelWidth || '70%',
                        },
                        width: 'auto',
                        paddingLeft: {
                            xs: '1rem'
                        },
                        paddingRight: {
                            xs: '1rem'
                        },
                        paddingTop: '2rem',
                        paddingBottom: '2rem',
                        maxHeight: {
                            xs: '95%',
                            sm: '90%',
                            md: '80%',
                        },
                    },
                }}
                scroll={scroll}
            >
                <DialogTitle id="scroll-dialog-title" sx={{ paddingX: '20px', paddingTop: '0', paddingBottom: '10px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <h2 style={{ margin: '0' }}> {props?.modelHead}</h2>

                        <CloseIcon
                            style={{
                                cursor: 'pointer',
                                fontSize: '25px'
                            }}
                            onClick={handleOnCloseForm}
                        />
                    </Box>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'} sx={{ padding: '0 20px', border: '0' }} onClick={(e) => e.stopPropagation()}>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
