import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";

import { PageLayout } from "./layout";

import Charts from "./pages/Charts/Charts";
import Home from "./pages/Home/Home";
import JobVacancies from "./pages/JobVacancies/JobVacancies";
import JobVacancyDetails from "./pages/JobVacancyDetails/JobVacancyDetails";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Supporters from "./pages/Supporters/Supporters";

import { ROUTES } from "./constants";
import { FontSizeProvider } from "./hooks/useFontSize";
import { SwitchThemeProvider } from "./hooks/useSwitchTheme";
import { ToastProvider } from "./hooks/useToast";
import { useAppDispatch } from "./redux/hooks";
import { defineUser } from "./redux/user/userSlice";
import { CookieService, UserService } from "./services";

const App = () => {
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
		<SwitchThemeProvider>
			<ToastProvider>
				<FontSizeProvider>
					<Router>
						<Routes>
							<Route element={<PageLayout />}>
								<Route path={ROUTES.home} element={<Home />} />
								<Route
									path={ROUTES.charts}
									element={<Charts />}
								/>
								<Route
									path={ROUTES.jobVacancies}
									element={<JobVacancies />}
								/>
								<Route
									path={ROUTES.jobVacancyDetails}
									element={<JobVacancyDetails />}
								/>
								<Route
									path={ROUTES.supporters}
									element={<Supporters />}
								/>
								<Route
									path={ROUTES.profile}
									element={<Profile />}
								/>
							</Route>
							<Route path={ROUTES.signIn} element={<SignIn />} />
							<Route path={ROUTES.signUp} element={<SignUp />} />
							<Route path="/*" element={<NotFound />} />
						</Routes>
					</Router>
				</FontSizeProvider>
			</ToastProvider>
		</SwitchThemeProvider>
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
//   redirectPath = "/signIn",
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
