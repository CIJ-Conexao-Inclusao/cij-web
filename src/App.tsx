import "./App.scss";
import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
	// Outlet,
} from "react-router-dom";

import { PageLayout } from "./layout";

import SignIn from "./pages/Login/SignIn";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home";

import TemaProvider from "./providers/TemaProvider"; // , { ColorModeContext }
import ComponentTest from "./components/ComponentTest/ComponentTest";

import { CookieService, UserService } from "./services";
import { defineUser } from "./redux/user/userSlice";
import { useAppDispatch } from "./redux/hooks";
import Login from "./pages/Login";

const App = () => {
	// const { toggleColorMode, mode } = useContext(ColorModeContext);

	// const handleToggleMode = () => {
	//   console.log("clicou!");
	//   toggleColorMode();
	// };

	const dispatch = useAppDispatch();

	useEffect(() => {
		const tokenCookies = CookieService.getCookie("token");

		if (tokenCookies != null) {
			UserService.getUserByToken(tokenCookies)
				.then((res) => {
					const user = res.data.user_info;
					dispatch(defineUser({ user }));
				})
				.catch((err) => {
					console.log(err);

					if (err.response.data.message == "invalid token") {
						CookieService.removeCookie("token");
					}
				});
		}
	}, []);

	return (
		<TemaProvider>
			<Router>
				<Routes>
					<Route element={<PageLayout />}>
						<Route path="/" element={<Home />} />
					</Route>
					<Route path="/signin" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
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
