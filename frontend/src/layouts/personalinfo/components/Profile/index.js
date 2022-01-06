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

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Address() {

  return (

    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <ProfileInfoCard
            title="User Profile"
            info={{
              fullName: "Natasha Lee",
              preferredName: "Natasha",
              birthDate: "05 June 1996",
              age: "26",
              gender: "Female",
              SSN: "***-***-1234",
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
            action={{ route: "", tooltip: "Edit Profile" }}
          />
        </Grid>
        {/* <Grid item xs={12} lg={6}>
          <ProfileInfoCard
            title="Secondary Address"
            info={{
              addressLine1: "1111 Street Name",
              addressLine2: "Apt #123",
              city: "East Windsor",
              state: "NJ",
              zip: "08123",
            }}
            social={[
              {
                link: "https://www.google.com/maps",
                icon: <LocationOnIcon />,
                color: "github",
              },
            ]}
            action={{ route: "", tooltip: "Edit Profile" }}
          />
        </Grid> */}
      </Grid>
    </MDBox>
  );
}

export default Address;