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

function Emergency() {

    
    let email = useSelector(selectEmail)
    email = email ? email : (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com');
    const [values, setValues] = useState({});
    
    useEffect(() => {
        fetchUser();
    }, []);
    
    const fetchUser = async () => {
        try {
          const res = await fetch('http://localhost:4000/updateRef', {
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
        em_firstname: "",
        em_middlename: "",
        em_lastname: "",
        em_phone: "",
        em_email: "",
        em_relationship: ""
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
                    
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '0px', backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Emergency Contact Section
                    </Typography>

                    <MDBox mb={1.5}>
                        
                        <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>
                                    {editing ? (
                                        <div>
                                            <div>
                                            <TextField
                                                label="Update First Name"
                                                id="em_firstname"
                                                name="em_firstname"
                                                defaultValue="First Name"
                                                size="small"
                                                onChange={handleEditChange}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Middle Name"
                                                id="em_middlename"
                                                name="em_middlename"
                                                defaultValue="Middle Name"
                                                size="small"
                                                onChange={handleEditChange}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Last Name"
                                                id="em_lastname"
                                                name="em_lastname"
                                                defaultValue="Last Name"
                                                size="small"
                                                onChange={handleEditChange}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Phone"
                                                id="em_phone"
                                                name="em_phone"
                                                defaultValue="Phone"
                                                size="small"
                                                onChange={handleEditChange}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Email"
                                                id="em_email"
                                                name="em_email"
                                                defaultValue="Email"
                                                size="small"
                                                onChange={handleEditChange}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Relationship"
                                                id="em_relationship"
                                                name="em_relationship"
                                                defaultValue="Relationship"
                                                size="small"
                                                onChange={handleEditChange}
                                            />
                                            </div>
                                        </div>                
                                    ) : (
                                    <div>
                                    First Name:
                                    <Typography gutterBottom variant="h6" component="div">
                                        {values.em_firstname}
                                    </Typography>

                                    Middle Name:
                                    <Typography gutterBottom variant="h6" component="div">
                                        {values.em_middlename}
                                    </Typography>

                                    Last Name:
                                    <Typography gutterBottom variant="h6" component="div">
                                        {values.em_lastname}
                                    </Typography>
                                    
                                    Phone:
                                    <Typography gutterBottom variant="h6" component="div">
                                        {values.em_phone}
                                    </Typography>

                                    Email:
                                    <Typography gutterBottom variant="h6" component="div">
                                        {values.em_email}
                                    </Typography>

                                    Relationship:
                                    <Typography gutterBottom variant="h6" component="div">
                                        {values.em_relationship}
                                    </Typography>
                                    </div>
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
                            title="Emergency Contact Information"
                            info={{
                            fullName: "John Doe",
                            phone: "(111) 111 - 1111",
                            address: "1234 Street Name Philadelphia, PA 07012",
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

export default Emergency;