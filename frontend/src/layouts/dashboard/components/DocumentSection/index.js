// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// @mui icons
import PageviewIcon from '@mui/icons-material/Pageview';


function DocumentSection() {

    const { sales, tasks } = reportsLineChartData;

    return (

        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={1.5}>
                        <ProfileInfoCard
                            title="Documents"
                            info={{
                            upload1: "Symbol | File Name1 | 1/5/2017",
                            upload2: "Symbol | File Name2 | 12/28/2012",
                            upload3: "Symbol | File Name3 | 1/21/2009",
                            }}
                            social={[
                                {
                                    link: "https://www.google.com/docs/about/",
                                    icon: <PageviewIcon />,
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

export default DocumentSection;