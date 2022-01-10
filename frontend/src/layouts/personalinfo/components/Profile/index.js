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

import React, { useEffect, useState } from 'react';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField';
import { Button, CardActionArea, CardActions, CardHeader } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  root: {
    minWidth: 500
  },
  bullet: {
    display: "flex",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function Profile() {

  const classes = useStyles();
  const [updating, setUpdating] = useState(false);

  return (

    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#6667AB', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
          User Profile Section
        </Typography>

        <Card className={classes.root} variant="outlined" sx={{ maxWidth: 1000 }}>
          <CardActionArea>
            <CardContent>
            {updating ? (
              <div>
                <div>
                  <TextField
                    label="Update Name"
                    id="outlined-size-small"
                    defaultValue="Name"
                    size="small"
                  />
                </div>
                <br />
                <div>
                  <TextField
                    label="Update Preferred Name"
                    id="outlined-size-small"
                    defaultValue="Preferred Name"
                    size="small"
                  />
                </div>
                <br />
                <div>
                <TextField
                  id="date"
                  label="Date of Birth"
                  type="date"
                  defaultValue="2017-05-24"
                  sx={{ width: 160 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </div>
                <br />
                <div>
                  <TextField
                    label="Update Age"
                    id="outlined-size-small"
                    defaultValue="Age"
                    size="small"
                  />
                </div>
                <br />
                <div>
                  <TextField
                    label="Update Gender"
                    id="outlined-size-small"
                    defaultValue="Gender"
                    size="small"
                  />
                </div>
                <br />
                <div>
                  <TextField
                    label="Update Social Security Number"
                    id="outlined-size-small"
                    defaultValue="Social Security Number"
                    size="small"
                  />
                </div>
              </div>                
            ) : (
              <div>
                Name:
                <Typography gutterBottom variant="h6" component="div">
                  Natasha M. Lee
                </Typography>

                Preferred Name:
                <Typography gutterBottom variant="h6" component="div">
                  Tasha
                </Typography>

                Date of Birth:
                <Typography gutterBottom variant="h6" component="div">
                  05 June 1996
                </Typography>

                Age:
                <Typography gutterBottom variant="h6" component="div">
                  26
                </Typography>

                Gender:
                <Typography gutterBottom variant="h6" component="div">
                  Female
                </Typography>

                Social Security Number:
                <Typography gutterBottom variant="h6" component="div">
                  111-111-1111
                </Typography>
              </div>
            )}
                
            </CardContent>
          </CardActionArea>

          <CardActions>
              <Button size="small" onClick={() => setUpdating(true)} color="secondary">
                Update
              </Button>
              <Button size="small" onClick={() => setUpdating(false)} color="secondary">
                Back
              </Button>
          </CardActions>

        </Card>

          {/* <ProfileInfoCard
            title="User Profile Information"
            description=""
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
            action={{ 
              route: "/Editor", tooltip: "Edit Profile" 
            }}
          /> */}

        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Profile;