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
import axios from 'axios'
import {convertUTCDateToLocalDate, differenceInDays} from '../../utilis/helper'


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

  // const DEFAULT_NOTIFICATION = {
  //   image:
  //     "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
  //   message: "Notification one.",
  //   detailPage: "/alltodos",
  // };


  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");




  const  baseurl = "http://localhost:5000"

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
        console.log('data-->',userTodos)
        let userNote = []
        userTodos.forEach(element => {
          let ele = {
            image:
              "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
            message: element.text,
            detailPage: "/alltodos",
          }
          userNote.push(ele) }
        );
        console.log(userNote)
        setNotify(userTodos)
        if (userNote !== data){
          setData(userNote)
        }
        
    })
    .catch((err) => {console.log(err);
      alert.error(`${err.message} has occurred`);})
  }

  useEffect(() => {
    // Update the document title using the browser API
    todayProgression();
  },[]);



  return (
    <Box display="flex" justifyContent="flex-start" p={2}>

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


        <Tooltip title="Notification">
        <IconButton style={{paddingTop:'14px'}}>
          {/* <Badge badgeContent={4} color="secondary">
            <NotificationsOutlinedIcon onClick={onClick}/>
          </Badge> */}
          <Notifications
            data={data}
            header={{
              title: "Notifications for Todos due in an hour",
              option: {text: '',onClick: ()=>{}}
            }}
            cardOption = {false}
            
            icon={theme.palette.mode === "dark" ? bell1 : bell2}
        />
        </IconButton></Tooltip>

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
