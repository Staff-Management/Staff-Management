// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// @mui icons
import ForumIcon from '@mui/icons-material/Forum';


function Contact() {

    return (
        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3}>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: '50px', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                            Contact Section
                        </Typography>
                        <ProfileInfoCard
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
                        />
                    </MDBox>
                </Grid>
            </Grid>
        </MDBox>

    )
}

export default Contact;