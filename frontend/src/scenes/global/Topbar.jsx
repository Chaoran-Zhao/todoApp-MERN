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
import { useState, useEffect } from "react";
import axios from 'axios'
import {convertUTCDateToLocalDate, differenceInDays} from '../../utilis/helper'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import { baseurl } from "../../utilis/config";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user);

  const Logout = () => {
    console.log('Logging out ...');
    localStorage.removeItem('token');
    dispatch(setLogout())
    navigate('/')
  }

  const onClick = ({ key }) => {
    navigate('/today');
  };

  const [data, setData] = useState([])


  // const  baseurl = "https://todoapp-backend-new.onrender.com"

  const [notify, setNotify] = useState(0)

   async function todayProgression() {
    const response = await axios
    .get(`${baseurl}/todos`)
    .then(({data}) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        const today_str = yyyy+'-'+ mm+'-'+dd;

        let today_data = [];
        data.forEach(element => { 
            const dt = new Date(element.time_period[0])
            const local_time = convertUTCDateToLocalDate(dt).toISOString()
            const date = local_time.split('T')[0]
            if (date === today_str && differenceInDays(dt,today)===true){
                let replace = {...element}
                replace.time_period = local_time;
                today_data.push(replace)
            }
        });


        let userTodos = [];
        today_data.forEach(e => {
          if (e.userName === loginUser && e.status === 'Pending' && e.notification ===true)  {
            userTodos.push(e)
          }else{
            if(e.attendent !== []){
                e.attendent.forEach(att => {
                    if (att === loginUser && e.status === 'Pending' && e.notification ===true){
                        userTodos.push(e)                       
                    }
                });
            }
          }
        });
        setNotify(userTodos)
        let userNote = []
        let keys = 0
        userTodos.forEach(element => {
          let ele = {
            label: `[${element.text}] is due in a hour!`,
            key: keys,
          }
          userNote.push(ele) 
          keys = keys + 1}
        );
        setData(userNote)
    })
    .catch((err) => {console.log(err);
      alert(`${err.message} has occurred`);})
  }

  useEffect(() => {
    // Update the document title using the browser API
    todayProgression();
  });



  return (
    <Box display="flex" justifyContent="flex-end" p={2}>

      {/* ICONS */}
      <Box display="inline-flex" style={{alignItems: 'center'}}>
        
        <Tooltip title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        </Tooltip>

        <Dropdown
          menu={{
            items:data,onClick
          }}
        >
        <Tooltip title="Notification">
        <IconButton >
          <Badge badgeContent={notify.length} color="secondary">
            <NotificationsOutlinedIcon/>
          </Badge>

        </IconButton></Tooltip></Dropdown>

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
