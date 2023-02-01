import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/index";
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import Notifications from "react-notifications-menu";
import { useState, useEffect } from "react";
import bell1 from "../../assets/bell1.png";
import bell2 from "../../assets/bell2.png"
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    console.log('Logging out ...');
    localStorage.removeItem('token');
    dispatch(setLogout())
    navigate('/')
  }

  const DEFAULT_NOTIFICATION = {
    image:
      "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification one.",
    detailPage: "/alltodos",
  };
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");

  const onClick = () => {
    if (message.length > 0) {
      setData([
        ...data,
        {
          ...DEFAULT_NOTIFICATION,
          message
        }
      ]);
      setMessage("");
      alert("notification added");
    }
  };

  return (
    <Box display="flex" justifyContent="flex-start" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex">
        <Tooltip title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        </Tooltip>



        <IconButton>
          {/* <Badge badgeContent={4} color="secondary">
            <NotificationsOutlinedIcon onClick={onClick}/>
          </Badge> */}
          <Notifications
            data={data}
            header={{
              title: "Notifications",
              option: { text: "View All", onClick: () => console.log("Clicked") }
            }}
            markAsRead={(data) => {
              console.log(data);
            }}
            icon={theme.palette.mode === "dark" ? bell1 : bell2}
        />
        </IconButton>

        
       
        

        <Tooltip title="Logout">
        <IconButton onClick={Logout}>
          <LogoutIcon />
        </IconButton>
        </Tooltip>
      </Box>

      
    </Box>
  );
};

export default Topbar;
