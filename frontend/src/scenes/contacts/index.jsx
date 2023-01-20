import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridFooterContainer, GridFooter } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react"
import { getAllToDo, updateToDoStatus, deleteToDo } from "../../utilis/handleapi";


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "text",
      headerName: "Todo",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "group",
      headerName: "Behaviour",
      flex: 1,
    },
    {
      field: "emergency",
      headerName: "Emergency-level",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  const [toDo, setToDo] = useState([])

  useEffect(()=>{
    getAllToDo(setToDo);
  },[])

  const [select, setSelectionModel] = useState([]);

  function updateStatus(){
    select.forEach(element => {
      updateToDoStatus(element,'Complete')
    });
  }
  function deleteMultiple(){
    select.forEach(element => {
      console.log('deleting', element)
      deleteToDo(element);
    });
  }


  function CustomFooter () {
  return (
    <GridFooterContainer>
      {/* Add what you want here */}
      <div style={{paddingLeft: '5px', gap:'10px'}}>
        <button style = {{backgroundColor:colors.greenAccent[500],fontWeight:'500',border:'none',marginLeft:'5px', display: select.length ===0 ?'none' : 'inline-flex'}} onClick={deleteMultiple}> Delete</button>
        <button style = {{backgroundColor:colors.greenAccent[500],fontWeight:'500',border:'none',marginLeft:'5px', display: select.length ===1 ?'inline-flex' : 'none'}}> Edit</button>
        <button style = {{backgroundColor:colors.greenAccent[500],fontWeight:'500',border:'none',marginLeft:'5px', display: select.length ===0 ?'none' : 'inline-flex'}} onClick={updateStatus}> Complete</button>
      </div>
      
      <GridFooter sx={{
        border: 'none', // To delete double border.
        }} />
    </GridFooterContainer>
  );
}


  return (
    <Box m="20px">
      <Header
        title="Todos"
        subtitle="List of All Todos so far"
      />
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={toDo}
          columns={columns}
          components={{ Footer: CustomFooter, Toolbar: GridToolbar, }}
          getRowId={(row) => row._id}
          onSelectionModelChange={(newSelection) => {
              console.log('Selecting...')
              setSelectionModel(newSelection);
              console.log(newSelection)
          }}
          selectionModel={select}
        />
      </Box>
      {/* {select.map(val =><h1>{val}</h1>)} */}
    </Box>
  );
};





export default Contacts;
