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

function Contact() {

    const classes = useStyles();
    const [updating, setUpdating] = useState(false);

    return (
        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3}>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: '50px', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                            Contact Section
                        </Typography>

                        <Card className={classes.root} variant="outlined" sx={{ maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>
                                        {updating ? (
                                            <div>
                                                <div>
                                                <TextField
                                                    label="Update Personal Email"
                                                    id="outlined-size-small"
                                                    defaultValue="Personal Email"
                                                    size="small"
                                                />
                                                </div>
                                                <br />
                                                <div>
                                                <TextField
                                                    label="Update Work Email"
                                                    id="outlined-size-small"
                                                    defaultValue="Work Email"
                                                    size="small"
                                                />
                                                </div>
                                                <br />
                                                <div>
                                                <TextField
                                                    label="Update Cell Phone"
                                                    id="outlined-size-small"
                                                    defaultValue="Cell Phone"
                                                    size="small"
                                                />
                                                </div>
                                                <br />
                                                <div>
                                                <TextField
                                                    label="Update Work Phone"
                                                    id="outlined-size-small"
                                                    defaultValue="Work Phone"
                                                    size="small"
                                                />
                                                </div>
                                            </div>                
                                        ) : (
                                            <div>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Contact Information
                                                </Typography>

                                                Personal Email:
                                                <Typography gutterBottom variant="h6" component="div">
                                                    tasha.lee@gmail.com
                                                </Typography>

                                                Work Email:
                                                <Typography gutterBottom variant="h6" component="div">
                                                    natasha.lee@company.com
                                                </Typography>

                                                Cell Phone:
                                                <Typography gutterBottom variant="h6" component="div">
                                                    (123) 123-1234
                                                </Typography>

                                                Work Phone:
                                                <Typography gutterBottom variant="h6" component="div">
                                                    (222) 222-2222
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
                            title="Contact Information"
                            info={{
                            personalEmail: "lexi.thompson@gmail.com",
                            workEmail: "athompson@companyName.com",
                            cellPhone: "(111) 111 - 1111",
                            workPhone: "(222) 222 - 2222",
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

export default Contact;