import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react"
import { getAllToDo, updateToDoStatus, deleteToDo, editToDo, getTodayToDo } from "../../utilis/handleapi";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx';
import "./style.css"


const Today = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [reset, setReset] = useState(false);

  const loginUser = useSelector((state) => state.user);

  const dateFormatter = (params) => {
    const start_date = new Date(params.value);
    return start_date.toISOString().split('T')[1].split(":")[0] + ':' + start_date.toISOString().split('T')[1].split(":")[1]
  };

  const columns = [
    {
      field: "text",
      headerName: "Todo",
      flex: 1.2,
      cellClassName: "name-column--cell",
    },
    {
      field: "color",
      headerName: "Color",
      flex: 0.5,
      renderCell: (params) => {
        if (params.value === '#00ff00'){
          return <span className="dot" style={{backgroundColor: '#00ff00'}}></span>
        } else if(params.value === '#ff0000') {
          return <span className="dot" style={{backgroundColor: '#ff0000'}}></span>
        } else if (params.value === '#FFF') {
          return <span className="dot" style={{backgroundColor: '#FFF'}}></span>
        } else if (params.value === '#0000ff'){
          return <span clasName="dot" style={{backgroundColor: '#0000ff'}}></span>
        } else {
          return <span clasName="dot" style={{backgroundColor: 'none'}}></span>
        }
      }
    },
    {
      field: "emergency",
      headerName: "Emergency-level",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "time_period",
      headerName: "Time",
      valueFormatter: dateFormatter,
      type: 'date',
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    
  ];

  const [toDo, setToDo] = useState([])

  useEffect(()=>{
    // getAllToDo(setToDo);
    getTodayToDo(setToDo, loginUser)
  },[reset])

  const [select, setSelectionModel] = useState([]);

  function updateStatus(){
    select.forEach(element => {
      updateToDoStatus(element,'Complete')
    });
    setReset(!reset);
  }
  function deleteMultiple(){
    select.forEach(element => {
      console.log('deleting', element)
      deleteToDo(element);
    });
    setReset(!reset);
  }

  

  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {  
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setnewTitleValue('')
    setnewDesValue('')
    setnewUrgentValue('')
  };


  const [newTitleValue, setnewTitleValue] = useState("");
  const [newDesValue, setnewDesValue] = useState("");
  const [newUrgentValue, setnewUrgentValue] = useState("");

  function CustomFooter () {
  return (
    <GridFooterContainer>
      {/* Add what you want here */}
      <div style={{paddingLeft: '5px', gap:'10px'}}>
        <Button style = {{backgroundColor:colors.greenAccent[500],fontWeight:'500',border:'none',marginLeft:'5px', display: select.length ===0 ?'none' : 'inline-flex'}} onClick={handleClickOpenDelete}> Delete</Button>
        <Button style = {{backgroundColor:colors.greenAccent[500],fontWeight:'500',border:'none',marginLeft:'5px', display: select.length ===1 ?'inline-flex' : 'none'}} onClick={handleClickOpenEdit}> Edit</Button>
        <Button style = {{backgroundColor:colors.greenAccent[500],fontWeight:'500',border:'none',marginLeft:'5px', display: select.length ===0 ?'none' : 'inline-flex'}} onClick={updateStatus}> Complete</Button>
      </div>
      
      <GridFooter sx={{
        border: 'none', // To delete double border.
        }} />
    </GridFooterContainer>
    );
  }

  return (
    <><Box m="20px">
      <Header
        title="Today's Todos"
        subtitle="List of Today's Todos" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          '& .super-app.red': {
          backgroundColor: '#ff0000',
          color: '#ff0000',
          fontWeight: '600',
          },
          '& .super-app.green': {
            backgroundColor: '#00ff00',
            color: '#00ff00',
            fontWeight: '600',
          },
          '& .super-app.blue': {
            backgroundColor: '#0000ff',
            color: '#0000ff',
            fontWeight: '600',
          },
          '& .super-app.white': {
            backgroundColor: '#FFF',
            color: '#FFF',
            fontWeight: '600',
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={toDo}
          columns={columns}
          // components={{ Footer: CustomFooter, Toolbar: EditToolbar }}
          components={{ Footer: CustomFooter, Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          onSelectionModelChange={(newSelection) => {
            console.log('Selecting...');
            setSelectionModel(newSelection);
            console.log(newSelection);
          } }
          selectionModel={select} />
      </Box>
      {/* {select.map(val =><h1>{val}</h1>)} */}
    </Box>
    {/* delete alert modal */}
    <Dialog
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Event?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this event?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          handleCloseDelete();
          deleteMultiple();}} autoFocus>
          Yes
        </Button>
        <Button onClick={handleCloseDelete}>Cancel</Button>
        
      </DialogActions>
    </Dialog>
    
    {/* edit form modal */}
    <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this todo event, please enter your new title/description/urgent-level below. Leave it blank if you dont want to change it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Todo title"
            type="text"
            variant="standard"
            value={newTitleValue}
            onChange={(e) => setnewTitleValue(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newDesValue}
            onChange={(e) => setnewDesValue(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Urgent-Level"
            type="text"
            variant="standard"
            value={newUrgentValue}
            onChange={(e) => setnewUrgentValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleCloseEdit();
            editToDo(select,newTitleValue, newDesValue, newUrgentValue);
            setReset(!reset);}}>Edit</Button>
          <Button onClick={handleCloseEdit}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default Today;



