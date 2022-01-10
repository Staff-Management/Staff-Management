// @mui material components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";


function DocumentSection() {

    return (

        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Document Section
                    </Typography>
                    <MDBox mb={1.5}>

                        <Card sx={{ maxWidth: 1000 }}>
                                <CardActionArea>
                                    <CardContent>

                                    <Typography gutterBottom variant="h5" component="div">
                                        Document Information
                                    </Typography>

                                    File Uploaded:
                                    <Typography gutterBottom variant="h6" component="div">
                                        File Icon Placeholder // File Name Placeholder // Uploaded Date Placeholder
                                    </Typography>

                                    File Uploaded:
                                    <Typography gutterBottom variant="h6" component="div">
                                        File Icon Placeholder // File Name Placeholder // Uploaded Date Placeholder
                                    </Typography>

                                    File Uploaded:
                                    <Typography gutterBottom variant="h6" component="div">
                                        File Icon Placeholder // File Name Placeholder // Uploaded Date Placeholder
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
                            title="Document Information"
                            info={{
                            upload1: "Symbol | File Name1 | 1/5/2017", // placeholder string
                            upload2: "Symbol | File Name2 | 12/28/2012", // placeholder string
                            upload3: "Symbol | File Name3 | 1/21/2009", // placeholder string
                            }}
                            social={[
                                {
                                    link: "https://www.google.com/docs/about/",
                                    icon: <PageviewIcon />,
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

export default DocumentSection;