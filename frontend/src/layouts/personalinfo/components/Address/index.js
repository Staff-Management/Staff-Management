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

import React, { useState } from 'react';

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
  
  const classes = useStyles();
  const [updating, setupdating] = useState(false);

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
              {updating ? (
                <div>
                  <div>
                    <TextField
                      label="Update Address Line 1"
                      id="outlined-size-small"
                      defaultValue="Address Line 1"
                      size="small"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Update Address Line 2"
                      id="outlined-size-small"
                      defaultValue="Address Line 2"
                      size="small"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Update City"
                      id="outlined-size-small"
                      defaultValue="City"
                      size="small"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Update State"
                      id="outlined-size-small"
                      defaultValue="State"
                      size="small"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Update Zip Code"
                      id="outlined-size-small"
                      defaultValue="Zip Code"
                      size="small"
                    />
                  </div>
                </div>                
              ) : (
                <div>
                  
                  Address Line 1:
                  <Typography gutterBottom variant="h6" component="div">
                    1111 Street Name
                  </Typography>

                  Address Line 2:
                  <Typography gutterBottom variant="h6" component="div">
                    Apt #123
                  </Typography>

                  City:
                  <Typography gutterBottom variant="h6" component="div">
                    Philadelphia
                  </Typography>

                  State:
                  <Typography gutterBottom variant="h6" component="div">
                    PA
                  </Typography>

                  Zip Code:
                  <Typography gutterBottom variant="h6" component="div">
                    07123
                  </Typography>
                </div>
              )}  
              </CardContent>
            </CardActionArea>

            <CardActions>
              <Button size="small" onClick={() => setupdating(true)} color="secondary">
                Edit
              </Button>
              <Button size="small" onClick={() => setupdating(false)} color="secondary">
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