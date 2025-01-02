import {
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Box,
    Grid,
    Typography
} from '@mui/material';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';

const PasswordBox = ({ label = 'textBoxLabel', name = 'textBoxName', value = '', error = '', touched = '', margin = "normal", errorMessage = 'Input is required!', showPassword = 'false', handleClickShowPassword, handleMouseDownPassword, showStrength = 'false', strength = 0, level = '0', ...props }) => {

    const theme = useTheme();

    return (
        <FormControl fullWidth error={error} variant="outlined"  sx={{ marginTop: '15px' }}>
            <InputLabel htmlFor={`input-password-${name}`} required={props?.required}>{label}</InputLabel>
            <OutlinedInput
                id={`input-password-${name}`}
                type={showPassword ? 'text' : 'password'}
                value={value}
                label={label}
                name={name}
                onBlur={props?.onBlur}
                onChange={(e) => {
                    props?.onChange(e);
                }}
                
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="medium"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{}}
            />
            {
                touched && errorMessage && (
                    <FormHelperText error id={`input-password-${name}`} sx={{ marginLeft: '5px' }}>
                        {errorMessage}
                    </FormHelperText>
                )
            }
            {
                showStrength && strength !== 0 && (
                    <FormControl fullWidth>
                        <Box sx={{ m: 1 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                        {level?.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </FormControl>
                )
            }
        </FormControl >
    )
}

export default PasswordBox;
