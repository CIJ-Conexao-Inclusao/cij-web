import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PageLayout;
