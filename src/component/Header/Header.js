import React from "react";
// import CommonButton from "../common/CommonButton/CommonButton";
// import NotificationBell from "../common/NotificationBell/NotificationBell";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import { headerStyles } from "./styles";

//todo: logout, login info
const Header = ({ title }) => {
  return (
    <Box sx={headerStyles.wrapper}>
      <Box sx={headerStyles.topRow}>
        <Typography sx={headerStyles.link}>login</Typography>
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
      </Box>
      <Box>
        <Typography variant="h3" color="white">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
