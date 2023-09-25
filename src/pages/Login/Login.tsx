import * as React from "react";
import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import { ILogin } from "../../interfaces";
import { useNavigate } from "react-router-dom";

// import LoginService from "../../services/LoginService";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });

  const login = async () => {
    // const res = await LoginService.login(user);
    navigate("/signup");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  return (
    <Box className="flex flex-col">
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
