import { useEffect, useState } from "react";
import { Routes, Route , BrowserRouter} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import SidebarLayout from "./scenes/global/SidebarLayout";
import Dashboard from "./scenes/dashboard";
import Today from "./scenes/Today";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/alltodos";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Register from "./scenes/auth/register";
import Login from "./scenes/auth/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { useSelector } from "react-redux";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuth ?<Sidebar/>: <></> }
            {/* <Sidebar /> */}
            <main className="content">
              {/* {currentPath.length>0 ?<Topbar setIsSidebar={setIsSidebar} /> :<></>} */}
              {isAuth ?<Topbar />: <></> }
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/today" element={<Today />} />
                <Route path="/alltodos" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main >
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
