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


const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values, "submitting...");
  };

  const [text, setText] = useState("")


  const [behaviour, setBehaviour] = useState('');

  const handlebehaviourChange = (event) => {
    setBehaviour(event.target.value);
  };

  const [checked, setChecked] = useState(true);

  const handlenotificationChange = (event) => {
    setChecked(event.target.checked);
  };

  const [startvalue, setStartValue] = useState(dayjs('2022-04-07'));
  const [endvalue, setEndValue] = useState(dayjs('2022-04-07'));

  return (
    <Box m="20px">
      <Header title="Add Todos" subtitle="Create a New Todo Item" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                label="todo title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="text"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="description"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
               <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">Behaviour</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={behaviour}
                label="behaviour"
                onChange={handlebehaviourChange}
                
              >
                <MenuItem value={10}>Individual</MenuItem>
                <MenuItem value={20}>Group</MenuItem>
              </Select>
               </FormControl>
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Group Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="groupName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
                disabled = {behaviour===10 ?true :false}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Urgency (scale of 10)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="Emergency-level"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
                <FormControlLabel
                  value="start"
                  control={<Checkbox
                    checked={checked}
                    onChange={handlenotificationChange}
                    style={{color:colors.greenAccent[500]}}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />}
                  label="In App Notification"
                  labelPlacement="end"
                  sx={{ gridColumn: "span 2" }}
                />
              
              {/* Start Date/ time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start date and time"
                  value={startvalue}
                  onChange={(newValue) => {
                    setStartValue(newValue);
                  }}
                  sx={{ gridColumn: "span 4" }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}
              >
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End date and time"
                  value={endvalue}
                  onChange={(newValue) => {
                    setEndValue(newValue);
                  }}
                  sx={{ gridColumn: "span 4" }}
                />
              </LocalizationProvider>
          
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={()=>{
                setText(values);
                console.log(values);
                console.log(behaviour,checked,startvalue,endvalue);
                let send_behaviour;
                if (behaviour===10){
                  send_behaviour = 'individual';
                  addToDO(values.text, values.description, null, send_behaviour, 'Pending', checked, parseInt(values["Emergency-level"]),[startvalue,endvalue]);
                }else{
                  send_behaviour = 'group';
                  addToDO(values.text, values.description, values.groupName, send_behaviour, 'Pending', checked, parseInt(values["Emergency-level"]),[startvalue,endvalue]);
                }
                
                // addToDO(values.text, values.description, values.groupName, send_behaviour, 'Pending', checked, parseInt(values["Emergency-level"]),[startvalue,endvalue]);
              }}>
                Add
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  text: "",
  // lastName: "",
  // email: "",
  // contact: "",
  // address1: "",
  // address2: "",
};

export default Form;
