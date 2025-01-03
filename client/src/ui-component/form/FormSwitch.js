import { FormLabel, Switch, Tooltip, styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const BasicSwitch = (props) => {
    const CustomSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 34,
        height: 18,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff !important',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    border: 0,
                    backgroundColor: '#1890ff'
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 14,
            height: 14,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#bfbfbf',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return (
        <>
            <Box sx={{display:'flex',alignItems:'center',marginY:1,gap:2}}>
                    <CustomSwitch id={props?.id || '1'} size="large" defaultChecked={props?.checked} inputProps={{ 'aria-label': 'ant design' }} onChange={props?.onChange} disabled={props?.disableToggle} />
                    <FormLabel htmlFor={props?.id || '1'} sx={{cursor:'pointer'}}>{props?.label}</FormLabel>
            </Box>
        </>
    )
};
