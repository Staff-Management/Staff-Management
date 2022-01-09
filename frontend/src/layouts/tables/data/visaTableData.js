
import * as React from 'react';
import { useState } from 'react';
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
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createZackData(name, email, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
    email,
    workAuth,
    expDate,
    dayLeft,
    actionRequired,
    details: [
      {
        name: 'Zack Yu',
        visa: 'F1/OPT',
        startDate: '3/24/2019',
        endDate: '3/25/2020',
        documentReceived: [
          '(ICON) OPT STEM Receipt_3/20/2020',
          '(ICON) I-20_2/1/2020',
          '(ICON) I-983_1/25/2020',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification',
        editable: true,
      },
    ],
  };
}

function createKikiData(name, email, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
    email,
    workAuth,
    expDate,
    dayLeft,
    actionRequired,
    details: [
      {
        name: 'Kiki Liu',
        visa: 'F1/OPT',
        startDate: '3/24/2020',
        endDate: '3/25/2021',
        documentReceived: [
          '(ICON) OPT STEM Receipt_3/20/2020',
          '(ICON) I-20_2/1/2020',
          '(ICON) I-983_1/25/2020',
          '(ICON) OPT EAD_11/20/2019'
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification'
      },
    ],
  };
}

function createAnthonyData(name, email, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
    email,
    workAuth,
    expDate,
    dayLeft,
    actionRequired,
    details: [
      {
        name: 'Anthony Wang',
        visa: 'F1/OPT',
        startDate: '6/24/2020',
        endDate: '8/25/2021',
        documentReceived: [
          '(ICON) OPT STEM Receipt_3/20/2020',
          '(ICON) I-20_2/1/2020',
          '(ICON) I-983_1/25/2020',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification'
      },
    ],
  };
}

function createSteveData(name, email, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
    email,
    workAuth,
    expDate,
    dayLeft,
    actionRequired,
    details: [
      {
        name: 'Steve Whong',
        visa: 'F1/OPT',
        startDate: '1/4/2020',
        endDate: '5/5/2021',
        documentReceived: [
          '(ICON) OPT STEM Receipt_3/20/2020',
          '(ICON) I-20_2/1/2020',
          '(ICON) I-983_1/25/2020',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification',
      },
    ],
  };
}

function createKevinData(name, email, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
    email,
    workAuth,
    expDate,
    dayLeft,
    actionRequired,
    details: [
      {
        name: 'Kevin Liu',
        visa: 'F1/OPT',
        startDate: '12/4/2020',
        endDate: '1/20/2021',
        documentReceived: [
          '(ICON) OPT STEM Receipt_3/20/2020',
          '(ICON) I-20_2/1/2020',
          '(ICON) I-983_1/25/2020',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification'
      },
    ],
  };
}

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
                        Visa
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
                      <TableCell align='center'>
                        {detailRow.name}
                      </TableCell>
                      <TableCell align='center'>{detailRow.visa}</TableCell>
                      <TableCell align='center'>{detailRow.startDate}</TableCell>
                      <TableCell align='center'>{detailRow.endDate}</TableCell>
                      <TableCell align='center'>
                        {detailRow.documentReceived.map((doc, index) => (
                          <React.Fragment key={index}>
                            {doc}
                            <br />
                          </React.Fragment>
                        ))}
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
    history: PropTypes.arrayOf(
      PropTypes.shape({
        visa: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        documentReceived: PropTypes.string.isRequired,
        nextStep: PropTypes.string.isRequired,
        actionReq: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

const rows1 = [
  createZackData('Zack', 'a@a.com', 'F1/OPT', '3/25/2020', 10, 'Send Notification'),
  createKikiData('Kiki', 'a@a.com', 'F1/OPT', '5/25/2020', 61, 'Send Notification'),
  createAnthonyData('Anthony', 'b@b.com', 'F1/OPT', '6/21/2020', 41, 'Send Notification'),
  createSteveData('Steve', 'b@b.com', 'F1/OPT', '6/16/2020', 66, 'Send Notification'),
  createKevinData('Kevin', 'c@c.com', 'F1/OPT', '8/18/2020', 88, 'Send Notification'),
];

export default function CollapsibleTable() {
  const [successSB, setSuccessSB] = useState(false);

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
            {rows1.map((row) => (
              <Row key={row.name} row={row} openSuccessSB={openSuccessSB} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderSuccessSB}
    </React.Fragment>
  );
}
