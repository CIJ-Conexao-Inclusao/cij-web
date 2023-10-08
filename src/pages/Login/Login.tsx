import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Cookies from "js-cookie";

import Toast from "../../components/Toast/Toast";

import { ILogin } from "../../interfaces";
import { IToast } from "../../interfaces/IToast";

import LoginService from "../../services/LoginService";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<ILogin>({
    email: "cauakathdev@gmail.com",
    password: "1234",
  });

  const [feedback, setFeedback] = useState<IToast>({
    open: false,
    message: "",
    severity: "success",
  });

  // ************************************ Functions ************************************ //

  const login = async () => {
    try {
      const res = await LoginService.login(user);
      delete res.data.user_info.password;

      Cookies.set("token", res.data.token);
      Cookies.set("user", JSON.stringify(res.data.user_info));

      navigate("/");
    } catch (error) {
      setFeedback({
        ...feedback,
        open: true,
        message: "Email ou senha incorretos",
        severity: "error",
      });

      console.log(error);
    }
  };

  // ************************************ End Functions ************************************ //

  // ************************************ Handlers ************************************ //

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleOnFeedbackClose = () => {
    setFeedback({ ...feedback, open: false });
  };

  // ************************************ End Handlers ************************************ //

  return (
    <Box className="flex flex-col">
      <Toast
        open={feedback.open}
        message={feedback.message}
        severity={feedback.severity}
        onClose={handleOnFeedbackClose}
      />
      <div className="flex flex-col">
        <TextField
          variant="standard"
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <TextField
          variant="standard"
          placeholder="Senha"
          onChange={handlePasswordChange}
        />
        <Button variant="contained" disableElevation onClick={login}>
          Login
        </Button>
      </div>
    </Box>
  );
};

export default Login;
