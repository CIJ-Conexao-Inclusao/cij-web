import * as React from "react";
import { useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import "./Login.css";

import logo from './assets/Logo inteira branca.png'
import fundo from './assets/Vector - Background (1).png'

import { ILogin } from "../../interfaces";
import { useNavigate } from "react-router-dom";

// import LoginService from "../../services/LoginService";

const register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ILogin>({
    name: "",
    email: "",
    password: "",
    gener: "",
    phone: "",
    address: "",
    cpf: ""
  });

  const App = () => {
    return (
      <Box className="h-screen">
      <Box className="flex">
        <Box className="w-6/12 bg-blue-600">
          <Box className="h-1/10 flex justify-center">
            <img src={logo} alt="Logo" />
          </Box>
          <Box className="flex justify-center items-center h-9/10">
            <img src={fundo} alt="Family Inclusive" />
          </Box>
        </Box>
        <Box className="w-6/12">
          <Box className="h-1/3 flex justify-center items-center">
            <Typography variant="h2" style={{ fontFamily: 'Open Sans', fontWeight: 800, color: '#000', display: 'flex', justifyContent: 'center' }}>
              Crie sua conta
            </Typography>
          </Box>
          <Box className="flex justify-center">
            <Typography style={{ fontFamily: 'Lato', color: '#000', display: 'flex', justifyContent: 'center' }}>
              Forneça alguns dados para criar sua conta no CIJ
            </Typography>
          </Box>
          <Box className="flex flex-col">
            <TextField label="Nome completo" placeholder="Digite seu nome completo" />
            <TextField label="E-mail" placeholder="Digite seu e-mail" />
            {/* <RadioButtonGroup
              label="Gênero"
              options={[
                { value: 'masculino', label: 'Masculino' },
                { value: 'feminino', label: 'Feminino' },
                { value: 'outro', label: 'Outro' },
              ]}
            /> */}
            <TextField label="Telefone" placeholder="Digite seu telefone" />
            <TextField label="Endereço" placeholder="Digite seu endereço" />
            <TextField label="CPF" placeholder="Digite seu CPF" />
            <TextField label="Senha" placeholder="Digite sua senha" />
          </Box>
          <Box className="flex justify-center mt-2">
            <Button variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </Box>
          <Box className="flex justify-center mt-2">
            <Typography style={{ fontFamily: 'Lato', color: '#000', display: 'flex', justifyContent: 'center' }}>
              Já possui uma conta?
            </Typography>
            <a href="#" className="text-blue-600 font-bold ml-2">Login</a>
          </Box>
        </Box>
      </Box>
    </Box>
    );
  };  
}