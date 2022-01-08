// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// @mui icons
import ForumIcon from '@mui/icons-material/Forum';


function Emergency() {

    return (

        <MDBox>

            <Grid container spacing={3}>

                <Grid item xs={12} md={12} lg={12}>
                    
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Emergency Contact Section
                    </Typography>

                    <MDBox mb={1.5}>
                        <ProfileInfoCard
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
                        />
                    </MDBox>

                </Grid>

            </Grid>

        </MDBox>

    )
}

export default Emergency;