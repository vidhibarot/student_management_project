import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SideBar from '../../Component/SideBar';
import MainCard from '../../ui-component/cards/MainCard';
import { FormButton } from '../../ui-component/form';
import { useSelector } from 'react-redux';
import { getStudentById } from '../../api/student';
import { useUserDispatch } from '../../redux/dispatch/userdispatch';
import { DialogPopUpForm } from "../../ui-component/model";
import GenerateIdCard from './generateIdcard';
import GenerateReport from './generatereport';
import { Avatar, Grid } from '@mui/material';

const Profile = () => {
  const data = useSelector((state) => state?.user);
  const userId = data?.userLoginData?.role_id == "1" ? data?.profileId : data?.userLoginData?.students?.[0]?.id;
  const { setIsFormOpen, showNotification } = useUserDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [profileData, setProfileData] = useState();

  const getProfileData = async () => {
    let response = await getStudentById(userId);
    if (response && response?.status == 200) {
      setProfileData(response?.data?.data);
      showNotification({
        title: "Success",
        message: response?.data?.message,
        status: 'success',
        isOpen: true
      })
    }
    else {
      showNotification({
        title: "Error",
        message: response?.data?.message,
        status: 'error',
        isOpen: true
      })
    }
  }

  useEffect(() => {
    getProfileData();
  }, [data?.profileId]);

  const handleForm = (type) => {
    setIsFormOpen(true);
    setModalType(type);
    setOpenModal(true);
  }

  return (
    <>
      <SideBar />
      <MainCard title="Profile">


        {profileData &&
          <Box
            sx={{
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '10px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '2rem' }}>
              <Avatar
                src={profileData?.image}
                alt="photo"
                sx={{
                  borderRadius: '50%',
                  border: '5px solid #ddd',
                  width: '150px',
                  height: '150px',
                  marginBottom: '1rem',
                }}
              />
              <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '1rem' }}>
                {profileData?.name}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                    Roll No:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                    {profileData?.roll_no}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                    Mobile:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                    {profileData?.mobile}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                    Division:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black', fontWeight: 500, textTransform: 'lowercase' }}>
                    {profileData?.division}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                    Department:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                    {profileData?.department?.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                    Fees:
                  </Typography>
                  <FormButton

                    size="large"
                    label={profileData?.fees?.length > 0 ? "Paid" : "Unpaid"}
                    type="button"
                    variant="contained"
                    color="secondary"
                    sx={{
                      marginBottom: '15px',
                      backgroundColor: `${profileData?.fees?.length > 0 ? '#3aa33ec7' : '#e55036db'}`,

                      '&:hover': {
                        backgroundColor: `${profileData?.fees?.length > 0 ? '#3aa33ec7' : '#e55036db'}`,
                      }

                    }}
                  />
                </Grid>

              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <FormButton
                  label="Generate Id Card"
                  size="large"
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleForm('idCard')}
                  sx={{ marginBottom: '15px' }}
                />
                <FormButton
                  label="View Report"
                  size="large"
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleForm('report')}
                  sx={{ marginBottom: '15px' }}
                />
              </Box>
            </Box>
          </Box>
        }

        {openModal && profileData && (
          <DialogPopUpForm
            props={{
              modelHead: `${modalType === 'idCard' ? 'Student Id Card' : 'Report'}`,
              modelWidth: '50%',
            }}
          >
            {modalType === 'idCard' ? (
              <GenerateIdCard data={profileData} />
            ) : (
              <GenerateReport data={profileData} />
            )}
          </DialogPopUpForm>
        )}

      </MainCard>
    </>
  );
};

export default Profile;

