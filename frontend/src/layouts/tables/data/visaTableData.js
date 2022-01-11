
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
import Link from '@mui/material/Link';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const dateDiff = (exp) => {
  const now = Date.now();
  const exp_date = new Date(exp);
  const diff = Math.floor((exp_date - now) / (1000 * 3600 * 24));
  return diff;
};

const hasRequiredAction = () => {
  return true;
};

const parseWorkAuth = (work_auth) => {
  switch (work_auth) {
    case 'f1':
      return 'F1/OPT';
    case 'h1b':
      return 'H1B';
    case 'l2':
      return 'L2';
    case 'h4':
      return 'H4';
    case 'other':
      return 'Other'
    default:
      return 'Unknown'
  }
};

const decideNextStep = () => {
  return 'Next Step Placeholder'
}

const formatUserData = (user) => {
  return {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    workAuth: parseWorkAuth(user.work_auth_info.work_auth),
    expDate: user.work_auth_info.workAuth_exp,
    dayLeft: dateDiff(user.work_auth_info.workAuth_exp),
    actionRequired: hasRequiredAction(),
    details: [
      {
        name: `${user.firstName} ${user.lastName}`,
        workAuth: parseWorkAuth(user.work_auth_info.work_auth),
        startDate: user.work_auth_info.workAuth_start,
        endDate: user.work_auth_info.workAuth_exp,
        documentReceived: formatFiles(user),
        nextStep: decideNextStep(),
        actionReq: true,
        editable: true,
      },
    ],
  };
};

const field_names = ['opt_receipt', 'opt_ead', 'i983', 'i20', 'opt_stem_receipt', 'opt_stem_ead'];

const formatFiles = (user) => {
  const files = [];
  for (const field_name of field_names) {
    if (user[field_name] && user[`${field_name}_filename`]) {
      fetchFileSrc(user.email, field_name).then(res => {
        files.push(
          <Link href={res} download={user[`${field_name}_filename`]} underline="hover" >
            <Typography variant='body' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
              {field_name}
              <FileDownloadIcon color='info' />
            </Typography>
          </Link>
        )
      });
    }
  }
  return files;
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

function Row(props) {
  const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'a@a.com';

  const { row, openSuccessSB } = props;
  const [open, setOpen] = React.useState(false);

  const sendNotification = async (to_email) => {
    const message = `Your next step is: {placeholder}`
    try {
      const res = await fetch('http://localhost:4000/sendnotification', {
        method: 'POST',
        body: JSON.stringify({ from_email: email, to_email, message }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.status === 200) {
        openSuccessSB();
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

        <TableCell align='center'>{row.name}</TableCell>
        <TableCell align='center'>{row.email}</TableCell>
        <TableCell align='center'>{row.workAuth}</TableCell>
        <TableCell align='center'>{row.expDate}</TableCell>
        <TableCell align='center'>{row.dayLeft}</TableCell>
        <TableCell align='center'>
          <Button variant='outlined' disabled={!row.actionRequired} endIcon={<SendIcon />} onClick={() => sendNotification(row.email)}>
            Send Notification
          </Button>
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
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant='h6' align='center'>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h6' align='center'>
                        Work Authorization
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h6' align='center'>
                        Start Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h6' align='center'>
                        End Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h6' align='center'>
                        Documents Received
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h6' align='center'>
                        Next Step
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h6' align='center'>
                        Action Required
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  {row.details.map((detailRow) => (
                    <TableRow key={detailRow}>
                      <TableCell align='center'>{detailRow.name}</TableCell>
                      <TableCell align='center'>{detailRow.workAuth}</TableCell>
                      <TableCell align='center'>{detailRow.startDate}</TableCell>
                      <TableCell align='center'>{detailRow.endDate}</TableCell>
                      <TableCell align='center'>
                        {detailRow.documentReceived ?
                          detailRow.documentReceived.map((component, index) => (
                            <React.Fragment key={index}>
                              {component}
                            </React.Fragment>
                          ))
                          :
                          <></>
                        }
                      </TableCell>
                      <TableCell align='center'>{detailRow.nextStep}</TableCell>
                      <TableCell align='center'>
                        <Button variant='outlined' disabled={!detailRow.actionReq} endIcon={<SendIcon />} onClick={() => sendNotification(row.email)}>
                          Send Notification
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    workAuth: PropTypes.string.isRequired,
    dayLeft: PropTypes.number.isRequired,
    expDate: PropTypes.string.isRequired,
    detailRow: PropTypes.objectOf(
      PropTypes.shape({
        workAuth: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        documentReceived: PropTypes.array.isRequired,
        nextStep: PropTypes.string.isRequired,
        actionReq: PropTypes.bool.isRequired,
      }),
    ),
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
                  Name (Legal Name)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Work Authorization
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Expiration Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Day Left
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' align='center'>
                  Action Required
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          {/* </TableHead> */}
          <TableBody>
            {rows ?
              rows.map((row) => (
                <Row key={row.email} row={row} openSuccessSB={openSuccessSB} />
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
