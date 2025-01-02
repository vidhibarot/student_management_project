import { FormControl, FormControlLabel, Checkbox } from "@mui/material"

const SingleCheckBox = ({ checked = false, label = 'Default Label', labelPlacement = 'end', onChange ,...props}) => {
    return (
        <FormControl fullWidth style={{ marginTop: '8px !important' }}>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} disabled={props?.disabled} />}
                label={label}
                labelPlacement={labelPlacement}
            />
        </FormControl>
    )
}

export default SingleCheckBox;
