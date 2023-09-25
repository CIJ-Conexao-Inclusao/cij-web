import * as React from "react";
import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import "./Login.css";

import  logo  from "./assets/logo.png";

import patrocinio from "./assets/patrocinio.png";

import cij from "./assets/cij.png";

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
    <Box className="flex h-screen w-screen">
      <Box className="left">
        <Box className="phrases">
          <Box>
            <h1>Bem Vindo</h1>
          </Box>

          <Box>
            <h3>Faça seu login abaixo</h3>
          </Box>
        </Box>

        <Box className="container">
          <Box className="center">
            <Box className="label">
              <label htmlFor="CPF">CPF</label>
            </Box>
            <TextField type="text"/>
          </Box>

          <Box className="center-top">
            <Box className="label">
              <label htmlFor="Senha">Senha</label>
            </Box>

            <TextField type="password"/>
          </Box>

          <Box className="top-5">
            <Box className="center-top">
              <button className="button-login">
                Login
              </button>
            </Box>

            <Box className="center-top-2">
              <button className="button-register">
                Cadastrar
              </button>
            </Box>
          </Box>
        </Box>

        <Box className="footer">
          <Box className="post-footer">
            <Box className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </Box>

            <Box className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </Box>

            <Box className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </Box>

            <Box className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="right">
        <Box className="img-logo">
          <img className="logo" src={cij} />
        </Box>

        <Box className="image-login">
          <img className="family-inclusive" src={logo} />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;