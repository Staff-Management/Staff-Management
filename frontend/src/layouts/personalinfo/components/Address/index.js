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

import React, { useState, useEffect } from 'react';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button, CardActionArea, CardActions, CardHeader } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { selectEmail } from 'slices/userSlice';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: 250
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

function Address() {

  let email = useSelector(selectEmail)
  email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
  const [values, setValues] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  useEffect(() => {

    fetchAddress();

  }, []);

  const fetchAddress = async () => {
    try {
      const res = await fetch('http://localhost:4000/getAddress', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      setValues(response.user.address_info);
    } catch (err) {
      console.log(err)
    }
  }

  const classes = useStyles();
  const [editing, setEditing] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  const [editingMode, setEditingMode] = useState(false);

  const handleEditChange = (e) => {
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    })
  };


  const updateAddress = async (e) => {
    try {
      console.log(editing);
      let update_info = editing;
      for (const key in update_info) {
        if (update_info[key] === "") {
          delete update_info[key];
        }
      }
      const res = await fetch('http://localhost:4000/updateAddress', {
        method: 'POST',
        body: JSON.stringify({ email, ...update_info }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      fetchAddress();
    }
    catch (err) {
      alert('Error');
      console.log(err);
    }
    setEditingMode(false);
  };


  return (

    <MDBox>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Address Section
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
            <CardActionArea>
              <CardContent>
                {editingMode ? (
                  <React.Fragment>
                    <TextField
                      label="Update Address Line 1"
                      id="address1"
                      name="address1"
                      defaultValue={values.address1}
                      size="small"
                      sx={{ mt: 2, mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update Address Line 2"
                      id="address2"
                      name="address2"
                      defaultValue={values.address2}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update City"
                      id="city"
                      name="city"
                      defaultValue={values.city}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update State"
                      id="state"
                      name='state'
                      defaultValue={values.state}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update Zip Code"
                      id="zip"
                      name='zip'
                      defaultValue={values.zip}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                    <br />
                    <TextField
                      label="Update Country"
                      id="country"
                      name='country'
                      defaultValue={values.country}
                      size="small"
                      sx={{ mb: 2 }}
                      onChange={handleEditChange}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    Address Line 1:
                    <Typography gutterBottom variant="h6" component="div">
                      {values.address1}
                    </Typography>

                    Address Line 2:
                    <Typography gutterBottom variant="h6" component="div">
                      {values.address2}
                    </Typography>

                    City:
                    <Typography gutterBottom variant="h6" component="div">
                      {values.city}
                    </Typography>

                    State:
                    <Typography gutterBottom variant="h6" component="div">
                      {values.state}
                    </Typography>

                    Zip:
                    <Typography gutterBottom variant="h6" component="div">
                      {values.zip}
                    </Typography>

                    Country:
                    <Typography gutterBottom variant="h6" component="div">
                      {values.country}
                    </Typography>
                  </React.Fragment>
                )}
              </CardContent>
            </CardActionArea>

            <CardActions>
              <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                Edit
              </Button>
              <Button size="small" onClick={() => updateAddress()} color="secondary">
                Update
              </Button>
            </CardActions>

          </Card>

        </Grid>

      </Grid>

    </MDBox>

  );
}

export default Address;