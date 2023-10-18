import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Cookies from "js-cookie";

import Toast from "../../components/Toast";

import { TLogin, TToast } from "../../types";

import LoginService from "../../services/LoginService";

const Login = () => {
  const navigate = useNavigate();

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
      Cookies.set("user", JSON.stringify(res.data.user_info));

      navigate("/");
    } catch (error: any) {
      let message: string = "Email ou senha incorretos";

      if (error.response.data.message != "email/password incorrects") {
        message = "Internal Server Error";
      }

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
          name="email" // !Important
          value={user.email} // !Important
          onChange={handledChange} // !Important
        />
        <TextField
          variant="standard"
          placeholder="Senha"
          name="password" // !Important
          value={user.password} // !Important
          onChange={handledChange} // !Important
        />
        <Button variant="contained" disableElevation onClick={login}>
          Login
        </Button>
      </div>
    </Box>
  );
};

export default Login;
