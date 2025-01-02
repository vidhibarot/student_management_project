import React from 'react';
import { FormButton } from 'ui-component/form';
import { commonDispatch } from 'store/commonRedux/commonDispatch';
import { statusChangeApi } from 'api/commonApi';

const UpdateStatus = ({ data, tableNameProp, writeAccess, setStatusUpdate }) => {

    const { showNotification } = commonDispatch();

    const handleStatusChange = async () => {

        const updatedData = data.original;
        var message = '';

        if (updatedData?.status === 1) {
            updatedData.status = 0;
            message = 'Record has been inactivated successfully.';
        } else {
            updatedData.status = 1;
            message = 'Record has been activated successfully.';
        }

        const { id, status } = updatedData;
        let response = await statusChangeApi({ id, status, tableName: tableNameProp });

        if (response?.status === 200) {
            setStatusUpdate(prev => !prev);
            showNotification({
                title: "Success",
                message: message,
                status: 'success',
                isOpen: true
            });
        } else {
            setStatusUpdate(prev => !prev);
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            });
        }
    };

    const isClickable = !((tableNameProp === 'users' && data.original?.role_id === 1) || (tableNameProp === 'roles' && data.original?.isDefault === 1) || (tableNameProp === 'leave_types' && data.original?.isDefault === 1) || (tableNameProp === 'leave_sub_types' && data.original?.isDefault === 1));

    return (
        <FormButton
            label={data?.original?.status === 1 ? 'Active' : 'Inactive'}
            type={'button'}
            onClick={isClickable && writeAccess ? handleStatusChange : null}
            sx={{
                color: `${data?.original?.status === 1 ? '#ffffff' : '#ffffff'}`,
                backgroundColor: `${data?.original?.status === 1 ? '#3aa33ec7' : '#e55036db'}`,
                height: '40px',
                width: '100px',
                '&:hover': {
                    backgroundColor: `${data?.original?.status === 1 ? '#3aa33e' : '#f53b2b'}`,
                    color: `#ffffff`
                }
            }}
        />
    );
};

export default UpdateStatus;
