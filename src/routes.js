/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
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
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Rechercher from "layouts/rechercher/components";

import React from "react";
import { Link } from "react-router-dom";
// @mui icons
import Icon from "@mui/material/Icon";
//import FicheSav from "layouts/ficheSav";
import Decharge from "layouts/decharge";
import Fichesav from "layouts/fichesav";
import Bonsav from "layouts/bonsav";
import Reparateur from "layouts/reparateur/interne";
import Reparateurex from "layouts/reparateur/externe";
import Recuint from "layouts/reparateur/recuInterne";
import Recuext from "layouts/reparateur/recuExterne";
import PointCollecte from "layouts/pointCollecte";
import Swapp from "layouts/swapp";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubMenu from "examples/Sidenav/submenu";

const routes = [
  {
    type: "collapse",
    name: "Rechercher",
    key: "rechercher",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/rechercher/components",
    component: <Rechercher />,
  },
  {
    type: "collapse",
    name: "Consulter Fiche SAV",
    key: "fichesav",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/fichesav",
    component: <Fichesav />,
  },

  {
    type: "collapse",
    name: "Consulter bon sav",
    key: "bonsav",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/bonsav",
    component: <Bonsav />,
  },

  {
    type: "collapse",
    name: "Recherche Decharge",
    key: "decharge",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/decharge",
    component: <Decharge />,
  },

  {
    type: "collapse",
    name: "Suivi point de collecte",
    key: "pointCollecte",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/pointCollecte",
    component: <PointCollecte />,
  },
  {
    type: "collapse",
    name: "Go for SWAPP",
    key: "swapp",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/swapp",
    component: <Swapp />,
  },

  {
    type: "collapse",
    name: "Suivi Retour Réparateurs",
    key: "reparateur",
    icon: <Icon fontSize="small">person</Icon>,

    haveChildren: true,
    children: [
      {
        name: "Expedier reparateur interne",
        route: "/reparateur/interne",
        icon: <Icon fontSize="small">person</Icon>,
        component: <Reparateur />,
      },
      {
        name: "Expedier reparateur externe",
        route: "/reparateur/externe",
        icon: <Icon fontSize="small">person</Icon>,
        component: <Reparateurex />,
      },
      {
        name: "Recu reparateur interne",
        route: "/reparateur/recuInterne",
        icon: <Icon fontSize="small">person</Icon>,
        component: <Recuint />,
      },
      {
        name: "Recu reparateur externe",
        route: "/reparateur/recuExterne",
        icon: <Icon fontSize="small">person</Icon>,
        component: <Recuext />,
      },
    ],
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
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.children) {
      return route.children.map((child) => (
        <Route path={child.route} element={child.component} key={child.route} />
      ));
    }

    if (route.route) {
      return <Route path={route.route} element={route.component} key={route.route} />;
    }

    return null;
  });

export default routes;
