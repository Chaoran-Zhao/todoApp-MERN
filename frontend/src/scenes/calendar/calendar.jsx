import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import * as React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addToDO, getEvent } from "../../utilis/handleapi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllToDo } from "../../utilis/handleapi";
import axios from 'axios'
import {convertUTCDateToLocalDate} from '../../utilis/helper'
import ICalendarLink from "react-icalendar-link";
import { baseurl } from "../../utilis/config";


const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [note, setNote] = useState('')
  const [select, setSelect] = useState(undefined)
  const loginUser = useSelector((state) => state.user);
  const [allevent, setAllEvent] = useState([])
  const [ics, setics] = useState('')

  // Dialoge adding todos
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();


  const handleDateClick = (selected) => {
    setSelect(selected)
    // calendarApi.unselect();
    handleClickOpen();
  };
  const updateEventList = (selected, title) => {
    const calendarApi = selected.view.calendar;
    const d = new Date(selected.startStr);
    addToDO(loginUser, title, null, 'Pending', true, 0, [d, null],null,[], undefined);
    // calendarApi.unselect();
    if (title !== '') {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
    setNote('te',selected.allDay)
  }

  const handleEventClick = (selected) => {
    // not delete it but download ics
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${selected.event.title}'`
    //   )
    // ) {
    //   selected.event.remove();
    // }
    handleClickOpenics();
    console.log(selected.event.start)
    const event = {
      title: selected.event.title,
      description: selected.event.extendedProps.description,
      startTime: selected.event.start,
      endTime: selected.event.end,   
    }
    setics(event)
    // selected.event.remove();
  };
  

  // const  baseurl = "https://todoapp-backend-new.onrender.com"


  async function handleDateSet(){
    const response = await axios
    .get(`${baseurl}/todos`)
    .then(({data}) => {
        console.log('data-->', data);
        let userTodos = [];
        data.forEach(element => {
          if (element.userName === loginUser)  {
            let tmp;
            if (element.time_period[1] === null){
              tmp = {id: element._id,title: element.text, start:element.time_period[0], end:element.time_period[1], allDay: true, color: element.color, description: element.description}
            }else{
              tmp = {id: element._id,title: element.text, start:element.time_period[0], end:element.time_period[1], color: element.color, description: element.description}
            }
            userTodos.push(tmp)
          }else{
            if(element.attendent.length !== 0){
                element.attendent.forEach(att => {
                if (att === loginUser){
                    let tmp;
                    if (element.time_period[1] === null){
                      tmp = {id: element._id,title: element.text, start:element.time_period[0], end:element.time_period[1], allDay: true, color: element.color}
                    }else{
                      tmp = {id: element._id,title: element.text, start:element.time_period[0], end:element.time_period[1], color: element.color}
                    }
                    userTodos.push(tmp)
                }
            });
            }
            
          }
        });
        setAllEvent(userTodos)
        console.log(userTodos)
    })
    .catch((err) => {console.log(err);
    alert.error(`${err.message} has occurred`);})
  }


  const [openics, setOpenics] = useState(false);

  const handleClickOpenics = () => {
    setOpenics(true);
  };

  const handleCloseics = () => {
    setOpenics(false);
  };

  
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Quick Todo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add quick note/todo to the currently selected date . Only title are required.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="note"
              label="Quick Note"
              type="text"
              fullWidth
              variant="standard"
              name='title'
              onChange={(event)=>{console.log(event.target.value);
              setNote(event.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(event)=>{handleClose();updateEventList(select,note)}}>Add</Button>
          </DialogActions>
        </Dialog>
        {/* download ics modal */}
        <Dialog
        open={openics}
        onClose={handleCloseics}
      >
        <DialogTitle>{"Save to Calendar"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Download ics file for this schedule.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseics}><ICalendarLink  event={ics}>Add to Calendar</ICalendarLink></Button>
          <Button onClick={handleCloseics}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px" >
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              // right: "dayGridMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => {let addons = [...currentEvents]; addons.push(events); setCurrentEvents(addons); }}
            events ={allevent}
            datesSet = {(date) => handleDateSet(date)}
            eventColor= '#378006'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
