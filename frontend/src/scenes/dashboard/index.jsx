import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import axios from 'axios'
import {convertUTCDateToLocalDate} from '../../utilis/helper'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const loginUser = useSelector((state) => state.user);
  const [todayTotal, setTodayTotal] = useState(0)
  const [todayUndo, setTodayUndo] = useState(0)
  const [totalTotal, setTotalTotal] = useState(0)
  const [totalUndo, setTotalUndo] = useState(0)
  const [todoToday, setTodoToday] = useState([])

  const  baseurl = "https://todoapp-backend-new.onrender.com"

  // today progression
  // total = undo + done
  async function todayProgression() {
    const response = await axios
    .get(`${baseurl}/todos`)
    .then(({data}) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy+'-'+ mm+'-'+dd;

        let todayTotal = 0;
        let todayUndo = 0;
        let today_data = [];
        data.forEach(element => { 
            const dt = new Date(element.time_period[0])
            const local_time = convertUTCDateToLocalDate(dt).toISOString()
            const date = local_time.split('T')[0]
            if (date === today){
                let replace = {...element}
                replace.time_period = local_time;
                today_data.push(replace)
            }
        });

        let userTodos = [];
        today_data.forEach(e => {
          if (e.userName === loginUser)  {
            userTodos.push(e)
            todayTotal = todayTotal + 1;
            if (e.status === 'Pending') {
              todayUndo = todayUndo + 1;
            }
          }else{
            if(e.attendent !== []){
                e.attendent.forEach(att => {
                    if (att === loginUser){
                        userTodos.push(e)
                        todayTotal = todayTotal + 1;
                      if (e.status === 'Pending') {
                        todayUndo = todayUndo + 1;
                      }
                    }
                });
            }
          }
        });
        console.log('data-->',userTodos)
        setTodayTotal(todayTotal);
        setTodayUndo(todayUndo);
        console.log('total',todayTotal, 'Undo',todayTotal)
    })
    .catch((err) => {console.log(err);
        alert.error(`${err.message} has occurred`);})
  }

  async function totalProgression() {
    const response = await axios
    .get(`${baseurl}/todos`)
    .then(({data}) => {
    
        let totalTotal = 0;
        let totalUndo = 0;

        let userTodos = [];
        data.forEach(e => {
          if (e.userName === loginUser)  {
            userTodos.push(e)
            totalTotal = totalTotal + 1;
            if (e.status === 'Pending') {
              totalUndo = totalUndo + 1;
            }
          }else{
            if(e.attendent !== []){
                e.attendent.forEach(att => {
                    if (att === loginUser){
                        userTodos.push(e)
                        totalTotal = totalTotal + 1;
                      if (e.status === 'Pending') {
                        totalUndo = totalUndo + 1;
                      }
                    }
                });
            }
          }
        });
        console.log('data-->',userTodos)
        setTotalTotal(totalTotal );
        setTotalUndo(totalUndo);
        userTodos.sort((a, b) => (b.emergency-a.emergency));
        setTodoToday(userTodos)
        console.log(userTodos)
    })
    .catch((err) => {console.log(err);
        alert.error(`${err.message} has occurred`);})
  }

  useEffect(() => {
    // Update the document title using the browser API
    todayProgression();
    totalProgression();
  },[]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${todayUndo} Undos`}
            subtitle="Today's Progression"
            progress={`${1-todayUndo/todayTotal}`}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${totalUndo} Undos`}
            subtitle="Total Progression"
            progress={`${1-totalUndo/totalTotal}`}
            icon={
              <PlaylistAddCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Upcoming Todos
            </Typography>
          </Box>
          {todoToday.map((todo, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {todo.text}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {todo.description}
                </Typography>
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              > <NotificationImportantIcon/>
                {todo.emergency} 
                {/* urgency */}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
