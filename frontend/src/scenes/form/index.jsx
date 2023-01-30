import { Box, Button, TextField, Select, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { addToDO } from "../../utilis/handleapi";
import { useState, useEffect } from "react"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { BlockPicker, CirclePicker, } from 'react-color';
import { useDispatch, useSelector } from "react-redux";



const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  
  function refreshPage() {
    window.location.reload(false);
  }

  const loginUser = useSelector((state) => state.user);
  console.log(loginUser,'has logged in');


  const handleFormSubmit = (values,setFieldValue) => {
    console.log(values, "submitting...");
    setReset(!reset)
    setText("");
    setStartValue(dayjs(dt));
    setEndValue(dayjs(dt));
    // refreshPage()
    // might also has problem ????
  };

  const [text, setText] = useState("")
  const [reset, setReset] = useState(false);
  // const [blockPickerColor, setBlockPickerColor] = useState("#0000FF");
  const [circleColor, setCircleColor] = useState("#FFF");

  const [checked, setChecked] = useState(true);

  const handlenotificationChange = (event) => {
    setChecked(event.target.checked);
  };

  const today = Date.now();
  const dt = new Date(today)
  const [startvalue, setStartValue] = useState(dayjs(dt));
  const [endvalue, setEndValue] = useState(dayjs(dt));


  useEffect(()=>{
    // getAllToDo(setToDo);
    console.log('reload...');
    
  },[reset])

 

  return (
    <><Box m="20px">
      <Header title="Add Todos" subtitle="Create a New Todo Item" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values, errors, touched, handleBlur, handleChange, handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Todo title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="text"
                error={!!touched.text && !!errors.text}
                helperText={touched.text && errors.text}
                sx={{ gridColumn: "span 4" }} />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }} />


              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Urgency (scale of 10)"
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="Emergency-level"
                error={!!touched["Emergency-level"] && !!errors["Emergency-level"]}
                helperText={touched["Emergency-level"] && errors["Emergency-level"]}
                sx={{ gridColumn: "span 2" }} />
             
              {/* Start Date/ time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start date and time"
                  value={startvalue}
                  onChange={(newValue) => {
                    setStartValue(newValue);
                  } }
                  sx={{ gridColumn: "span 4" }} />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}
              >
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End date and time"
                  value={endvalue}
                  onChange={(newValue) => {
                    setEndValue(newValue);
                  } }
                  sx={{ gridColumn: "span 4" }} />
              </LocalizationProvider>
              <FormControlLabel
                value="start"
                control={<Checkbox
                checked={checked}
                onChange={handlenotificationChange}
                style={{ color: colors.greenAccent[500] }}
                inputProps={{ 'aria-label': 'controlled' }} />}
                label="In App Notification"
                labelPlacement="end"
                sx={{ gridColumn: "span 1" }} />
              {/*  assign a color to it */}
            <span>Select a color: {circleColor}
              {/* <BlockPicker
                color={blockPickerColor}
                onChange={(color) => {
                  setBlockPickerColor(color.hex);
                }}
               /> */}
              <CirclePicker
            color={circleColor}
            colors={["	#FF0000", "#00FF00", "#0000FF"]} 
            // add more colors
            onChange={(e) => setCircleColor(e.hex)}
          />
            </span>
             
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Add Attendent (separte by , )"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.attend}
                name="attend"
                error={!!touched.attend && !!errors.attend}
                helperText={touched.attend && errors.attend}
                sx={{ gridColumn: "span 2" }} />            

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={() => {
                const people = values.attend.split(',')
                setText(values);
                addToDO(loginUser,values.text, values.description, 'Pending', checked, parseInt(values["Emergency-level"]), [startvalue, endvalue],circleColor,people ,navigate);
              } }>
                Add
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box> </>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  text: yup.string().required('title is required'),
  "Emergency-level": yup.number().typeError('age must be a number').required('Urgency is required'),
});
const initialValues = {
  text: "",
  description: "",
  groupName: "",
  "Emergency-level": "",
  attend:""
};

export default Form;



