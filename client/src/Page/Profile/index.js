
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

const Profile = () => {
  const data = useSelector((state) => state?.user);
  console.log("datatata>>>", data?.userLoginData);
  const userId = data?.userLoginData?.role_id == "1" ? data?.profileId : data?.userLoginData?.students?.[0]?.id;
  const { setIsFormOpen } = useUserDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [profileData, setProfileData] = useState();

  const getProfileData = async () => {
    console.log("profile datattat???");
    let response = await getStudentById(userId);
    console.log("response is tehrerererer>>", response?.data?.data);
    if (response && response?.status === 200) {
      console.log("sucessss>>",);
      setProfileData(response?.data?.data);
    }
  }
  console.log("profiledata>>>", profileData)
  useEffect(() => {
    getProfileData();
  }, [data?.profileId]);

  const handleForm = (type) => {
    setIsFormOpen(true);
    setModalType(type); // Set the modal type ('idCard' or 'report')
    setOpenModal(true);
  }

  return (
    <>
      <SideBar />
      <MainCard title="Profile">

        <FormButton
          label="Generate Id Card"
          size="large"
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => handleForm('idCard')} // Pass 'idCard' to handleForm
          sx={{
            marginBottom: '15px',
          }}
        />
        <FormButton
          label="View report"
          size="large"
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => handleForm('report')} // Pass 'report' to handleForm
          sx={{
            marginBottom: '15px',
          }}
        />
        {openModal && (
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

