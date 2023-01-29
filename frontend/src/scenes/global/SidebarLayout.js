import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar";

const SidebarLayout = () => (
  <>
  <Outlet />
    <Sidebar />
    
  </>
);

export default SidebarLayout;