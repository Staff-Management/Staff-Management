
import * as React from 'react';
import PropTypes from 'prop-types';

// mui materials
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createZackData(name, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
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
          '(ICON) OPT STEM Receipt_3/20/2020, ',
          '(ICON) I-20_2/1/2020, ',
          '(ICON) I-983_1/25/2020, ',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification',
        editable: true,
      },
    ],
  };
}

function createKikiData(name, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
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
          '(ICON) OPT STEM Receipt_3/20/2020, ',
          '(ICON) I-20_2/1/2020, ',
          '(ICON) I-983_1/25/2020, ',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification'
      },
    ],
  };
}

function createAnthonyData(name, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
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
          '(ICON) OPT STEM Receipt_3/20/2020, ',
          '(ICON) I-20_2/1/2020, ',
          '(ICON) I-983_1/25/2020, ',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification'
      },
    ],
  };
}

function createSteveData(name, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
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
          '(ICON) OPT STEM Receipt_3/20/2020, ',
          '(ICON) I-20_2/1/2020, ',
          '(ICON) I-983_1/25/2020, ',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification',
      },
    ],
  };
}

function createKevinData(name, workAuth, expDate, dayLeft, actionRequired) {
  return {
    name,
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
          '(ICON) OPT STEM Receipt_3/20/2020, ',
          '(ICON) I-20_2/1/2020, ',
          '(ICON) I-983_1/25/2020, ',
          '(ICON) OPT EAD_11/20/2019 '
        ],
        nextStep: 'OPT STEM EAD',
        actionReq: 'Send Notification'
      },
    ],
  };
}

function Row(props) {
  
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (

    <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>

        <TableCell align="left">{row.workAuth}</TableCell>
        <TableCell align="left">{row.expDate}</TableCell>
        <TableCell align="left">{row.dayLeft}</TableCell>
        <TableCell align="left">{row.actionRequired}</TableCell>

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
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Visa</TableCell>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">End Date</TableCell>
                    <TableCell align="left">Document Received</TableCell>
                    <TableCell align="left">Next Step</TableCell>
                    <TableCell align="left">Action Required</TableCell>
                  </TableRow>
                  <TableBody>
                    {row.details.map((detailRow) => (
                      <TableRow key={detailRow.date}>
                        <TableCell component="th" scope="row">
                          {detailRow.name}
                        </TableCell>
                        <TableCell>{detailRow.visa}</TableCell>
                        <TableCell align="left">{detailRow.startDate}</TableCell>
                        <TableCell align="left">{detailRow.endDate}</TableCell>
                        <TableCell align="left">{detailRow.documentReceived}</TableCell>
                        <TableCell align="left">{detailRow.nextStep}</TableCell>
                        <TableCell align="left">{detailRow.actionReq}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableHead>
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
    workAuth: PropTypes.string.isRequired,
    dayLeft: PropTypes.number.isRequired,
    expDate: PropTypes.number.isRequired,
    editable: true,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        visa: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        documentReceived: PropTypes.string.isRequired,
        nextStep: PropTypes.string.isRequired,
        actionReq: PropTypes.string.isRequired,
        editable: true,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    actionRequired: PropTypes.string.isRequired,
  }).isRequired,
};

const rows1 = [
  createZackData('Zack', 'F1/OPT', '3/25/2020', '10', 'Send Notification')
];

const rows2 = [
  createKikiData('Kiki', 'F1/OPT', '5/25/2020', '61', 'Send Notification')
];

const rows3 = [
  createAnthonyData('Anthony', 'F1/OPT', '6/21/2020', '41', 'Send Notification')
];

const rows4 = [
  createSteveData('Steve', 'F1/OPT', '6/16/2020', '66', 'Send Notification')
];

const rows5 = [
  createKevinData('Kevin', 'F1/OPT', '8/18/2020', '88', 'Send Notification')
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Name (Legal Name)</TableCell>
            <TableCell align="left">Work Authorization</TableCell>
            <TableCell align="left">Expiration Date</TableCell>
            <TableCell align="left">Day Left</TableCell>
            <TableCell align="left">Action Required</TableCell>
          </TableRow>
          <TableBody>
            {rows1.map((row) => (
              <Row key={row.name} row={row} />
            ))}
            {rows2.map((row) => (
              <Row key={row.name} row={row} />
            ))}
            {rows3.map((row) => (
              <Row key={row.name} row={row} />
            ))}
            {rows4.map((row) => (
              <Row key={row.name} row={row} />
            ))}
            {rows5.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
