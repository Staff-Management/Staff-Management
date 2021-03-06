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

function Vehicle() {

  let email = useSelector(selectEmail)
  email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
  const [values, setValues] = useState({
    vehicle_maker: "",
    vehicle_model: "",
    vehicle_color: ""
  });

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    try {
      const res = await fetch('http://localhost:4000/getVehicle', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      setValues(response.user.car_info);
    } catch (err) {
      console.log(err)
    }
  }

  const classes = useStyles();

  const [editing, setEditing] = useState({
    vehicle_maker: "",
    vehicle_model: "",
    vehicle_color: ""
  });

  // controlls the mode   
  const [editingMode, setEditingMode] = useState(false);

  const handleEditChange = (e) => {
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    })
  };

  const updateCar = async (e) => {
    try {
      console.log(editing);
      let update_info = editing;
      for (const key in update_info) {
        if (update_info[key] === "") {
          delete update_info[key];
        }
      }
      const res = await fetch('http://localhost:4000/updateCar', {
        method: 'POST',
        body: JSON.stringify({ email, ...update_info }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      fetchCar();
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
          <MDBox mb={3}>

            <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
              Vehicle Section
            </Typography>

            <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
              <CardActionArea>
                <CardContent>
                  {editingMode ? (
                    <React.Fragment>
                      <TextField
                        label="Update Vehicle Maker"
                        id="vehicle_maker"
                        name="vehicle_maker"
                        defaultValue={values.vehicle_maker}
                        sx={{ width: 250, mt: 2, mb: 2 }}
                        onChange={handleEditChange}
                      />
                      <br />
                      <TextField
                        label="Update Vehicle Model"
                        id="vehicle_model"
                        name="vehicle_model"
                        defaultValue={values.vehicle_model}
                        sx={{ width: 250, mb: 2 }}
                        onChange={handleEditChange}
                      />
                      <br />
                      <TextField
                        label="Update Vehicle Color"
                        id="vehicle_color"
                        name="vehicle_color"
                        defaultValue={values.vehicle_color}
                        sx={{ width: 250, mb: 2 }}
                        onChange={handleEditChange}
                      />
                    </React.Fragment>

                  ) : (
                    <React.Fragment>
                      Vehicle Maker:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.vehicle_maker}
                      </Typography>

                      Vehicle Model:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.vehicle_model}
                      </Typography>

                      Vehicle Color:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.vehicle_color}
                      </Typography>
                    </React.Fragment>
                  )}
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                  Edit
                </Button>
                <Button size="small" onClick={() => updateCar()} color="secondary">
                  Update
                </Button>
              </CardActions>

            </Card>

            {/* <ProfileInfoCard
                                title="Employment Information"
                                info={{
                                workAuthorization: "US Citizen",
                                authorizedStart: "03 March 2020",
                                authorizedEnd: "05 May 2022",
                                employmentStart: "05 March 2020",
                                employmentEnd: "10 May 2022",
                                jobTitle: "Data Analyst",
                                }}
                                social={[
                                {
                                link: "https://github.com/Staff-Management",
                                icon: <GitHubIcon />,
                                color: "github",
                                },
                                ]}
                                action={{ route: "", tooltip: "Edit Profile" }}
                            /> */}

          </MDBox>
        </Grid>
      </Grid>
    </MDBox>

  )
}

export default Vehicle;