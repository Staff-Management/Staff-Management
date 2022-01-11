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

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Redux
import { useSelector } from "react-redux";

// Slice
import { selectEmail } from "slices/userSlice"

function Notifications() {
  // TODO const email = useSelector(selectEmail);
  const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com';

  const [notifications, setNotifications] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Message Deleted"
      content="Message is successfully deleted!"
      dateTime="Just Now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:4000/getnotification', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json();
      setNotifications(data.notification);
    }
    catch (e) {
      alert("Error, refer to the console for details");
      console.log(e);
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch('http://localhost:4000/deletenotification', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.status === 200) {
        openSuccessSB();
      }
    }
    catch (e) {
      alert("Error, refer to the console for details");
      console.log(e);
    }
  }

  const handleRefresh = () => {
    fetchNotifications();
  }

  // const renderInfoSB = (
  //   <MDSnackbar
  //     icon="notifications"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={infoSB}
  //     onClose={closeInfoSB}
  //     close={closeInfoSB}
  //   />
  // );

  // const renderWarningSB = (
  //   <MDSnackbar
  //     color="warning"
  //     icon="star"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={warningSB}
  //     onClose={closeWarningSB}
  //     close={closeWarningSB}
  //     bgWhite
  //   />
  // );

  // const renderErrorSB = (
  //   <MDSnackbar
  //     color="error"
  //     icon="warning"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={errorSB}
  //     onClose={closeErrorSB}
  //     close={closeErrorSB}
  //     bgWhite
  //   />
  // );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox display="flex" alignItems="center" pt={2} pl={2} pr={2}>
                <MDTypography variant="h5" textTransform="capitalize" mr={2}>
                  Notifications
                </MDTypography>
                <MDTypography variant="body2" color="secondary">
                  <Tooltip title={'refresh'} placement="top">
                    <IconButton aria-label="refresh" color="info" onClick={handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                {notifications && notifications.map((notification, index) => (
                  <MDAlert key={notification._id} color="info" dismissible onClose={() => handleDelete(notification._id)}>
                    <Grid
                      justify="space-between"
                      container
                      columnSpacing={50}
                    >
                      <Grid item>
                        <MDTypography variant="caption" color="white">
                          {new Date(Number(notification.date)).toString()}
                        </MDTypography>
                      </Grid>
                      <Grid item>
                        <MDTypography variant="caption" color="white">
                          {`From ${notification.from_email}`}
                        </MDTypography>
                      </Grid>
                    </Grid>
                    <MDTypography variant="body2" color="white">
                      {`Message: ${notification.message}`}
                    </MDTypography>
                  </MDAlert>
                ))}
              </MDBox>
            </Card>
          </Grid>
          {renderSuccessSB}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
