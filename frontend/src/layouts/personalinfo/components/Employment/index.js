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

function Employment() {

  const classes = useStyles();
  const [updating, setUpdating] = useState(false);

    return (
        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3}>

                            <Typography variant="h6" gutterBottom sx={{ marginTop: '50px', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                                Employment Section
                            </Typography>

                            <Card className={classes.root} variant="outlined" sx={{ maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>
                                    {updating ? (
                                        <div>
                                            <div>
                                            <TextField
                                                label="Update Work Authorization"
                                                id="outlined-size-large"
                                                defaultValue="Work Authorization"
                                                sx={{ width: 250 }}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                id="date"
                                                label="Update Work Authorization Start Date"
                                                type="date"
                                                defaultValue="yyyy-mm-dd"
                                                sx={{ width: 250 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                id="date"
                                                label="Update Work Authorization End Date"
                                                type="date"
                                                defaultValue="yyyy-mm-dd"
                                                sx={{ width: 250 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                id="date"
                                                label="Update Employment Start Date"
                                                type="date"
                                                defaultValue="yyyy-mm-dd"
                                                sx={{ width: 250 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                id="date"
                                                label="Update Employment End Date"
                                                type="date"
                                                defaultValue="yyyy-mm-dd"
                                                sx={{ width: 250 }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Job Title"
                                                id="outlined-size-large"
                                                defaultValue="Job Title"
                                                sx={{ width: 250 }}
                                            />
                                            </div>
                                        </div>                
                                    ) : (
                                        <div>
                                             <Typography gutterBottom variant="h5" component="div">
                                                Employment Information
                                            </Typography>

                                            Work Authorization:
                                            <Typography gutterBottom variant="h6" component="div">
                                                US Citizen
                                            </Typography>

                                            Work Authorization Start:
                                            <Typography gutterBottom variant="h6" component="div">
                                                02 March 2020
                                            </Typography>

                                            Work Authorization End:
                                            <Typography gutterBottom variant="h6" component="div">
                                                05 May 2022
                                            </Typography>

                                            Employment Start:
                                            <Typography gutterBottom variant="h6" component="div">
                                                05 March 2020
                                            </Typography>

                                            Employment End:
                                            <Typography gutterBottom variant="h6" component="div">
                                                10 May 2022
                                            </Typography>

                                            Job Title:
                                            <Typography gutterBottom variant="h6" component="div">
                                                Data Analyst
                                            </Typography>
                                        </div>
                                    )}
                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small" onClick={() => setUpdating(true)} color="secondary">
                                        Update
                                    </Button>
                                    <Button size="small" onClick={() => setUpdating(false)} color="secondary">
                                        Back
                                    </Button>
                                </CardActions>

                            </Card>

                            {/* <ProfileInfoCard
                                title="Employment Information"
                                info={{
                                workAuthorization: "US Citizen",
                                authorizedStart: "03 March 2020",
                                authorizedEnd: "05 May 2022",
                                employmentStart: "05 March 2020",
                                employmentEnd: "10 May 2022",
                                jobTitle: "Data Analyst",
                                }}
                                social={[
                                {
                                link: "https://github.com/Staff-Management",
                                icon: <GitHubIcon />,
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

export default Employment;