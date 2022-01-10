// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';


function Employment() {

    return (
        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3}>

                            <Typography variant="h6" gutterBottom sx={{ marginTop: '50px', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                                Employment Section
                            </Typography>

                            <Card sx={{ maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>

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
                                    
                                    </CardContent>
                                </CardActionArea>

                                <CardActions>
                                    <Button size="small" color="secondary">
                                    Edit
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