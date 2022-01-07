import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectEmail, selectPersonalInfo, selectContactInfo, selectEmergencyContact } from 'slices/userSlice';

export default function Review(props) {
  const personal_info = useSelector(selectPersonalInfo);
  const email = useSelector(selectEmail);
  const contact_info = useSelector(selectContactInfo);
  const contact = useSelector(selectEmergencyContact);

  const dl = (
    personal_info.driverLicense === 'yes' ?
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
          <Typography gutterBottom>{ personal_info.driverLicense_num }</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Driver License Expiration Date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{ personal_info.driverLicense_exp }</Typography>
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

  const visa = (
    personal_info.perm_citizen === 'yes' ?
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
          <Typography gutterBottom>{ personal_info.green_card_citizen }</Typography>
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
          <Typography gutterBottom>{personal_info.workAuth === 'other' ? personal_info.other_work_auth : personal_info.workAuth}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Work Auth Start Date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{ personal_info.workAuth_start }</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Work Auth Expr Date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{ personal_info.workAuth_exp }</Typography>
        </Grid>
      </React.Fragment>
  )

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Personal Info
          </Typography>
          <Grid container>

            <Grid item xs={6}>
              <Typography gutterBottom>First name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.firstName }</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Middle name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.middleName }</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography gutterBottom>Last name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.lastName }</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography gutterBottom>Preferred name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.preferredName }</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography gutterBottom>Date of birth:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.birthday }</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography gutterBottom>Gender:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.gender }</Typography>
            </Grid>
                      
            <Grid item xs={6}>
              <Typography gutterBottom>Social Security Number:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ssn }</Typography>
            </Grid>
            { dl }
            { visa }
          </Grid>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Reference
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref First Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_firstname }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref Middle Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_middlename }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref Last Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_lastname }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref Phone Number:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_phone }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref Email:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_email }</Typography>
            </Grid><Grid item xs={6}>
              <Typography gutterBottom>Ref Address:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_address1 }</Typography>
            </Grid><Grid item xs={6}>
              <Typography gutterBottom>Ref City:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_city }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref State:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_state }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref Zip Code:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_zip }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Ref Country:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.ref_country }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Relationship:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ personal_info.relationship }</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Vehicle Info
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Vehicle Maker:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.vehicle_maker }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Vehicle Model:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.vehicle_model }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Vehicle Color:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.vehicle_color }</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Contact Info
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Email:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ email }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Phone Number:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.cell_phone }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Work Phone Number:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.work_phone }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Address Line 1:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.address1 }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Address Line 2:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.address2 }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>City:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.city }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>State:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.state }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Zip Code:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.zip }</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Country:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{ contact_info.country }</Typography>
            </Grid>
          </Grid>
          {contact.map((contact, index) => (
            <React.Fragment key={index}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Emergency Contact { index+1 }
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom>First Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{ contact.em_firstname }</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Middle Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{ contact.em_middlename }</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Last Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{ contact.em_lastname }</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Phone Number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{ contact.em_phone }</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Email:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{ contact.em_email }</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Relationship:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{ contact.relationship }</Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={props.handleNext}
          sx={{ mt: 3, ml: 1 }}
        >
          Confirm
        </Button>
      </Box>
    </React.Fragment>
  );
}