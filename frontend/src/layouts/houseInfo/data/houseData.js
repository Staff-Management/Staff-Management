
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import MDSnackbar from "components/MDSnackbar";

// mui materials
import Box from '@mui/material/Box';
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
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



function Row(props) {
  const navigate = useNavigate();
  const { row, openSuccessSB } = props;
  const [open, setOpen] = React.useState(false);
  const { landLord } = useParams();

  return (

    <React.Fragment>
      <TableRow>

        <TableCell align='center'>{row.landLord}</TableCell>
        <TableCell align='center'>{row.landlordEmail}</TableCell>
        <TableCell align='center'>{row.landLordPhone}</TableCell>
        <TableCell align='center'>{row.address1}</TableCell>
        <TableCell align='center'>{row.list_employee.length}</TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => navigate(`/housedetail/${row.landLord}`)}
            >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [successSB, setSuccessSB] = useState(false);
  const [response, setResponse] = useState();

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  useEffect(() => {
    // setResponse(houseInfo());
    houseInfo();
    console.log(response);
  }, [])

  useEffect(() => {
    // setResponse(houseInfo());
    console.log(response);
  }, [response])

  const houseInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/gethouseinfo', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const resp = await res.json();
      setResponse(resp.res);
      // console.log(response)
      // return response
    }
    catch (e) {
      alert("Error, refer to the console for details");
      // console.log(e)
      // return e
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
                  Landlord Name
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
                  Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Number of Employees
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          {/* </TableHead> */}
          <TableBody>
            { response ? response.map((row) => (
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
