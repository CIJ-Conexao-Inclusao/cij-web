import * as React from "react";
import { useState } from "react";

import { Box, Button, Container, Grid, Input, Typography } from '@mui/material';

import "./Login.css";

import logo from "./assets/logo.png";

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
    <Box display="flex" height="100%">
      <Box width="65%" bgcolor="#004AAD">
        <Box height="10%" display="flex" justifyContent="center" alignItems="center">
          <img src={cij} alt="Logo" style={{ height: '75%' }} />
        </Box>
        <Box height="90%" display="flex" justifyContent="center" alignItems="center">
          <img src={logo} alt="Family Inclusive" style={{ height: '65%' }} />
        </Box>
      </Box>
      <Box width="35%" display="grid" alignItems="center">
        <Container>
          <Box>
            <Box>
              <Typography variant="h2" textAlign="center">
                Bem-Vindo(a)!
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="subtitle1">
                  Insira suas credenciais para acessar sua conta
                </Typography>
              </Box>
            </Box>
            <Box>
              <Container>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box className="center">
                      <Input type="text" />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="center-top">
                      <Input type="password" />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="top-5">
                      <Box className="center-top">
                        <Box className="button-login">
                          <img
                            style={{ width: '2vw', height: '3vh' }}
                            src=""
                            alt="Login"
                          />
                          <Button variant="contained" color="primary">
                            Entrar
                          </Button>
                        </Box>
                      </Box>
                      <Box className="center-top-2">
                        <Box display="flex" justifyContent="center" alignItems="center" columnGap="5px">
                          <Typography>
                            Não possui uma conta?
                          </Typography>
                          <a href="">Cadastre-se</a>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box className="footer">
              <Box className="post-footer">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <Box key={index} className="circle-logo">
                    <img src={patrocinio} alt={`Patrocinio ${index}`} className="patrocinio" />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;