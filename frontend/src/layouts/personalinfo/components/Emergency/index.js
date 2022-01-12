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

const formatContactData = (contact) => {
  return {
    id: contact._id,
    firstName: contact.em_firstname,
    middleName: contact.em_middlename,
    lastName: contact.em_lastname,
    phone: contact.em_phone,
    email: contact.em_email,
    relationship: contact.em_relationship,
  };
};

function Emergency() {

  // let email = useSelector(selectEmail)
  const classes = useStyles();
  const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com';
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState({});
  const [editingMode, setEditingMode] = useState(false);

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
      setRows([]);
      for (const contact of response.contacts) {
        setRows(prevState => [...prevState, formatContactData(contact)]);
        setEditing({
          ...editing,
          [contact._id]: {
            em_firstname: "",
            em_middlename: "",
            em_lastname: "",
            em_phone: "",
            em_email: "",
            em_relationship: ""
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditChange = (event, id) => {
    setEditing({
      ...editing,
      [id]: {
        ...editing[id],
        [event.target.name]: event.target.value
      }
    })
  };

  const updateEmergencyContact = async (e) => {
    try {
      let update_info = editing;
      for (const id in update_info) {
        for (const key in update_info[id]) {
          if (update_info[id][key] === "") {
            delete update_info[id][key];
          }
        }
        const res = await fetch('http://localhost:4000/updateEmContact', {
          method: 'POST',
          body: JSON.stringify({ id, ...update_info[id] }),
          headers: { 'Content-Type': 'application/json' }
        })
        const response = await res.json();
      }
      fetchEmContact();
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
            <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1600 }}>
              <CardActionArea>
                <CardContent>
                  {editingMode ?
                    rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" align="center" scope="row">
                          <TextField
                            label="Update First Name"
                            id="em_firstname"
                            name="em_firstname"
                            defaultValue={row.firstName}
                            size="small"
                            onChange={(event) => handleEditChange(event, row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            label="Update Middle Name"
                            id="em_middlename"
                            name="em_middlename"
                            defaultValue={row.middleName}
                            size="small"
                            onChange={(event) => handleEditChange(event, row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            label="Update Last Name"
                            id="em_lastname"
                            name="em_lastname"
                            defaultValue={row.lastName}
                            size="small"
                            onChange={(event) => handleEditChange(event, row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            label="Update Phone"
                            id="em_phone"
                            name="em_phone"
                            defaultValue={row.phone}
                            size="small"
                            onChange={(event) => handleEditChange(event, row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            label="Update Email"
                            id="em_email"
                            name="em_email"
                            defaultValue={row.email}
                            size="small"
                            onChange={(event) => handleEditChange(event, row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            label="Update Relationship"
                            id="em_relationship"
                            name="em_relationship"
                            defaultValue={row.relationship}
                            size="small"
                            onChange={(event) => handleEditChange(event, row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                    :
                    (
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                          <TableBody>
                            <TableRow>
                              <TableCell align="center" name="firstName">
                                <Typography variant='h6'>
                                  First Name
                                </Typography>
                              </TableCell>
                              <TableCell align="center" name="middleName">
                                <Typography variant='h6'>
                                  Middle Name
                                </Typography>
                              </TableCell>
                              <TableCell align="center" name="lastName">
                                <Typography variant='h6'>
                                  Last Name
                                </Typography>
                              </TableCell>
                              <TableCell align="center" name="phone">
                                <Typography variant='h6'>
                                  Phone
                                </Typography>
                              </TableCell>
                              <TableCell align="center" name="email">
                                <Typography variant='h6'>
                                  Email
                                </Typography>
                              </TableCell>
                              <TableCell align="center" name="relationship">
                                <Typography variant='h6'>
                                  Relationship
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" align="center" scope="row">{row.firstName}</TableCell>
                                <TableCell align="center">{row.middleName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.relationship}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" onClick={() => setEditingMode(true)} color="secondary">
                  Edit
                </Button>
                <Button size="small" onClick={() => updateEmergencyContact()} color="secondary">
                  Update
                </Button>
              </CardActions>
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  )
}

export default Emergency;