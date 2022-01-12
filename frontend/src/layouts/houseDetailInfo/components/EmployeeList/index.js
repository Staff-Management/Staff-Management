// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
import EmployeeList from "./data/data";

// @mui icons
import GitHubIcon from '@mui/icons-material/GitHub';

// Material Dashboard 2 React components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import employeeTableData from "layouts/houseDetailInfo/components/EmployeeList/data/data"

function employmentList() {
const { columns, rows } = employeeTableData();

  return (
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={8} md={12} lg={12}>
            <Card>
              {/* title for visa status management table  */}
              <MDBox mx={2} mt={-5} py={3} px={2}>
                <MDTypography variant="h6" color="white" backgroundColor="#6667AB" textAlign="center" borderRadius="10px" padding="5px">
                  Employee Information
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <EmployeeList
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
  )
}

export default employmentList;