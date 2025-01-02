import React from 'react'
import { MuiTelInput } from 'mui-tel-input'
import { FormHelperText } from '@mui/material'

const PhoneNumberInput = (props) => {


    return (
        <>
            <MuiTelInput
                fullWidth
                sx={{ marginTop: '15px' }}
                label={props?.label || 'Phone Number'}
                value={props?.value}
                onChange={(val, data) => props?.onChange(data)}
                onBlur={props?.handleBlur}
                error={props?.error}
                required={props?.required}
            />
            {props?.touched && props?.errorMessage && (
                <FormHelperText error id={`input-${props?.name}`} sx={{ marginLeft: '5px'}}>
                    {props?.errorMessage}
                </FormHelperText>
            )}
        </>
    )
}

export default PhoneNumberInput;