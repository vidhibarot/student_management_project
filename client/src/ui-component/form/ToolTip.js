import * as React from 'react';
import { IoInformationCircleSharp } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function FormTooltip(props) {
    return (
        <Tooltip title={props?.title} placement={props?.placement} arrow>
            <IconButton sx={{ paddingLeft: '0px'}}>
                <IoInformationCircleSharp />
            </IconButton>
        </Tooltip>
    );
}