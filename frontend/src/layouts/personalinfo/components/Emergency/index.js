import React, { useEffect, useState } from 'react';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    
    // let email = useSelector(selectEmail)
    const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com';
    const [values, setValues] = useState({
        em_firstname: "",
        em_middlename: "",
        em_lastname: "",
        em_phone: "",
        em_email: "",
        em_relationship: ""
    });
    
    useEffect(() => {
        fetchEmContact();
    }, []);
    
    const fetchEmContact = async () => {
        try {
          const res = await fetch('http://localhost:4000/getEmergencyContact', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
          })
          const response = await res.json();
          setValues(response.user.emergency_contact_info);
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
    
    // const updateEmergencyContact = async (e) => {
    //   try {
    //     console.log(editing);
    //     let update_info = editing;
    //     for (const key in update_info) {
    //       if (update_info[key] === "") {
    //         delete update_info[key];
    //       }
    //     }
    //     const res = await fetch('http://localhost:4000/updateRef', {
    //       method: 'POST',
    //       body: JSON.stringify({ email, ...update_info }),
    //       headers: { 'Content-Type': 'application/json' }
    //     })
    //     const response = await res.json();
    //     fetchEmContact();
    //   }
    //   catch (err) {
    //     alert('Error');
    //     console.log(err);
    //   }
    //   setEditingMode(false);
    // };

    function createData(em_firstname, em_middlename, em_lastname, em_phone, em_email, em_relationship) {
        return { em_firstname, em_middlename, em_lastname, em_phone, em_email, em_relationship };
    }
      
    const rows = [
        createData('First Name', "")
    ];

    return (

        <MDBox>

            <Grid container spacing={3}>

                <Grid item xs={12} md={12} lg={12}>
                    
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '0px', backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Emergency Contact Section
                    </Typography>

                    <MDBox mb={1.5}>
                        
                        <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1600 }}>
                                <CardActionArea>
                                    <CardContent>
                                    {editingMode ? (
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
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                                            <TableBody>
                                            <TableRow>
                                                <TableCell name="firstName">First Name</TableCell>
                                                <TableCell name="middleName" align="right">Middle Name</TableCell>
                                                <TableCell name="lastName" align="right">Last Name</TableCell>
                                                <TableCell name="phone" align="right">Phone</TableCell>
                                                <TableCell name="email" align="right">Email</TableCell>
                                                <TableCell name="relationship" align="right">Relationship</TableCell>
                                            </TableRow>
                                            </TableBody>
                                            <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                key={row.name}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.em_firstname}</TableCell>
                                                <TableCell align="center">{row.em_middlename}</TableCell>
                                                <TableCell align="center">{row.em_lastname}</TableCell>
                                                <TableCell align="center">{row.em_phone}</TableCell>
                                                <TableCell align="center">{row.em_email}</TableCell>
                                                <TableCell align="center">{row.em_relationship}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
{/*                         
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
                                    </Typography> */}
                                    </div>
                                    )}
                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                                        Edit
                                    </Button>
                                    {/* <Button size="small" onClick={() => updateEmergencyContact()} color="secondary">
                                        Update
                                    </Button> */}
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