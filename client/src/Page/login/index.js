import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import AuthCardWrapper from './AuthCardWrapper';
import AuthWrapper1 from './AutheWrapper1';
import { FormButton, PasswordBox, TextBox } from '../../ui-component/form';
import { userLoginApi } from '../../api/user';
import { useUserDispatch } from '../../redux/dispatch/userdispatch';

const Login = ({ ...others }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const { showNotification, setLoginData, setUserLoginData } = useUserDispatch()

    const handleSubmit = async (values) => {
        let response = await userLoginApi(values);
        if (response.status === 200) {
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'success',
                isOpen: true
            })
            setLoginData(response?.data?.data?.token);
            setUserLoginData(response?.data?.data);
            navigate("/dashboard")
        } else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            })
        }
    };


    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item xs={12}>
                                        <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color="#1976D2" fontWeight="700" gutterBottom variant={matchDownSM ? 'h3' : 'h3'}>
                                                        Login                          </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" justifyContent="center" spacing={2}>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Divider sx={{ flexGrow: 1, borderColor: theme.palette.grey[300] }} />
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            px: 2,
                                                            color: "black",
                                                        }}
                                                    >
                                                        Sign in with User Name
                                                    </Typography>
                                                    <Divider sx={{ flexGrow: 1 }} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Formik
                                            initialValues={{
                                                username: '',
                                                password: '',
                                            }}
                                            validationSchema={Yup.object().shape({
                                                username: Yup.string().max(255).required('Username is required'),
                                                password: Yup.string().max(255).required('Password is required'),
                                            })}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                                                <form noValidate onSubmit={handleSubmit} {...others}>
                                                    <TextBox
                                                        label="Username"
                                                        name="username"
                                                        value={values.username}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        sx={{
                                                            borderRadius: '8px',
                                                            padding: '10px',
                                                            marginBottom: 2,
                                                        }}
                                                        error={Boolean(touched.username && errors.username)}
                                                        touched={(touched.username && errors.username) && errors.username}
                                                        errorMessage={errors.username}
                                                    />
                                                    <PasswordBox
                                                        value={values.password}
                                                        name="password"
                                                        label="Password"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        showPassword={showPassword}
                                                        handleClickShowPassword={handleClickShowPassword}
                                                        handleMouseDownPassword={handleMouseDownPassword}
                                                        error={Boolean(touched.password && errors.password)}
                                                        touched={(touched.password && errors.password) && errors.password}
                                                        errorMessage={errors.password}
                                                    />
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 2 }}>
                                                        <Typography
                                                            component={Link}
                                                            to="/forgot-password"
                                                            variant="subtitle1"
                                                            sx={{
                                                                textDecoration: 'none',
                                                                cursor: 'pointer',
                                                                color: "#1976D2",
                                                            }}
                                                        >
                                                            Forgot Password?
                                                        </Typography>
                                                    </Stack>
                                                    <FormButton isSubmitting={false} label="Sign in" fullWidth />
                                                </form>
                                            )}
                                        </Formik>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
