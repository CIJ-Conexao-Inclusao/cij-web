import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../redux/hooks";

import Toast from "../../components/Toast";

import { TLogin, TToast } from "../../types";

import LoginService from "../../services/LoginService";
import { defineUser } from "../../redux/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<TLogin>({
    email: "cauakathdev@gmail.com",
    password: "1234",
  });

  const [feedback, setFeedback] = useState<TToast>({
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

      dispatch(defineUser({ user: res.data.user_info }));

      navigate("/");
    } catch (error: any) {
      let message: string = "Email ou senha incorretos";

      setFeedback({
        ...feedback,
        open: true,
        message: message,
        severity: "error",
      });

      console.log(error);
    }
  };

  // ************************************ End Functions ************************************ //

  // ************************************ Handlers ************************************ //

  const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
          required
          name="email"
          value={user.email}
          onChange={handledChange}
        />
        <TextField
          variant="standard"
          placeholder="Senha"
          type="password"
          required
          name="password"
          value={user.password}
          onChange={handledChange}
        />
        <Button variant="contained" disableElevation onClick={login}>
          Login
        </Button>
      </div>
    </Box>
  );
};

export default Login;
