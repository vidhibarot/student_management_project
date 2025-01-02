import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useTheme } from '@mui/material/styles';
const FormCheckBoxGroup = ({ groupLabel = 'checkbox Group Label', checkBoxGroupData = [],row=true,labelPlacement='end',...props }) => {
    
    const theme = useTheme();

    return (
        <FormControl error={props?.error} component="fieldset">
            <FormLabel component="legend">{groupLabel}</FormLabel>
            <FormGroup aria-label="position" row={row}>
                {checkBoxGroupData?.map(data => {
                    return (
                        <FormControlLabel
                            id={data.value}
                            value={data.value}
                            control={<Checkbox value={data.value} checked={data?.checked} label={data.label} name={data.label} onChange={props?.onChange} />}
                            label={data.label}
                            labelPlacement={labelPlacement}
                            // onChange={props?.onChange}
                        />
                    )
                })

                }
            </FormGroup>
        </FormControl>
    );
}

export default FormCheckBoxGroup