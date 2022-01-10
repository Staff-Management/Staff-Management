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

  const [editing, setEditing] = useState({
    update_name: "",
    preferred_name: "",
    dob: "",
    gender: "",
    ssn: ""  
  });

  // controlls the mode 
  const [editingMode, setEditingMode] = useState(false);

  const handleEditChange = (e) => {
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    })
  };

  const updateProfile = async (e) => {
    try
    {
      console.log(editing);
      // const res = await fetch('http://localhost:4000/dashboard', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, all_info, em_contact }),
      //   headers: {'Content-Type': 'application/json'}
      // })
      // const response = await res.json();
      // props.handleNext();
    }
    catch(err)
    {
      alert('Error');
      console.log(err);
    }
    setEditingMode(false);
  };

  return (

    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
        <Typography variant="h6" gutterBottom sx={{ backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
          User Profile Section
        </Typography>

        <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
          <CardActionArea>
            <CardContent>
            {editingMode ? (
              <div>
                <div>
                  <TextField
                    label="firstName"
                    id="firstName"
                    name="firstName"
                    defaultValue="First Name"
                    size="small"
                    onChange={handleEditChange}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    label="Update Preferred Name"
                    id="preferred_name"
                    name="preferred_name"
                    defaultValue="Preferred Name"
                    size="small"
                    onChange={handleEditChange}
                  />
                </div>
                <br />
                <div>
                <TextField
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  defaultValue=""
                  sx={{ width: 160 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleEditChange}
                />
                </div>
                {/* <br />
                <div>
                  <TextField
                    label="Update Age"
                    id="age"
                    name="age"
                    defaultValue="Age"
                    size="small"
                    onChange={handleEditChange}
                  />
                </div> */}
                <br />
                <div>
                  <TextField
                    label="Update Gender"
                    id="gender"
                    name="gender"
                    defaultValue="Gender"
                    size="small"
                    onChange={handleEditChange}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    label="Update Social Security Number"
                    id="ssn"
                    name="ssn"
                    defaultValue="Social Security Number"
                    size="small"
                    onChange={handleEditChange}
                  />
                </div>
              </div>                
            ) : (
              <div>
                Name:
                <Typography id="update_name" name="update_name" gutterBottom variant="h6" component="div">
                  Natasha M. Lee
                </Typography>

                Preferred Name:
                <Typography id="preferred_name" name="preferred_name" gutterBottom variant="h6" component="div">
                  Tasha
                </Typography>

                Date of Birth:
                <Typography id="dob" name="dob" gutterBottom variant="h6" component="div">
                  05 June 1996
                </Typography>

                Age:
                <Typography id="age" name="age" gutterBottom variant="h6" component="div">
                  26
                </Typography>

                Gender:
                <Typography id="gender" name="gender" gutterBottom variant="h6" component="div">
                  Female
                </Typography>

                Social Security Number:
                <Typography id="ssn" name="ssn" gutterBottom variant="h6" component="div">
                  111-111-1111
                </Typography>
              </div>
            )}
                
            </CardContent>
          </CardActionArea>

          <CardActions>
              <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                Edit
              </Button>
              <Button size="small" onClick={() => updateProfile()} color="secondary">
                Update
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