/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

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
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import React, { useRef } from "react";
import axios from "axios";

// Images
import logo1 from "assets/images/logo1.png";
import { useNavigate } from "react-router-dom";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  //const history = useRef(null);
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (isLoad) return;
    setIsLoad(true);

    const data = {
      username: username,
      password: password,
    };
    console.log("Sending data:", data);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/springfever/api/auth/signinV2",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the Content-Type is set
          },
        }
      );
      console.log("Response received", response.data);

      navigate("/rechercher/components", { state: { UserInfo: data } });

      // Handle successful login here (e.g., save token, redirect)
    } catch (error) {
      console.error("Error during request", error);
      if (error.response) {
        // Server responded with a status code out of 2xx range
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something else caused the error
        console.error("Error message:", error.message);
      }
    } finally {
      setIsLoad(false);
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={logo1}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="light" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSignIn}>
            <MDBox mb={2}>
              <MDInput
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                label="Email"
                fullWidth
                autoComplete="off"
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                type="password"
                label="Password"
                fullWidth
                autoComplete="off"
                required
              />
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
              <MDButton type="submit" variant="gradient" color="warning" fullWidth>
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
                  color="error"
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
