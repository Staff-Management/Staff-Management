// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// @mui icons
import GitHubIcon from '@mui/icons-material/GitHub';

// Material Dashboard 2 React components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";


function Employment() {

    return (
        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={3}>
                    <ProfileInfoCard
                        title="Employment"
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
                    />
                    </MDBox>
                </Grid>
            </Grid>
        </MDBox>

    )
}

export default Employment;