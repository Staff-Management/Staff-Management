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
  const [primaryupdating, setPrimaryUpdating] = useState(false);
  const [secondaryupdating, setSecondaryUpdating] = useState(false);

  return (

    <MDBox>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Address Section
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card className={classes.root} variant="outlined" sx={{ maxWidth: 500 }}>
            <CardActionArea>
              <CardContent>
              {primaryupdating ? (
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
                  <Typography gutterBottom variant="h5" component="div">
                    Primary Address:
                  </Typography>

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
              <Button size="small" onClick={() => setPrimaryUpdating(true)} color="secondary">
                Update
              </Button>
              <Button size="small" onClick={() => setPrimaryUpdating(false)} color="secondary">
                Back
              </Button>
            </CardActions>

          </Card>

        </Grid>

        <Grid item xs={12} lg={6}>
          <Card className={classes.root} variant="outlined" sx={{ maxWidth: 500 }}>
              <CardActionArea>
                <CardContent>
                {secondaryupdating ? (
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
                    <Typography gutterBottom variant="h5" component="div">
                      Secondary Address:
                    </Typography>

                    Address Line 1:
                    <Typography gutterBottom variant="h6" component="div">
                      1234 Street Name
                    </Typography>

                    Address Line 2:
                    <Typography gutterBottom variant="h6" component="div">
                      Apt #123
                    </Typography>

                    City:
                    <Typography gutterBottom variant="h6" component="div">
                      East Windsor
                    </Typography>

                    State:
                    <Typography gutterBottom variant="h6" component="div">
                      NJ
                    </Typography>

                    Zip Code:
                    <Typography gutterBottom variant="h6" component="div">
                      08123
                    </Typography>
                  </div>
                )}
                </CardContent>
              
              </CardActionArea>

              <CardActions>
                <Button size="small" onClick={() => setSecondaryUpdating(true)} color="secondary">
                  Update
                </Button>
                <Button size="small" onClick={() => setSecondaryUpdating(false)} color="secondary">
                  Back
                </Button>
              </CardActions>
            
            </Card>
            
          {/* <ProfileInfoCard
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
          /> */}

        </Grid>

      </Grid>

    </MDBox>

  );
}

export default Address;