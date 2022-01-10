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

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions, CardHeader } from '@mui/material';


function Address() {

  return (

    <MDBox>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
        Address Section
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
              <CardContent>

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
                
              </CardContent>
            </CardActionArea>

            <CardHeader
            action = {
              <Button size="small" color="secondary">
                Edit
              </Button>
            }
            />

          </Card>

        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ maxWidth: 500 }}>
              <CardActionArea>
                <CardContent>

                  <Typography gutterBottom variant="h5" component="div">
                    Secondary Address:
                  </Typography>

                  Address Line 1:
                  <Typography gutterBottom variant="h6" component="div">
                    4444 Street Name
                  </Typography>

                  Address Line 2:
                  <Typography gutterBottom variant="h6" component="div">
                    Apt #666
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
                  
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" color="secondary">
                  Edit
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