/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import PersonalInfo from "layouts/personalinfo";
import Tables from "layouts/tables";
import Onboarding from "layouts/onboarding/Onboarding";
import Token from "layouts/token/Token";
import Notifications from "layouts/notifications"
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/signup/SignUp";
import Housing from "layouts/housing/housing"
import Documents from "layouts/visa_status/Documents";
import Applications from "layouts/applications"
import HousingInfo from "layouts/houseInfo";
import Reports from "layouts/facilityReports/reports"

// @mui icons
import Icon from "@mui/material/Icon";
import GuardedRoute from "guardedroute/GuardedRoute";

const routes = [
  {
    type: "collapse",
    name: "Personal Information",
    key: "dashboard",
    icon: <Icon fontSize="small">account_circle</Icon>,
    route: "/dashboard",
    component: <PersonalInfo />,
  },
  {
    type: "collapse",
    name: "My Visa Status",
    key: "my-visa-status",
    icon: <Icon fontSize="small">article</Icon>,
    route: "/my-visa-status",
    component: <Documents />,
  },
  {
    type: "collapse",
    name: "Onboarding",
    key: "onboarding",
    icon: <Icon fontSize="small">app_registration</Icon>,
    route: "/onboarding",
    component: <Onboarding />,
  },
  {
    type: "collapse",
    name: "Facility Report",
    key: "Facility Report",
    icon: <Icon fontSize="small">report</Icon>,
    route: "/facilityreports",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <Icon fontSize="small">approval</Icon>,
    route: "/applications",
    component: <Applications />
  },
  {
    type: "collapse",
    name: "Visa Status",
    key: "visa-status",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/visa-status",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Token",
    key: "token",
    icon: <Icon fontSize="small">key</Icon>,
    route: "/token",
    component: <Token />,
  },
  {
    type: "collapse",
    name: "House Management",
    key: "housemanagement",
    icon: <Icon fontSize="small">maps_home_work</Icon>,
    route: "/housemanagement",
    component: <Housing />,
  },
  {
    type: "collapse",
    name: "House Information",
    key: "HouseInfo",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/houseinfo",
    component: <HousingInfo />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "signin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/signin",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "signup",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/authentication/signup",
    component: <SignUp />,
  }
];

export default routes;
