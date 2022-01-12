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

function Contact() {

  let email = useSelector(selectEmail)
  email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
  const [values, setValues] = useState({
    cell_phone: "",
    work_phone: "",
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch('http://localhost:4000/getContact', {
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
    cell_phone: "",
    work_phone: "",
  });

  // designs the mode 
  const [editingMode, setEditingMode] = useState(false);

  const handleEditChange = (e) => {
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    })
  };


  const updateContact = async (e) => {
    try {
      console.log(editing);
      let update_info = editing;
      for (const key in update_info) {
        if (update_info[key] === "") {
          delete update_info[key];
        }
      }
      const res = await fetch('http://localhost:4000/updateContact', {
        method: 'POST',
        body: JSON.stringify({ email, ...update_info }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      fetchContact();
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
            <Typography variant="h6" gutterBottom sx={{ marginTop: '50px', backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
              Contact Section
            </Typography>

            <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
              <CardActionArea>
                <CardContent>
                  {editingMode ? (
                    <React.Fragment>
                      <TextField
                        label="Update Cell Phone"
                        id="cell_phone"
                        name="cell_phone"
                        defaultValue={values.cell_phone}
                        size="small"
                        sx={{ mt: 2, mb: 2 }}
                        onChange={handleEditChange}
                      />
                      <br />
                      <TextField
                        label="Update Work Phone"
                        id="work_phone"
                        name='work_phone'
                        defaultValue={values.work_phone}
                        size="small"
                        sx={{ mb: 2 }}
                        onChange={handleEditChange}
                      />
                    </React.Fragment>
                  ) : (
                    <div>
                      Email:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.email}
                      </Typography>

                      Cell Phone:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.cell_phone}
                      </Typography>

                      Work Phone:
                      <Typography gutterBottom variant="h6" component="div">
                        {values.work_phone}
                      </Typography>
                    </div>
                  )}
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                  Edit
                </Button>
                <Button size="small" onClick={() => updateContact()} color="secondary">
                  Update
                </Button>
              </CardActions>
            </Card>

            {/* <ProfileInfoCard
                            title="Contact Information"
                            info={{
                            personalEmail: "lexi.thompson@gmail.com",
                            workEmail: "athompson@companyName.com",
                            cellPhone: "(111) 111 - 1111",
                            workPhone: "(222) 222 - 2222",
                            }}
                            social={[
                                {
                                    link: "https://www.wechat.com/",
                                    icon: <ForumIcon />,
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

export default Contact;