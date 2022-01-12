
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";

// mui materials
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const formatUserData = (user) => {
  return {
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    email: user.email,
    actionRequired: user.application_approved === true,
    application: displayApplication(user)
  };
};

const formatFile = (user, field_name) => {
  if (user[field_name] && user[`${field_name}_filename`]) {
    return fetchFileSrc(user.email, field_name).then(res => {
      return (
        <Link href={res} download={user[`${field_name}_filename`]} underline="hover" >
          <Typography variant='body' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
            {field_name}
            <FileDownloadIcon color='info' />
          </Typography>
        </Link>
      )
    });
  }
};

const fetchFileSrc = async (email, field_name) => {
  try {
    const res = await fetch('http://localhost:4000/getfile', {
      method: 'POST',
      body: JSON.stringify({ email, field_name }),
      headers: { 'Content-Type': 'application/json' }
    });
    const response = await res.json();
    return response.data;
  } catch (err) {
    console.log(err)
  }
};

const display_dl = (user) => {
  return (
    user.driverLicense_own === 'yes' ?
      <React.Fragment>
        <Grid item xs={6}>
          <Typography gutterBottom>Own Driver License:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Yes</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Driver License Number:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{user.dl_info.driverLicense_num}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Driver License Expiration Date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{user.dl_info.driverLicense_exp}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Driver License File:</Typography>
        </Grid>
        <Grid item xs={6}>
        </Grid>
      </React.Fragment>
      :
      <React.Fragment>
        <Grid item xs={6}>
          <Typography gutterBottom>Own Driver License:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>No</Typography>
        </Grid>
      </React.Fragment>
  )
};

const display_visa = (user) => {
  return (
    user.perm_citizen === 'yes' ?
      <React.Fragment>
        <Grid item xs={6}>
          <Typography gutterBottom>Perm-Residence/Citizen:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Yes</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Status:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{user.green_card_citizen}</Typography>
        </Grid>
      </React.Fragment>
      :
      <React.Fragment>
        <Grid item xs={6}>
          <Typography gutterBottom>Perm-Residence/Citizen:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>No</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Work Authrization:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{user.work_auth_info.work_auth === 'other' ? user.work_auth_info.other_work_auth : user.work_auth_info.work_auth}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Work Auth Start Date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{user.work_auth_info.workAuth_start}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Work Auth Expr Date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{user.work_auth_info.workAuth_exp}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Work Auth File:</Typography>
        </Grid>
        <Grid item xs={6}>
        </Grid>

      </React.Fragment>
  )
};

const displayApplication = (user) => {
  return (
    <Grid container spacing={2}>
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          Personal Info
        </Typography>
        <Grid container>

          <Grid item xs={6}>
            <Typography gutterBottom>First name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.firstName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom>Middle name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.middleName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom>Last name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.lastName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom>Preferred name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.preferredName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom>Date of birth:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.birthday}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom>Gender:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.gender}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom>Social Security Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ssn}</Typography>
          </Grid>
          {display_dl(user)}
          {display_visa(user)}
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          Reference
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref First Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_firstname}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref Middle Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_middlename}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref Last Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_lastname}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref Phone Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_email}</Typography>
          </Grid><Grid item xs={6}>
            <Typography gutterBottom>Ref Address:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_address1}</Typography>
          </Grid><Grid item xs={6}>
            <Typography gutterBottom>Ref City:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_city}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref State:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_state}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref Zip Code:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_zip}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ref Country:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_country}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Relationship:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.ref_info.ref_relationship}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          Vehicle Info
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography gutterBottom>Vehicle Maker:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.car_info.vehicle_maker}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Vehicle Model:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.car_info.vehicle_model}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Vehicle Color:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.car_info.vehicle_color}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          Contact Info
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography gutterBottom>Email:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Phone Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.cell_phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Work Phone Number:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.work_phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Address Line 1:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.address_info.address1}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Address Line 2:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.address_info.address2}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>City:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.address_info.city}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>State:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.address_info.state}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Zip Code:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.address_info.zip}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Country:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{user.address_info.country}</Typography>
          </Grid>
        </Grid>
        {user.emergency_contact_info.map((contact, index) => (
          <React.Fragment key={index}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Emergency Contact {index + 1}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography gutterBottom>First Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{contact.em_firstname}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Middle Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{contact.em_middlename}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Last Name:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{contact.em_lastname}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Phone Number:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{contact.em_phone}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Email:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{contact.em_email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Relationship:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{contact.em_relationship}</Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

function Row(props) {
  const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com';

  const { row, openSuccessSB } = props;
  const [open, setOpen] = React.useState(false);

  const sendNotification = async (to_email, approved) => {
    const message = approved ? 'Your application is approved!' : 'Your application is rejected!';
    try {
      const res = await fetch('http://localhost:4000/sendnotification', {
        method: 'POST',
        body: JSON.stringify({ from_email: email, to_email, message }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.status === 200) {
        openSuccessSB();
        props.fetchUser();
      }
    }
    catch (e) {
      alert("Error, refer to the console for details");
      console.log(e);
    }
  }

  return (

    <React.Fragment>
      <TableRow>
        <TableCell align='center'>{row.firstName}</TableCell>
        <TableCell align='center'>{row.middleName}</TableCell>
        <TableCell align='center'>{row.lastName}</TableCell>
        <TableCell align='center'>{row.email}</TableCell>
        <TableCell align='center'>
          <Button disabled={row.actionRequired} variant='outlined' sx={{ mr: 2 }} endIcon={<SendIcon />} onClick={() => sendNotification(row.email, true)}>
            Approve
          </Button>
          <MDButton disabled={row.actionRequired} variant='outlined' color='error' endIcon={<SendIcon />} onClick={() => sendNotification(row.email, false)}>
            Reject
          </MDButton>
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h2" gutterBottom component="div">
                Application:
              </Typography>
              {row.application}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    actionRequired: PropTypes.bool.isRequired,
    application: PropTypes.object.isRequired
  }).isRequired,
};

export default function CollapsibleTable() {
  const [successSB, setSuccessSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/getemployees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await res.json();
      setRows([]);
      for (const user of response.users) {
        setRows(prevState => [...prevState, formatUserData(user)]);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Notification Sent"
      content="Notification is successfully sent!"
      dateTime="Just Now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          {/* <TableHead> */}
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant='h6' align='center'>
                  First Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Middle Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Last Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          {/* </TableHead> */}
          <TableBody>
            {rows ?
              rows.map((row) => (
                <Row key={row.email} row={row} openSuccessSB={openSuccessSB} fetchUser={fetchUser} />
              ))
              :
              <></>
            }
          </TableBody>
        </Table>
      </TableContainer>
      {renderSuccessSB}
    </React.Fragment>
  );
}
