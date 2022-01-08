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
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Address() {

  return (

    <MDBox>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Address Section
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ProfileInfoCard
            title="Primary Address Information"
            info={{
              addressLine1: "1111 Street Name",
              addressLine2: "Apt #123",
              city: "Philadelphia",
              state: "PA",
              zip: "07123",
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
        </Grid>

        <Grid item xs={12} lg={6}>
          <ProfileInfoCard
            title="Secondary Address Information"
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
        </Grid>

      </Grid>

    </MDBox>

  );
}

export default Address;