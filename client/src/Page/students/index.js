import MainCard from '../../ui-component/cards/MainCard';
import { useEffect, useMemo } from 'react';
import { useUserDispatch } from '../../redux/dispatch/userdispatch';
import { useState } from 'react';
import StudentForm from './form';

// material-ui
import Table from "../../ui-component/table"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ImageProfile from "../../ui-component/form/ImageModel"
import { Avatar, Badge } from '@mui/material';
import styled from '@emotion/styled';
import { FormButton } from "../../ui-component/form";
import { useTheme } from '@mui/material/styles';
import { studentListApi } from '../../api/student';
import SideBar from '../../Component/SideBar';
import { useNavigate } from 'react-router-dom';
import { DialogPopUpForm } from '../../ui-component/model';

const OnlineBadge = styled(Badge)(({ theme, status }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: status === 1 && '#50d600',
        width: 12,
        height: 12,
        borderRadius: '50%',
        position: 'absolute',
        top: 31,
        right: 8
    },
}));

const Student = () => {
    const navigate = useNavigate()
    const theme = useTheme();
    const { showNotification, setProfileId, setIsFormOpen } = useUserDispatch()


    const [userList, setUserList] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);

    const [defaultFilter, setDefaultFilter] = useState({
        "itemsPerPage": 10,
        "currentPage": 1,
        "sortBy": [],
        "filters": []
    });

    useEffect(() => {
        getStudent(defaultFilter);
    }, [defaultFilter]);

    const [rowCount, setRowCount] = useState(0);
    const handleNavigate = (id) => {
        setProfileId(id)
        navigate("/profile")
    }

    const getStudent = async (filterValue) => {

        let response = await studentListApi(filterValue ?? defaultFilter);
        if (response && response?.status === 200) {
            setUserList(response?.data?.data?.data);
            setRowCount(response?.data?.data?.rows);
        } else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            });
        }
    }

    const handleAddStudentForm = () => {
        setOpenAddForm(true);
        setIsFormOpen(true);
    }

    // Define columns for display the list
    const columns = useMemo(() => {

        let baseColumns = [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
                Cell: ({ row }) => (
                    <>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {row?.original?.image ? (
                                <OnlineBadge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                    status={row?.original?.login_status}
                                >
                                    <ImageProfile
                                        src={row?.original?.image} alt="Profile Photo"
                                        style={{ cursor: 'pointer', height: '50px', width: '50px', borderRadius: '100%', objectFit: "fill", border: '1px solid #0078a6' }}
                                    />
                                </OnlineBadge>
                            ) : (
                                <OnlineBadge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                    status={row?.original?.login_status}
                                >
                                    <div>
                                        <Avatar sx={{
                                            height: '50px',
                                            width: '50px',
                                            background: '#6fa5d6 !important',
                                            color: '#000 !important',

                                            '&:hover': {
                                                color: '#000 !important',
                                                background: '#6fa5d6 !important',
                                            }
                                        }}>
                                        </Avatar>
                                    </div>
                                </OnlineBadge>
                            )}
                            {row?.original?.name || "-"}

                        </div>
                    </>
                ),
            },
            {
                accessorKey: 'roll_no',
                header: 'Roll No',
                size: 150,
                enableSorting: false,
                Cell: ({ row }) => (
                    <>
                        {row?.original?.roll_no || "-"}
                    </>
                ),
            },
            {
                accessorKey: 'mobile',
                header: 'Mobile No',
                size: 150,
                enableSorting: false,
                Cell: ({ row }) => (
                    <>
                        {row?.original?.mobile || "-"}
                    </>
                ),
            },
            {
                accessorKey: 'division',
                header: 'Division',
                size: 150,
                enableSorting: false,
                Cell: ({ row }) => (
                    <>
                        {row?.original?.division || "-"}
                    </>
                ),
            },
            {
                accessorKey: 'department_id',
                header: 'Department',
                size: 150,
                enableSorting: false,
                Cell: ({ row }) => (
                    <>
                        {row?.original?.department?.name || "-"}
                    </>
                ),
            },
            {
                accessorKey: 'num_subjects',
                header: 'Subjects',
                size: 150,
                enableSorting: false,
                Cell: ({ row }) => (
                    <>
                        {row?.original?.num_subjects || "-"}
                    </>
                ),
            },
            {
                accessorKey: 'fees',
                header: 'Fees Status',
                size: 150,
                enableSorting: false,
                Cell: ({ row }) => {
                    const isPaid = row?.original?.fees?.length > 0;

                    return (<>
                        <FormButton
                            label={isPaid ? 'Paid' : 'Pending'}
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                            sx={{
                                marginBottom: '15px',
                                backgroundColor: `${isPaid ? '#3aa33ec7' : '#e55036db'}`,
                                '&:hover': {
                                    backgroundColor: `${isPaid ? '#3aa33ec7' : '#e55036db'}`
                                }
                            }}
                        />
                    </>)
                },
            },
        ];

        let actionColumn = {
            accessorKey: 'action',
            header: 'View Profile',
            size: 100,
            enableColumnFilter: false,
            enableSorting: false,
            enableHiding: false,
            Cell: ({ row }) => (
                <>
                    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                        <FormButton
                            label="Profile"
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => handleNavigate(row?.original?.id)}
                            sx={{
                                marginBottom: '15px',
                            }}
                        />
                    </div>
                </>
            ),
        };

        baseColumns.push(actionColumn);

        return baseColumns;

    }, []);

    return (
        <>
            <SideBar></SideBar>
            <MainCard title="Student List">
                <FormButton
                    label='Add Student'
                    size="large"
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={handleAddStudentForm}
                    sx={{
                        marginBottom: '15px'
                    }}
                />
                {openAddForm &&
                    <DialogPopUpForm
                        props={{
                            modelHead: 'Add Student',
                            modelWidth: '50%',
                        }}
                    >
                        <StudentForm fetchApiFunction={getStudent} defaultFilter={defaultFilter} />
                    </DialogPopUpForm>
                }

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Table
                        columns={columns}
                        data={userList}
                        enableHiding={true}
                        defaultFilter={defaultFilter}
                        setDefaultFilter={setDefaultFilter}
                        rowCount={rowCount}
                    />
                </LocalizationProvider>
            </MainCard>
        </>
    )
};

export default Student;