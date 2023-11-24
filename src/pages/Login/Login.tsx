import * as React from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import { ILogin } from "../../interfaces";

// import LoginService from "../../services/LoginService";

import { Box } from '@mui/material';
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, Inputs, BoxButtons, PrimaryButton, BoxCompanies } from "./Login.styled";

import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import "./Login.scss";
import "../../App.scss"

import logoWhiteFull from "../../assets/logo-white-full.png";
import loginBackground from "./assets/sign-in-background.png";
import duasRodas from "./assets/companies/duas-rodas.png";
import grupoMalwee from "./assets/companies/grupo-malwee.png";
import marisol from "./assets/companies/marisol.png";
import prefeitura from "./assets/companies/prefeitura.png";
import urbano from "./assets/companies/urbano.png";
import weg from "./assets/companies/weg.png";


const Login = () => {
  // const navigate = useNavigate();
  const [tipo, setTipo] = useState("password");
  // const [user, setUser] = useState<ILogin>({
  //   email: "",
  //   password: "",
  // });

  // const login = async () => {
  //   // const res = await LoginService.login(user);
  //   navigate("/signup");
  // };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, email: e.target.value });
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, password: e.target.value });
  // };

  function mostrarSenha() {
    if (tipo == "text") {
      setTipo("password");
    } else {
      setTipo("text");
    }
  }
  
  return (
    <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <BoxRightColumn>
        <BoxLogoImage>
          <img src={logoWhiteFull} alt="Logo" />
        </BoxLogoImage>

        <BoxBackgroundImage>
          <img src={loginBackground} alt="Background" />
        </BoxBackgroundImage>
      </BoxRightColumn>

      <BoxLeftColumn>
        <BoxTitle>
          <p className="big-title">Bem vindo(a)!</p>
          <p className="little-text">Insira suas credencias para acessar sua conta</p>
        </BoxTitle>

        <BoxInputs>
          <Inputs
            variant="outlined" 
            placeholder="Email"
            name="email"
            /* onChange={handledChange} */
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailRoundedIcon sx={{ color: "#999999" }} />
                </InputAdornment>
                )
            }}
            size="small"
            required
            />

          <Inputs
            variant="outlined"
            placeholder="Senha" 
            name="senha" 
            type={tipo}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon sx={{ color: "#999999" }} />
                </InputAdornment>
              ),
              endAdornment: (
                tipo == "text" ? <VisibilityOffRoundedIcon onClick={mostrarSenha} sx={{ color: "#999999", cursor: "pointer" }} /> 
                : <VisibilityRoundedIcon onClick={mostrarSenha} sx={{ color: "#999999", cursor: "pointer" }} />
                )
              }}
            size="small"
            required
          />
        </BoxInputs>

        <BoxButtons>
          <PrimaryButton variant="contained" startIcon={<LoginRoundedIcon />}>
              Entrar
          </PrimaryButton>
            <p className="little-text">Não possui uma conta? <a href="/signup" className="link">Cadastrar-se</a></p>
        </BoxButtons>

        <BoxCompanies>
            <img className="companies" src={duasRodas} alt="Duas Rodas" />
            <img className="companies" src={grupoMalwee} alt="Grupo Malwee" />
            <img className="companies" src={marisol} alt="Marisol" />
            <img className="companies" src={prefeitura} alt="Prefeitura de Jaraguá do Sul" />
            <img className="companies" src={urbano} alt="Urbano" />
            <img className="companies" src={weg} alt="WEG" />
        </BoxCompanies>
      </BoxLeftColumn>
    </Box>
  );
};

export default Login;