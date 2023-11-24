import "./App.scss";
// import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
  // Outlet,
} from "react-router-dom";

import SignIn from "./pages/Login/SignIn";
import SignUp from "./pages/Signup/Signup";

import TemaProvider from "./providers/TemaProvider"; // , { ColorModeContext }
import ComponentTest from "./components/ComponentTest/ComponentTest";
import React from "react";

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
          <Route path="/" element={<ComponentTest />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<ComponentTest />} />
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
