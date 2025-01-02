import React from 'react';
import { FormLabel } from '@mui/material';
import { useSelector } from 'react-redux';


const ShowStatus = ({ statusValue,statusArr=[],statusBackgroundColorArr=[],statusName=[],statusTextColorArr=[],width }) => {
    
    const customization = useSelector((state) => state?.customization);

    const getStatusStyle = (status) => {
        const index = statusArr.indexOf(status);
        if (index !== -1) {
            return { backgroundColor: statusBackgroundColorArr[index], color: statusTextColorArr[index], display: 'flex', justifyContent: 'center', paddingLeft: '10px', paddingRight: '10px', height: '40px', alignItems: 'center', width: width || '120px', borderRadius: `${customization.borderRadius}px`, margin: '0 auto' };
        }
        // Default style if status is not found
        return { backgroundColor: 'black' };
    };

    // Dynamic statuses based on the provided arrays
    const dynamicStatuses = statusArr?.filter((status) =>  status == statusValue).map((status, index) => (
        <FormLabel key={status} style={getStatusStyle(status)}>
            {`${statusName[status]}`}
        </FormLabel>
    ));
    return (
            <div>{dynamicStatuses}</div>
    );
};

export default ShowStatus;
