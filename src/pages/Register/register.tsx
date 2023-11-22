
import * as React from "react";
import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import "./Login.css";

import logo from "./assets/logo.png";

import patrocinio from "./assets/patrocinio.png";

import cij from "./assets/cij.png";

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
      <box className="h-screen">
        <box className="flex">
          <box className="w-6/12 bg-blue-600">
            <box className="h-1/10 flex justify-center">
              <img src="Img/Logo inteira branca.png" alt="Logo" />
            </box>
            <box className="flex justify-center items-center h-9/10">
              <img src="Img/Vector - Background (1).png" alt="Family Inclusive" />
            </box>
          </box>
          <box className="w-6/12">
            <box className="h-1/3 flex justify-center items-center">
              <Typography variant="h2" style={{ fontFamily: 'Open Sans', fontWeight: 800, color: '#000', display: 'flex', justifyContent: 'center' }}>
                Crie sua conta
              </Typography>
            </box>
            <box className="flex justify-center">
              <Typography style={{ fontFamily: 'Lato', color: '#000', display: 'flex', justifyContent: 'center' }}>
                Forneça alguns dados para criar sua conta no CIJ
              </Typography>
            </box>
            <box className="flex flex-col">
              <TextField label="Nome completo" placeholder="Digite seu nome completo" />
              <TextField label="E-mail" placeholder="Digite seu e-mail" />
              <RadioButtonGroup
                label="Gênero"
                options={[
                  { value: 'masculino', label: 'Masculino' },
                  { value: 'feminino', label: 'Feminino' },
                  { value: 'outro', label: 'Outro' },
                ]}
              />
              <TextField label="Telefone" placeholder="Digite seu telefone" />
              <TextField label="Endereço" placeholder="Digite seu endereço" />
              <TextField label="CPF" placeholder="Digite seu CPF" />
              <TextField label="Senha" placeholder="Digite sua senha" />
            </box>
            <box className="flex justify-center mt-2">
              <Button variant="contained" color="primary" fullWidth>
                Cadastrar
              </Button>
            </box>
            <box className="flex justify-center mt-2">
              <Typography style={{ fontFamily: 'Lato', color: '#000', display: 'flex', justifyContent: 'center' }}>
                Já possui uma conta?
              </Typography>
              <a href="#" className="text-blue-600 font-bold ml-2">Login</a>
            </box>
          </box>
        </box>
      </box>
    );
  };  
}