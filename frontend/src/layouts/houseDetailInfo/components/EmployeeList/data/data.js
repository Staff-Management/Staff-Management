
import * as React from 'react';
import { useState, useEffect } from 'react';

import MDSnackbar from "components/MDSnackbar";

// mui materials
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

function Row(props) {

  const { row, openSuccessSB } = props;
  const [open, setOpen] = React.useState(false);

  return (

    <React.Fragment>

      <TableRow>

        <TableCell align='center'>{row.firstName}</TableCell>
        <TableCell align='center'>{row.tenantEmail}</TableCell>
        <TableCell align='center'>{row.tenantsPhone}</TableCell>
        <TableCell align='center'>{row.preferredName}</TableCell>
        <TableCell align='center'>{row.tenantCar}</TableCell>

      </TableRow>
    </React.Fragment>
  );
}


export default function EmployeeList() {
  const [successSB, setSuccessSB] = useState(false);
  const [listEmployee, setListEmployee] = useState();
  const { landLord } = useParams();
  useEffect(() => {
    getHouseInfo();
  }, [])

  useEffect(() => {
    console.log(listEmployee)
  }, [listEmployee])

  const getHouseInfo = async () => {
    try {
      const res = await fetch(`http://localhost:4000/gethouse/${landLord}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const resp = await res.json();
      setListEmployee(resp.res.list_employee);
    }
    catch (e) {
      alert("Error, refer to the console for details");
      console.log(e)
    }
  }

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

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
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant='h6' align='center'>
                  FirstName
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Preferred Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Car
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
          { listEmployee ? listEmployee.map((row) => (
              <Row key={row._id} row={row} openSuccessSB={openSuccessSB} />
            )):
            <></>  
            }
          </TableBody>
        </Table>
      </TableContainer>
      {renderSuccessSB}
    </React.Fragment>
  );
}
