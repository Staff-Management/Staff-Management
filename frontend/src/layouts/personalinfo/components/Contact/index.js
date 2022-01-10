// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';

function Contact() {

    return (
        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3}>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: '50px', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                            Contact Section
                        </Typography>

                        <Card sx={{ maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>

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
                                    
                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small" color="secondary">
                                        Edit
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