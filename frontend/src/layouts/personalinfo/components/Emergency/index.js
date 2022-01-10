// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";


function Emergency() {

    return (

        <MDBox>

            <Grid container spacing={3}>

                <Grid item xs={12} md={12} lg={12}>
                    
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Emergency Contact Section
                    </Typography>

                    <MDBox mb={1.5}>
                        
                        <Card sx={{ maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>

                                    <Typography gutterBottom variant="h5" component="div">
                                        Emergency Contact Information
                                    </Typography>

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
                                    
                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small" color="secondary">
                                        Edit
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