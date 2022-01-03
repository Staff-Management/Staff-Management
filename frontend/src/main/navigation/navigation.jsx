import React from 'react';
import {Tabs, Tab, AppBar} from '@material-ui/core';
import CssBaseline from '@mui/material/CssBaseline';
import PersonalInformation from '../personal/personal';
import Housing from '../housing/housing';
import Visa from '../visa/visa';
import Home from '../home/home'


function Navigation(props) {
    // const {match, history} = props;
    // const { params } = match;
    // const { page } = params;

    const tabNameToIndex = {
        0: 'Home',
        1: 'PersonalInformation',
        2: 'Housing',
        3: 'Visa',
    }

    const indexToTabName = {
        Home: 0,
        PersonalInformation: 1,
        Housing: 2,
        Visa: 3,
    }

    const [seletedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        // history.push(`/${tabNameToIndex[newValue]}`)
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