import {
    FormControl,
    FormHelperText,
    TextField,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

const TextBox = ({ label = 'textBoxLabel', type = 'text', name = 'textBoxName', value = '', error, touched = '',disabled = false, margin = "normal", errorMessage = 'Input is required!', style = '', multiline = false, rows = 3, ...props }) => {

    const theme = useTheme();

    return (
        <>
            <FormControl fullWidth  >
                <TextField
                    id={`input-${name}`}
                    margin={margin}
                    type={type}
                    value={value}
                    name={name}
                    onBlur={props?.onBlur}
                    onChange={props?.onChange}
                    inputProps={{}}
                    multiline={multiline}
                    rows={rows}
                    label={label}
                    error={error}
                    sx={{marginTop:'13px', marginBottom:0}}
                    required={props?.required}
                    disabled={disabled}
                />
                {touched && errorMessage && (
                    <FormHelperText error id={`input-${name}`} sx={{marginLeft:'5px'}}>
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    )
}

export default TextBox;
