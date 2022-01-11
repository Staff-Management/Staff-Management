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

// Material Dashboard 2 React components
import * as React from "react";
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function HouseInfo() {
  const [response, setResponse] = useState();
  const { landLord } = useParams();

  useEffect(() => {
    getHouseInfo();
  }, [])

  useEffect(() => {
    console.log(response)
  }, [response])

  const getHouseInfo = async () => {
    try {
      const res = await fetch(`http://localhost:4000/gethouse/${landLord}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const resp = await res.json();
      setResponse(resp.res);
    }
    catch (e) {
      alert("Error, refer to the console for details");
    }
  }

  return (
    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#6667AB', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
          Landlord Information
        </Typography>
          <ProfileInfoCard
            title="User Profile Information"
            info={ response ? {
              fullName: response.landLord,
              phone: response.landLordPhone,
              email: response.landlordEmail,
              numEmployees: response.list_employee.length,
              addressLine1: response.address1,
              addressLine2: response.address2,
              city: response.city,
              state: response.state,
              zip: response.zip,
            } : {
              fullName: "",
                phone: "",
                email: "",
                numEmployees: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                zip: "",
          }}
            social={[
              {
                link: "https://www.facebook.com",
                icon: <FacebookIcon />,
                color: "facebook",
              },
              {
                link: "https://www.twitter.com",
                icon: <TwitterIcon />,
                color: "twitter",
              },
              {
                link: "https://www.instagram.com",
                icon: <InstagramIcon />,
                color: "instagram",
              },
            ]}
            action={{ route: "/Editor", tooltip: "Edit Profile" }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default HouseInfo;