import React from 'react';
import {
    MenuItem, Select, FormControl, InputLabel, Autocomplete, TextField,
    FormHelperText,
    ListSubheader
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export const DropDown = ({ id = '', name = 'selectBox', value, selectBoxLabel = 'selectBoxLabel', error = '', options = [], disabled = false, touched = '', errorMessage = '', ...props }) => {
    return (
        <FormControl fullWidth sx={{ marginTop: '15px' }} error={error}>
            <InputLabel id={id} required={props?.required}>{selectBoxLabel}</InputLabel>
            <Select
                labelId={id}
                id={id}
                value={value}
                name={name}
                label={selectBoxLabel}
                onChange={props?.onChange}
                disabled={disabled}
                onBlur={props?.onBlur}
                error={error}
            >
                {options.length === 0 ? (
                    <MenuItem disabled>No options</MenuItem>
                ) : (
                    options.map((option) => (
                        <MenuItem
                            key={option?.value}
                            value={option?.value}
                        >
                            {option?.label}
                        </MenuItem>
                    ))
                )}
            </Select>
            {touched && errorMessage && (
                <FormHelperText error id={`input-${name}`} sx={{ marginLeft: '5px' }}>
                    {errorMessage}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export const MultipleDropDown = ({ id = '', name = 'selectBox', value, selectBoxLabel = 'selectBoxLabel', error = '', options = [], disabled = false, touched = '', errorMessage = '', className = '', label = 'label', variant = 'outlined', sx = '', ...props }) => {
    const customization = useSelector((state) => state?.customization);
    return (
        <FormControl fullWidth sx={{ marginY: 1 }} error={error}>
            <Autocomplete
                fullWidth
                options={options}
                onChange={(val, data) => props?.onChange(data)}
                value={value}
                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                className={className}
                name={name}
                onBlur={props?.onBlur}
                error={error}
                multiple
                disableCloseOnSelect
                componentsProps={{
                    popper: {
                        sx: {
                            border: '1px solid #ccc', // Customize the border color and style
                            borderRadius: `${customization?.borderRadius}px`,
                            '& .MuiAutocomplete-noOptions': {
                                color: 'gray',
                            },
                        },
                    },
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={error}
                        variant={variant}
                        label={label}
                        required={props?.required}
                    />
                )}
            />
            {touched && errorMessage && (
                <FormHelperText error id={`input-${name}`}>
                    {errorMessage}
                </FormHelperText>
            )}
        </FormControl>
    );
}

export const GroupDropDown = ({ id = '', name = 'selectBox', value, selectBoxLabel = 'selectBoxLabel', error = '', options = [], disabled = false, touched = '', errorMessage = '', className = '', label = 'label', variant = 'outlined', sx = '', ...props }) => {

    const theme = useTheme();
    const optionFunction = employee => {
        const employees = employee?.data?.map(empData => {
            return (
                <MenuItem key={empData?.id} value={empData?.id}>
                    {empData?.full_name}
                </MenuItem>
            );
        });
        return [<ListSubheader sx = {{color: `${theme?.palette?.mode === 'dark' ? '#B3D2F1' : '#0095DA'}`}}><b> {employee?.role} </b> </ListSubheader>, employees];
    };

    return (
        <FormControl fullWidth sx={{ marginTop: '15px' }} error={error}>
            <InputLabel id={id} required={props?.required}>{selectBoxLabel}</InputLabel>
            <Select
                labelId={id}
                id="grouped-select"
                value={value}
                name={name}
                label={selectBoxLabel}
                onChange={props?.onChange}
                disabled={disabled}
                onBlur={props?.onBlur}
                error={error}
            >
                {options?.map((employee) => (
                    optionFunction(employee)
                ))}
            </Select>
            {touched && errorMessage && (
                <FormHelperText error id={`input-${name}`} sx={{ marginLeft: '5px' }}>
                    {errorMessage}
                </FormHelperText>
            )}
        </FormControl>
    );
}