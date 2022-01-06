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

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from '@mui/icons-material/GitHub';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";


function Profile() {

  return (
    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ProfileInfoCard
            title="Data Analyst"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            info={{
              fullName: "Alexandra M. Thompson",
              preferredName: "Lexi",
              birthDate: "12/21/1996",
              age: "26",
              gender: "Female",
              workAuthorization: "US Citizen",
              socialSecurity: "***-***-1234"
            }}
            social={[
              {
                link: "https://www.facebook.com",
                icon: <FacebookIcon />,
                color: "facebook",
              },
              {
                link: "https://twitter.com",
                icon: <TwitterIcon />,
                color: "twitter",
              },
              {
                link: "https://www.instagram.com",
                icon: <InstagramIcon />,
                color: "instagram",
              },
            ]}
            action={{ route: "", tooltip: "Edit Profile" }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Profile;
