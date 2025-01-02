import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Icon from '@mui/icons-material/Assignment';
import SideBar from '../../Component/SideBar';
import { PiStudentBold } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
    const common = useSelector((state) => state?.user)
    const roleId = common?.userLoginData?.role_id
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar></SideBar>
            < Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {
                    roleId != "2" &&
                    <Card
                        sx={{
                            backgroundColor: '#d8d7f5',
                            borderRadius: 2,
                            boxShadow: 1,
                            textAlign: 'center',
                            padding: 2,
                            width: 200,
                            cursor: "pointer"

                        }}
                        onClick={() => navigate("/student")}
                    >
                        <CardContent>
                            <Box sx={{ fontSize: 40, color: '#02143A', mb: 1 }}>
                                <PiStudentBold />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#02143A" }}>
                                Students
                            </Typography>
                        </CardContent>
                    </Card>
                }
                {
                    roleId != "1" &&
                    <Card
                        sx={{
                            backgroundColor: '#d8d7f5',
                            borderRadius: 2,
                            boxShadow: 1,
                            textAlign: 'center',
                            padding: 2,
                            width: 200,
                            cursor: "pointer"
                        }}
                        onClick={() => navigate("/fees")}

                    >
                        <CardContent>
                            <Box sx={{ fontSize: 40, color: '#02143A', mb: 1 }}>
                                <Icon />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#02143A" }}>
                                Fees
                            </Typography>
                        </CardContent>
                    </Card>
                }
            </Box>
        </Box>

    );
};
export default Dashboard
