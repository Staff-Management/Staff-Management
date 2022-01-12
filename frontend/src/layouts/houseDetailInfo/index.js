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

// @mui material components
import Grid from "@mui/material/Grid";
import * as React from 'react'

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Personal Info components
import HouseInfo from "./components/HouseInfo";
import Employment from "./components/EmployeeList";
import FacilityInfo from "./components/FacilityInfo";


function PersonalInfo() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <React.Fragment>
      <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <HouseInfo />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FacilityInfo />
            </Grid>
          </Grid>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <Employment/>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      </React.Fragment>
    </DashboardLayout>
  );
}

export default PersonalInfo;
