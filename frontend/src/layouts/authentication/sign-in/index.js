/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Slice
import { setLogin, setRole, setUsername, setEmail } from 'slices/userSlice';

// Redux
import { useDispatch } from 'react-redux';

// Router
import { useNavigate } from 'react-router-dom'

function Basic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [values, setValues] = useState({
    account: "",
    password: "",
    remember: false
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSignIn = async (dispatch, navigate) => {
    const account = values.account;
    const password = values.password;
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ account, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      if (response.user){
        localStorage.clear();
        if (rememberMe)
          localStorage.setItem('user', JSON.stringify(response.user));
        dispatch(setLogin());
        dispatch(setEmail({ email: response.user.email }))
        dispatch(setUsername({ username: response.user.username }))
        dispatch(setRole({ role: response.user.role }))
        navigate('/dashboard');
      }
    }
    catch(err)
    {
      alert("Wrong Username or Password");
      console.log(err)
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" name="account" label="Email or Username" fullWidth onChange={handleChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" name="password" label="Password" fullWidth onChange={handleChange}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => handleSignIn(dispatch, navigate)}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
