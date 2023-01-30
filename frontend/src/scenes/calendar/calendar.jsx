import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
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
import { addToDO } from "../../utilis/handleapi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [note, setNote] = useState('')
  const [select, setSelect] = useState(undefined)
  const loginUser = useSelector((state) => state.user);
  

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
    // const title = prompt("Add a quick note to the selected date");
    const calendarApi = selected.view.calendar;
    console.log(calendarApi)
    setSelect(selected)
    // calendarApi.unselect();
    handleClickOpen();

    // if (title !== '') {
    //   calendarApi.addEvent({
    //     id: `${selected.dateStr}-${title}`,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    // }
    // setNote('')
  };
  const updateEventList = (selected, title) => {
    const calendarApi = selected.view.calendar;
    const d = new Date(selected.startStr);
    addToDO(loginUser, title, null, 'Pending', true, null, [d, d],null,null, navigate);
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
    setNote('')
  }

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Quick Todo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add quick todo to the currently selected date. Only title are required.
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

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
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
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2023-01-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2023-01-28",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
