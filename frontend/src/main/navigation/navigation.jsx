import React from 'react';
import {Tabs, Tab, AppBar} from '@material-ui/core';
import CssBaseline from '@mui/material/CssBaseline';
import PersonalInformation from '../personal/personal';
import Housing from '../housing/housing';
import Visa from '../visa/visa';
import Home from '../home/home';
import { useParams, useNavigate } from 'react-router-dom';


function Navigation() {
    let params = useParams();
    let navigate = useNavigate();

    const tabNameToIndex = {
        0: 'home',
        1: 'personalInformation',
        2: 'housing',
        3: 'visa',
    }

    const indexToTabName = {
        home: 0,
        personalInformation: 1,
        housing: 2,
        visa: 3,
    }

    const [seletedTab, setSelectedTab] = React.useState(indexToTabName[params.page]);

    const handleChange = (event, newValue) => {
        navigate(`/nav/${tabNameToIndex[newValue]}`)
        setSelectedTab(newValue);
    };

    return (
    <div>
    <CssBaseline />
    <AppBar position="static">
        <Tabs value={seletedTab} onChange={handleChange}>
            <Tab label="Home" />
            <Tab label="Personal Information" />
            <Tab label="Housing"  />
            <Tab label="Visa Status"  />
        </Tabs>
    </AppBar>
        {seletedTab === 0 && <Home/>}
        {seletedTab === 1 && <PersonalInformation/>}
        {seletedTab === 2 && <Housing/>}
        {seletedTab === 3 && <Visa/>}
    
    </div>
    );
}
 
export default Navigation;