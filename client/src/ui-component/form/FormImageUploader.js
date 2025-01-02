import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, FormHelperText, FormLabel, Tooltip, Typography } from '@mui/material';
import { IconCircleLetterX } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FormImageUploader = (props) => {
    const customization = useSelector((state) => state?.customization);
    const [tooltipImage, setTooltipImage] = useState('');
    const theme = useTheme();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            setTooltipImage(file?.name);
            props?.setSelectedFile(URL.createObjectURL(file));
            props?.formik.setFieldValue(props?.name, file);
        }
    };

    const handleCancel = async () => {
        setTooltipImage('')
        props?.setSelectedFile('');
        props?.formik.setFieldValue(props?.name, '');
    };

    useEffect(() => {
        if (tooltipImage) {
            return;
        } else {
            if (props?.selectedFile && props?.isEditForm) {
                setTooltipImage(props?.selectedFile);
            }
        }
    }, [props?.selectedFile]);

    return (
        <Box sx={{ marginTop: '8px' }}>
            <FormLabel id={`form-radio-group-${props?.name}`} required={props?.required} style={{ display: 'flex', flexDirection: 'row', marginBottom: '7px' }}> {props?.mainLabel} </FormLabel>
            {!props?.selectedFile &&
                (<Button
                    sx={{ borderRadius: '10px', ...props?.sx }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    onChange={handleFileChange}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    color={props?.color || "secondary"}
                >
                    {props?.label || "Upload file"}
                    <VisuallyHiddenInput type="file" accept={props?.fileType} />
                </Button>)
            }

           
            {props?.selectedFile && (
                <Box sx={{ 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    width: '250px',
                    boxShadow:  '0 0 10px rgba(0, 149, 218, 1)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    paddingBottom: '8px', 
                    position: 'relative', 
                    ...props?.imgStyle ,
                }}>
                    <Tooltip title={tooltipImage} arrow>
                        <img 
                            src={props?.selectedFile} 
                            id={props?.id} 
                            style={{ 
                                width: '100%', 
                                // height: '', 
                                objectFit: 'cover', 
                                borderRadius: '8px' 
                            }} 
                            alt="uploaded attachment"
                        />
                    </Tooltip>
                    <Typography 
                        sx={{ 
                            cursor: 'pointer', 
                            color:'#0095da', 
                            marginTop: '8px' 
                        }} 
                        onClick={handleCancel}
                    >
                        Remove
                    </Typography>
                </Box>
            )}

            {props?.touched && props?.errorMessage && (
                <FormHelperText error id={`input-${props?.name}`} sx={{ marginLeft: '5px', marginTop: 0 }}>
                    {props?.errorMessage}
                </FormHelperText>
            )}
        </Box>
    );
}

export default FormImageUploader;