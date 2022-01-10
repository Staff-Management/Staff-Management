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

function Emergency() {

    const classes = useStyles();
    const [updating, setUpdating] = useState(false);

    return (

        <MDBox>

            <Grid container spacing={3}>

                <Grid item xs={12} md={12} lg={12}>
                    
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '0px', backgroundColor: '#546E7A', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Emergency Contact Section
                    </Typography>

                    <MDBox mb={1.5}>
                        
                        <Card className={classes.root} variant="outlined" sx={{ borderRadius: '0px', maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>
                                    {updating ? (
                                        <div>
                                            <div>
                                            <TextField
                                                label="Update Full Name"
                                                id="outlined-size-small"
                                                defaultValue="Full Name"
                                                size="small"
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Phone"
                                                id="outlined-size-small"
                                                defaultValue="Phone"
                                                size="small"
                                            />
                                            </div>
                                            <br />
                                            <div>
                                            <TextField
                                                label="Update Address"
                                                id="outlined-size-small"
                                                defaultValue="Address"
                                                size="small"
                                            />
                                            </div>
                                        </div>                
                                    ) : (
                                    <div>
                                    Full Name:
                                    <Typography gutterBottom variant="h6" component="div">
                                        John Doe
                                    </Typography>

                                    Phone:
                                    <Typography gutterBottom variant="h6" component="div">
                                        (123) 123-1234
                                    </Typography>

                                    Address:
                                    <Typography gutterBottom variant="h6" component="div">
                                        1234 Street Name Philadelphia, PA 07012
                                    </Typography>
                                    </div>
                                    )}
                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small" onClick={() => setUpdating(true)} color="secondary">
                                        Edit
                                    </Button>
                                    <Button size="small" onClick={() => setUpdating(false)} color="secondary">
                                        Update
                                    </Button>
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