import "./App.css";
// import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
  // Outlet,
} from "react-router-dom";

import PageLayout from "./layout/PageLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import TemaProvider from "./providers/TemaProvider"; // , { ColorModeContext }

// import CookieService from "./services/CookieService";

const App = () => {
  // const { toggleColorMode, mode } = useContext(ColorModeContext);

  // const handleToggleMode = () => {
  //   console.log("clicou!");
  //   toggleColorMode();
  // };

  return (
    <TemaProvider>
      <Router>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </TemaProvider>
  );
};

// type ProtectedRouteProps = {
//   tiposUsuarioAllowed: string;
//   children: any;
//   redirectPath: string;
// };

// const ProtectedRoute = ({
//   tiposUsuarioAllowed = "",
//   children,
//   redirectPath = "/signin",
// }: ProtectedRouteProps) => {
//   const cookie = CookieService.getCookie("jwt");
//   const userJpa = CookieService.getCookie("user");

//   if (
//     cookie != null &&
//     cookie.exp > Math.floor(Date.now() / 1000) &&
//     (tiposUsuarioAllowed.includes(userJpa.authorities[0].authority) ||
//       tiposUsuarioAllowed == "")
//   ) {
//     return children ? children : <Outlet />;
//   } else {
//     return <Navigate to={redirectPath} replace />;
//   }
// };

export default App;
