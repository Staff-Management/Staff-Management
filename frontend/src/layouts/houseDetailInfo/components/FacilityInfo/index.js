// @mui material components
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React components
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// @mui icons
import ForumIcon from '@mui/icons-material/Forum';


function Facility() {
    const [response, setResponse] = useState();
    const { landLord } = useParams();

    useEffect(() => {
        getHouseInfo();
      }, [])
    
      useEffect(() => {
      }, [response])
    
      const getHouseInfo = async () => {
        try {
          const res = await fetch(`http://localhost:4000/gethouse/${landLord}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
          const resp = await res.json();
          setResponse(resp.res);
        }
        catch (e) {
          alert("Error, refer to the console for details");
          console.log(e)
        }
      }

    return (
        <MDBox>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 'auto', borderRadius: '10px', backgroundColor: '#6667AB', color: '#FFFFFF', textAlign: 'center', pt: '2px', pb: '2px' }}>
                        Facility Information
                    </Typography>
                    <MDBox mb={1.5}>
                        <ProfileInfoCard
                            info={ response ? {
                                "Number Of Bed": response['facilityInfo'].numBeds,
                                "Number Of Mattress": response['facilityInfo'].numMattress,
                                "Number Of Tables": response['facilityInfo'].numTables,
                                "Number Of Chairs": response['facilityInfo'].numChairs,
                            }
                            :
                            {
                                "Number Of Bed": "",
                                "Number Of Mattress": "",
                                "Number Of Tables": "",
                                "Number Of Chairs": "",
                            }
                        }
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

export default Facility;