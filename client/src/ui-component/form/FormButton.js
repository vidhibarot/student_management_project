import {
    Box,
    Button
} from '@mui/material';
import AnimateButton from '../extended/AnimateButton';
import { useSelector } from 'react-redux';
const FormButton = ({ size = 'large', type = "submit", variant = "contained", color = "secondary", label = "Button", ...props }) => {
    const customization = useSelector((state) => state?.customization);

    return (
        <Box sx={{ ...props?.boxSx }}>
            {/* <AnimateButton> */}
            <Button
                fullWidth={props?.fullWidth}
                size={size}
                type={type}
                variant={variant}
                onClick={props?.onClick}
                color={props?.color}
                startIcon={props?.icon}
                sx={{ ...props?.sx, borderRadius: "10px" }}
            >
                {label}
            </Button>
            {/* </AnimateButton> */}
        </Box>
    )

}
export default FormButton;
