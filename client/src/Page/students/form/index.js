import { Grid, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { TextBox, PasswordBox, FormButton, DropDown, PhoneNumberInput, FormImageUploader } from "../../../ui-component/form";
import { useTheme } from '@mui/material/styles';
import { getDepartmentList, studentAddApi } from "../../../api/student";

import { useUserDispatch } from "../../../redux/dispatch/userdispatch";
const StudentForm = (props) => {
    const theme = useTheme();
    const { showNotification, setIsFormOpen } = useUserDispatch();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedFile, setSelectedFile] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('+91');

    const [departmentData, setDepartmentData] = useState()
    const addStudentFormInitialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        mobile: '',
        image: '',
        division: '',
        department_id: '',
        num_subjects: '',

        marks: [{
            id: "",
            subject: "",
            marks_obtained: "",
            total_marks: ""

        }],
    };

    const addStudentFormValidationSchema = Yup.object().shape({
        name: Yup.string().required("name is required!"),
        username: Yup.string().required("Username is required!"),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required!'),
        password: Yup.string().required("Password is required!").min(6, 'Password length at least 6'),
        confirm_password: Yup.string().required("Confirm password is required!").oneOf([Yup.ref("password"), null], "Confirm password must be the same as the password"),
        mobile: Yup.string().max(10, 'Mobile number must be exactly 10 digits').required('Mobile number is required!'),
        image: Yup.mixed().required("Image is required!")
            .test("fileSize", "File size must be less than 2 Mb.", (value) => value && value?.size <= 2 * 1024 * 1024)
            .test("fileType", "Image must have .jpg, .jpeg, or .png extension.", (file) => {
                return file?.type === "image/jpeg" || file?.type === "image/jpg" || file?.type === "image/png";
            }),
        division: Yup.string().required("Division is required!"),
        department_id: Yup.string().required("Department is required!"),
        num_subjects: Yup.string().required("Please enter  no of subjects!"),
    });

    const handlePhoneValueChange = (newPhone) => {
        setPhoneNumber(newPhone?.numberValue);
        formik.setFieldValue('mobile', newPhone?.nationalNumber);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const getDepartment = async () => {
        const response = await getDepartmentList();
        if (response?.status === 200) {
            let departments = [];
            response?.data?.data?.map((role) => {
                departments.push({
                    label: role?.name,
                    value: role?.id
                });
            });
            setDepartmentData(departments)
        }

    }

    useEffect(() => {
        getDepartment()
    }, [])

    const handleSubmit = async (values) => {
        let formData = new FormData();
        formData.append("name", values?.name);
        formData.append("username", values?.username);
        formData.append("email", values?.email);
        formData.append("password", values?.password);
        formData.append("confirm_password", values?.confirm_password);
        formData.append("mobile", values?.mobile);
        formData.append("file", values?.image);
        formData.append("division", values?.division);
        formData.append("department_id", values?.department_id);
        formData.append("num_subjects", values?.num_subjects);
        formData.append('marks', JSON.stringify(values?.marks))
        let response = await studentAddApi(formData);

        if (response && response?.status === 200) {
            setIsFormOpen(false)
            props?.fetchApiFunction(props?.defaultFilter);
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'success',
                isOpen: true
            });
        } else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            });
        }
    }
    const formik = useFormik({
        initialValues: addStudentFormInitialValues,
        validationSchema: addStudentFormValidationSchema,
        onSubmit: handleSubmit
    });

    useEffect(() => {
        const numSubjects = formik.values.num_subjects;
        const updatedMarks = [];
        for (let i = 0; i < numSubjects; i++) {
            updatedMarks.push({
                id: `subject_${i}`,
                subject: '',
                marks_obtained: '',
                total_marks: ''
            });
        }
        formik.setFieldValue('marks', updatedMarks);
    }, [formik.values.num_subjects]); 

    return (
        <>
            <form noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} md={6}>
                        <TextBox
                            label="Name"
                            name="name"
                            value={formik?.values?.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik?.touched?.name && formik?.errors?.name)}
                            touched={(formik?.touched?.name && formik?.errors?.name) && formik?.errors?.name}
                            errorMessage={formik?.errors?.name}
                            required={true}
                        />
                        <TextBox
                            label="User Name"
                            name="username"
                            value={formik?.values?.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik?.touched?.username && formik?.errors?.username)}
                            touched={(formik?.touched?.username && formik?.errors?.username) && formik?.errors?.username}
                            errorMessage={formik?.errors?.username}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextBox
                            label="Email"
                            name="email"
                            value={formik?.values?.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik?.touched?.email && formik?.errors?.email)}
                            touched={(formik?.touched?.email && formik?.errors?.email) && formik?.errors?.email}
                            errorMessage={formik?.errors?.email}
                            required={true}
                        />
                    </Grid>


                    <Grid Grid item xs={12} md={12}>
                        <PasswordBox
                            value={formik?.values?.password}
                            label="Password"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            showPassword={showPassword}
                            handleClickShowPassword={handleClickShowPassword}
                            error={Boolean(formik?.touched?.password && formik?.errors?.password)}
                            touched={(formik?.touched?.password && formik?.errors?.password) && formik?.errors?.password}
                            errorMessage={formik?.errors?.password}
                            required={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PasswordBox
                            value={formik?.values?.confirm_password}
                            name="confirm_password"
                            label="Confirm Password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            showPassword={showConfirmPassword}
                            handleClickShowPassword={handleClickShowConfirmPassword}
                            error={Boolean(formik?.touched?.confirm_password && formik?.errors?.confirm_password)}
                            touched={(formik?.touched?.confirm_password && formik?.errors?.confirm_password) && formik?.errors?.confirm_password}
                            errorMessage={formik?.errors?.confirm_password}
                            required={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PhoneNumberInput
                            value={phoneNumber}
                            name='mobile'
                            label='Mobile No.'
                            onChange={(event) => handlePhoneValueChange(event)}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik?.touched?.mobile && formik?.errors?.mobile)}
                            touched={(formik?.touched?.mobile && formik?.errors?.mobile) && formik?.errors?.mobile}
                            errorMessage={formik?.errors?.mobile}
                            required={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormImageUploader
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            formik={formik}
                            folderName="/Student"
                            id="image-form-upload"
                            sx={{
                                color: 'white', backgroundColor: "#1976D2", fontSize: '0.3 rem',
                                '&:hover': {
                                    backgroundColor: '#1976D2'
                                }

                            }}
                            imgStyle={{ width: '36%', height: '20%' }}
                            label="Upload image"
                            name='image'
                            mainLabel='Image'
                            touched={(formik?.touched?.image && formik?.errors?.image) && formik?.errors?.image}
                            errorMessage={formik?.errors?.image}
                            required={true}
                            fileType="image/*"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextBox
                            label="Division"
                            name="division"
                            value={formik?.values?.division}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik?.touched?.division && formik?.errors?.division)}
                            touched={(formik?.touched?.division && formik?.errors?.division) && formik?.errors?.division}
                            errorMessage={formik?.errors?.division}
                            required={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DropDown
                            selectBoxLabel="Select Department"
                            options={departmentData}
                            onChange={(event) => formik.setFieldValue('department_id', event?.target?.value)}
                            onBlur={formik.handleBlur}
                            value={formik.values?.department_id}
                            label='Select Department'
                            placeholder='Next'
                            error={Boolean(formik?.touched?.department_id && formik?.errors?.department_id)}
                            touched={(formik?.touched?.department_id && formik?.errors?.department_id) && formik?.errors?.department_id}
                            errorMessage={formik?.errors?.department_id}
                            required={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextBox
                            label="No of subjects"
                            name="num_subjects"
                            value={formik?.values?.num_subjects}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik?.touched?.num_subjects && formik?.errors?.num_subjects)}
                            touched={(formik?.touched?.num_subjects && formik?.errors?.num_subjects) && formik?.errors?.num_subjects}
                            errorMessage={formik?.errors?.num_subjects}
                            required={true}
                        />
                    </Grid>

                    {formik.values.marks.map((mark, index) => (
                        <Grid container key={index} spacing={2} sx={{paddingLeft:"16px"}}>
                            <Grid item xs={12} md={6}>
                                <TextBox
                                    label={`Subject ${index + 1}`}
                                    name={`marks[${index}].subject`}
                                    value={mark.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(formik.touched.marks?.[index]?.subject && formik.errors.marks?.[index]?.subject)}
                                    errorMessage={formik.errors.marks?.[index]?.subject}
                                    required={true}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextBox
                                    label={`Marks Obtained for Subject ${index + 1}`}
                                    name={`marks[${index}].marks_obtained`}
                                    value={mark.marks_obtained}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(formik.touched.marks?.[index]?.marks_obtained && formik.errors.marks?.[index]?.marks_obtained)}
                                    errorMessage={formik.errors.marks?.[index]?.marks_obtained}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextBox
                                    label={`Total Marks for Subject ${index + 1}`}
                                    name={`marks[${index}].total_marks`}
                                    value={mark.total_marks}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(formik.touched.marks?.[index]?.total_marks && formik.errors.marks?.[index]?.total_marks)}
                                    errorMessage={formik.errors.marks?.[index]?.total_marks}
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                    )
                    )}


                    <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <FormButton
                            label='Submit'
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{ margin: '20px 0 5px 0' }}
                        />
                    </Grid>

                </Grid>
            </form>
        </>
    )
}
export default StudentForm
