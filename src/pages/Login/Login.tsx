import * as React from "react";
import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import "./Login.css";

import  logo  from "./assets/logo.png";

import patrocinio from "./assets/patrocinio.png";

import cij from "./assets/cij.png";

import { ILogin } from "../../interfaces";

// import LoginService from "../../services/LoginService";

const Login = () => {
  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });

  // const login = async () => {
  //   const res = await LoginService.login(user);
  // };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, email: e.target.value });
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, password: e.target.value });
  // };

  return (
    <div className="body">
      <div className="left">
        <div className="phrases">
          <div>
            <h1>Bem Vindo</h1>
          </div>

          <div>
            <h3>Faça seu login abaixo</h3>
          </div>
        </div>

        <div className="container">
          <div className="center">
            <div className="label">
              <label htmlFor="CPF">CPF</label>
            </div>

            <input type="text"/>
          </div>

          <div className="center-top">
            <div className="label">
              <label htmlFor="Senha">Senha</label>
            </div>

            <input type="password"/>
          </div>

          <div className="top-5">
            <div className="center-top">
              <button className="button-login">
                Login
              </button>
            </div>

            <div className="center-top-2">
              <button className="button-register">
                Cadastrar
              </button>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="post-footer">
            <div className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </div>

            <div className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </div>

            <div className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </div>

            <div className="circle-logo">
              <img className="patrocinio" src={patrocinio} />
            </div>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="img-logo">
          <img className="logo" src={cij} />
        </div>

        <div className="image-login">
          <img className="family-inclusive" src={logo} />
        </div>
      </div>
    </div>
  );
};

export default Login;