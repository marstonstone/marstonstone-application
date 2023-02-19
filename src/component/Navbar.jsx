import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BuildIcon from "@mui/icons-material/Build";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FactoryIcon from "@mui/icons-material/Factory";
import { BROWN, WHITE, NAVY, DARK_GRAY } from "../styles/colors";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "Order",
    children: [
      { id: "Quotation", icon: <RequestQuoteIcon />, route: "quotation" },
      {
        id: "To be confirm",
        icon: <ConfirmationNumberIcon />,
        route: "toBeConfirm",
      },
      { id: "Processing", icon: <BuildIcon />, route: "processing" },
    ],
  },

  {
    id: "Customer",
    children: [{ id: "Customer", icon: <Diversity3Icon />, route: "customer" }],
  },
  {
    id: "Suppliers",
    children: [{ id: "Suppliers", icon: <FactoryIcon />, route: "supplier" }],
  },
];

function Navbar(props) {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" anchor="left" sx={navbarStyles.drawer}>
      <List>
        <ListItem sx={navbarStyles.header}>Marston Stone</ListItem>
        <ListItemButton onClick={() => navigate("Home")}>
          <ListItemIcon sx={navbarStyles.icons}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItemButton>

        {categories.map(({ id, children }) => (
          <Box key={id}>
            <ListItem>
              <ListItemText sx={navbarStyles.text}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, route }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  onClick={() => navigate(route)}
                >
                  <ListItemIcon sx={navbarStyles.icons}>{icon}</ListItemIcon>
                  <ListItemText sx={navbarStyles.text}>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

const navbarStyles = {
  drawer: {
    display: "relative",
    width: 250,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 250,
      boxSizing: "border-box",
      backgroundColor: `${DARK_GRAY}`,
      color: `${WHITE}`,
    },
    "& .Mui-selected": {
      color: `${BROWN}`,
    },
  },
  icons: {
    color: `${WHITE}!important`,
    marginLeft: "20px",
  },
  text: {
    "& span": {
      marginLeft: "-10px",
      fontWeight: "600",
      fontSize: "16px",
    },
  },
  header: {
    paddingTop: "20",
    paddingBottom: "20",
    fontSize: "22px",
    fontWeight: "700",
  },
};

export default Navbar;
