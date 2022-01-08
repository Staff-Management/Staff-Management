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
import MDBox from "components/MDBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Address() {

  return (

    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#6667AB', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
          User Profile Section
        </Typography>
          <ProfileInfoCard
            title="User Profile Information"
            info={{
              fullName: "Natasha M. Lee",
              preferredName: "Tasha",
              birthDate: "05 June 1996",
              age: "26",
              gender: "Female",
              SSN: "123-123-1234", // this should be encrypted 
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

export default Address;