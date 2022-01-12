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

function Employment() {

  let email = useSelector(selectEmail)
  email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
  const [values, setValues] = useState({
    work_auth: "",
    opt_type: "",
    other_work_auth: "",
    workAuth_start: "",
    workAuth_exp: ""
  });

  useEffect(() => {

    fetchWork();

  }, []);

  const fetchWork = async () => {
    try {
      const res = await fetch('http://localhost:4000/getWork', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      setValues(response.user.work_auth_info);
    } catch (err) {
      console.log(err)
    }
  }

  const classes = useStyles();

  const [editing, setEditing] = useState({
    work_auth: "",
    opt_type: "",
    other_work_auth: "",
    workAuth_start: "",
    workAuth_exp: ""
  });

  // controlls the mode   
  const [editingMode, setEditingMode] = useState(false);

  const handleEditChange = (e) => {
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    })
  };

  const updateWork = async (e) => {
    try {
      console.log(editing);
      let update_info = editing;
      for (const key in update_info) {
        if (update_info[key] === "") {
          delete update_info[key];
        }
      }
      const res = await fetch('http://localhost:4000/updateWork', {
        method: 'POST',
        body: JSON.stringify({ email, ...update_info }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      fetchWork();
    }
    catch (err) {
      alert('Error');
      console.log(err);
    }
    setEditingMode(false);
  };

  // this.state = {
  //     opened: false
  // };

  return (

    <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <MDBox mb={3}>

            <Typography variant="h6" gutterBottom sx={{ marginTop: '50px', backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
              Employment Section
            </Typography>

            <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
              <CardActionArea>
                <CardContent>
                  {editingMode ? (
                    <div>
                      <div>
                        <TextField
                          label="Update Work Authorization"
                          id="work_auth"
                          name="work_auth"
                          defaultValue="Work Authorization"
                          sx={{ width: 250 }}
                          onChange={handleEditChange}
                        />
                      </div>
                      <br />
                      <div>
                        <TextField
                          label="Update OPT Type"
                          id="opt_type"
                          name="opt_type"
                          defaultValue="OPT Type"
                          sx={{ width: 250 }}
                          onChange={handleEditChange}
                        />
                      </div>
                      <br />
                      <div>
                        <TextField
                          label="Update Other Work Authorization"
                          id="other_work_auth"
                          name="other_work_auth"
                          defaultValue="Other Work Authorization"
                          sx={{ width: 250 }}
                          onChange={handleEditChange}
                        />
                      </div>
                      <br />
                      <div>
                        <TextField
                          id="workAuth_start"
                          name="workAuth_start"
                          label="Update Work Authorization Start Date"
                          type="date"
                          defaultValue="yyyy-MM-dd"
                          sx={{ width: 250 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleEditChange}
                        />
                      </div>
                      <br />
                      <div>
                        <TextField
                          id="workAuth_exp"
                          name='workAuth_exp'
                          label="Update Work Authorization End Date"
                          type="date"
                          defaultValue="yyyy-MM-dd"
                          sx={{ width: 250 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleEditChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>

                      Work Authorization:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.work_auth}
                      </Typography>

                      OPT Type:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.opt_type ?
                          values.opt_type
                          :
                          'N/A'
                        }
                      </Typography>

                      Other Work Authorization:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.other_work_auth ?
                          values.other_work_auth
                          :
                          'N/A'
                        }
                      </Typography>

                      Work Authorization Start:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.workAuth_start}
                      </Typography>

                      Work Authorization End:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.workAuth_exp}
                      </Typography>

                      {/* Employment Start:
                                            <Typography gutterBottom variant="h6" component="div">
                                                05 March 2020
                                            </Typography>

                                            Employment End:
                                            <Typography gutterBottom variant="h6" component="div">
                                                10 May 2022
                                            </Typography>

                                            Job Title:
                                            <Typography gutterBottom variant="h6" component="div">
                                                Data Analyst
                                            </Typography> */}
                    </div>
                  )}
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                  Edit
                </Button>
                <Button size="small" onClick={() => updateWork()} color="secondary">
                  Update
                </Button>
              </CardActions>

              {/* {(() => {
                                    if (this.state == 'Edit'){
                                        return (
                                            <CardActions>
                                                <Button id='Edit' name='Edit' size="small" onClick={() => setEditingMode(true)} color="secondary">
                                                    Edit
                                                </Button>
                                            </CardActions>
                                        )
                                    } else {
                                        return (
                                            <CardActions>
                                                <Button id='Update' name='Update' size="small" onClick={() => updateWork()} color="secondary">
                                                    Update
                                                </Button>
                                            </CardActions>
                                        )
                                    }
                                })} */}

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

export default Employment;