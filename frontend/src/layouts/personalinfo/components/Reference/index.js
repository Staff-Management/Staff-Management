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

function Reference() {
  // let email = useSelector(selectEmail)
  const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com';
  const [values, setValues] = useState({
    ref_firstname: "",
    ref_middlename: "",
    ref_lastname: "",
    ref_address1: "",
    ref_city: "",
    ref_state: "",
    ref_country: "",
    ref_zip: "",
    ref_phone: "",
    ref_email: "",
    ref_relationship: ""
  });

  useEffect(() => {
    fetchRef();
  }, []);

  const fetchRef = async () => {
    try {
      const res = await fetch('http://localhost:4000/getRef', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      setValues(response.user.ref_info);
    } catch (err) {
      console.log(err)
    }
  }

  const classes = useStyles();

  const [editing, setEditing] = useState({
    ref_firstname: "",
    ref_middlename: "",
    ref_lastname: "",
    ref_address1: "",
    ref_city: "",
    ref_state: "",
    ref_country: "",
    ref_zip: "",
    ref_phone: "",
    ref_email: "",
    ref_relationship: ""
  });

  // controlls the mode   
  const [editingMode, setEditingMode] = useState(false);

  const handleEditChange = (e) => {
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    })
  };

  const updateRef = async (e) => {
    try {
      console.log(editing);
      let update_info = editing;
      for (const key in update_info) {
        if (update_info[key] === "") {
          delete update_info[key];
        }
      }
      const res = await fetch('http://localhost:4000/updateRef', {
        method: 'POST',
        body: JSON.stringify({ email, ...update_info }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      fetchRef();
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
            Reference Section
          </Typography>

          <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
            <CardActionArea>
              <CardContent>
                {editingMode ? (
                  <React.Fragment>
                    <TextField
                      label="First Name"
                      id="ref_firstname"
                      name="ref_firstname"
                      defaultValue={values.ref_firstname}
                      size="small"
                      sx={{ mt: 2, mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Middle Name"
                      id="ref_middlename"
                      name="ref_middlename"
                      defaultValue={values.ref_middlename}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Last Name"
                      id="ref_lastname"
                      name="ref_lastname"
                      defaultValue={values.ref_lastname}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Address"
                      id="ref_address1"
                      name="ref_address1"
                      defaultValue={values.ref_address1}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="City"
                      id="ref_city"
                      name="ref_city"
                      defaultValue={values.ref_city}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="State"
                      id="ref_state"
                      name="ref_state"
                      defaultValue={values.ref_state}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Country"
                      id="ref_country"
                      name="ref_country"
                      defaultValue={values.ref_country}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Zip Code"
                      id="ref_zip"
                      name="ref_zip"
                      defaultValue={values.ref_zip}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Phone"
                      id="ref_phone"
                      name="ref_phone"
                      defaultValue={values.ref_phone}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Email"
                      id="ref_email"
                      name="ref_email"
                      defaultValue={values.ref_email}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Relationship"
                      id="ref_relationship"
                      name="ref_relationship"
                      defaultValue={values.ref_relationship}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                  </React.Fragment>

                ) : (
                  <React.Fragment>
                    First Name:
                    <Typography id="ref_firstname" name="ref_firstname" gutterBottom variant="h6" component="div">
                      {values.ref_firstname}
                    </Typography>

                    Middle Name:
                    <Typography id="ref_middlename" name="ref_middlename" gutterBottom variant="h6" component="div">
                      {values.ref_middlename}
                    </Typography>

                    Last Name:
                    <Typography id="ref_lastname" name="ref_lastname" gutterBottom variant="h6" component="div">
                      {values.ref_lastname}
                    </Typography>

                    Address:
                    <Typography id="ref_address1" name="ref_address1" gutterBottom variant="h6" component="div">
                      {values.ref_address1}
                    </Typography>

                    City:
                    <Typography id="ref_city" name="ref_city" gutterBottom variant="h6" component="div">
                      {values.ref_city}
                    </Typography>

                    State:
                    <Typography id="ref_state" name="ref_state" gutterBottom variant="h6" component="div">
                      {values.ref_state}
                    </Typography>

                    Country:
                    <Typography id="ref_country" name="ref_country" gutterBottom variant="h6" component="div">
                      {values.ref_country}
                    </Typography>

                    Zip Code:
                    <Typography id="ref_zip" name="ref_zip" gutterBottom variant="h6" component="div">
                      {values.ref_zip}
                    </Typography>

                    Phone:
                    <Typography id="ref_phone" name="ref_phone" gutterBottom variant="h6" component="div">
                      {values.ref_phone}
                    </Typography>

                    Email:
                    <Typography id="ref_email" name="ref_email" gutterBottom variant="h6" component="div">
                      {values.ref_email}
                    </Typography>

                    Relationship to the Employee:
                    <Typography id="ref_relationship" name="ref_relationship" gutterBottom variant="h6" component="div">
                      {values.ref_relationship}
                    </Typography>
                  </React.Fragment>
                )}

              </CardContent>
            </CardActionArea>

            <CardActions>
              <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                Edit
              </Button>
              <Button size="small" onClick={() => updateRef()} color="secondary">
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

export default Reference;