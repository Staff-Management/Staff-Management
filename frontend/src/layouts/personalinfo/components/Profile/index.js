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
import { selectEmail } from 'slices/userSlice';
import { useSelector } from 'react-redux';


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
  let email = useSelector(selectEmail)
  email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
  const [values, setValues] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/getuser', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      setValues(response.user);
    } catch (err) {
      console.log(err)
    }
  }

  const classes = useStyles();

  const [editing, setEditing] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    birthday: "",
    gender: "",
    ssn: "",
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
    try {
      console.log(editing);
      let update_info = editing;
      for (const key in update_info) {
        if (update_info[key] === "") {
          delete update_info[key];
        }
      }
      const res = await fetch('http://localhost:4000/updateProfile', {
        method: 'POST',
        body: JSON.stringify({ email, ...update_info }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      fetchUser();
    }
    catch (err) {
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
                  <React.Fragment>
                    <TextField
                      label="Update First Name"
                      id="firstName"
                      name="firstName"
                      defaultValue={values.firstName}
                      size="small"
                      sx={{ mt: 2, mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update Last Name"
                      id="lastName"
                      name="lastName"
                      defaultValue={values.lastName}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update Preferred Name"
                      id="preferredName"
                      name="preferredName"
                      defaultValue="Preferred Name"
                      defaultValue={values.preferredName}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      id="birthday"
                      name="birthday"
                      label="Update Date of Birth"
                      type="date"
                      defaultValue={values.birthday}
                      sx={{ width: 160 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update Gender"
                      id="gender"
                      name="gender"
                      defaultValue={values.gender}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update Social Security Number"
                      id="ssn"
                      name="ssn"
                      defaultValue={values.ssn}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                  </React.Fragment>

                ) : (
                  <React.Fragment>

                    First Name:
                    <Typography id="firstName" name="firstName" gutterBottom variant="h6" component="div">
                      {values.firstName}
                    </Typography>

                    Last Name:
                    <Typography id="lastName" name="lastName" gutterBottom variant="h6" component="div">
                      {values.lastName}
                    </Typography>

                    Preferred Name:
                    <Typography id="preferredName" name="preferredName" gutterBottom variant="h6" component="div">
                      {values.preferredName}
                    </Typography>

                    Date of Birth:
                    <Typography id="birthday" name="birthday" gutterBottom variant="h6" component="div">
                      {values.birthday}
                    </Typography>

                    Gender:
                    <Typography id="gender" name="gender" gutterBottom variant="h6" component="div">
                      {values.gender}
                    </Typography>

                    Social Security Number:
                    <Typography id="ssn" name="ssn" gutterBottom variant="h6" component="div">
                      {values.ssn}
                    </Typography>
                  </React.Fragment>
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