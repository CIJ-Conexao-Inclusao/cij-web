import "./App.scss";
import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route /*Navigate, Outlet*/,
} from "react-router-dom";

import { PageLayout } from "./layout";

import Test from "./pages/Test/Test";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home";
import Charts from "./pages/Charts/Charts";
import Profile from "./pages/Profile/Profile"
import NotFound from "./pages/NotFound";

import TemaProvider from "./providers/ThemeProvider";

import { CookieService, UserService } from "./services";
import { defineUser } from "./redux/user/userSlice";
import { useAppDispatch } from "./redux/hooks";
import { ToastProvider } from "./hooks/useToast";
import { ROUTES } from "./constants";

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
			<ToastProvider>
				<Router>
					<Routes>
						<Route element={<PageLayout />}>
							<Route path={ROUTES.test} element={<Test />} />
							<Route path={ROUTES.home} element={<Home />} />
							<Route path={ROUTES.charts} element={<Charts />} />
							<Route path={ROUTES.profile} element={<Profile />} />
						</Route>
						<Route path={ROUTES.login} element={<SignIn />} />
						<Route path={ROUTES.signup} element={<SignUp />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</Router>
			</ToastProvider>
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
