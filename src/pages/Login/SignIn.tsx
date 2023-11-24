import * as React from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import { ILogin } from "../../interfaces";

// import LoginService from "../../services/LoginService";

import { Box } from '@mui/material';
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, Inputs, BoxButtons, PrimaryButton, BoxCompanies } from "./SignIn.styled";

import InputAdornment from '@mui/material/InputAdornment';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import "./SignIn.scss";
// import "../../App.scss"

import logoWhiteFull from "../../assets/logo-white-full.png";
import signInBackground from "./assets/sign-in-background.png";
import duasRodas from "./assets/companies/duas-rodas.png";
import grupoMalwee from "./assets/companies/grupo-malwee.png";
import marisol from "./assets/companies/marisol.png";
import prefeitura from "./assets/companies/prefeitura.png";
import urbano from "./assets/companies/urbano.png";
import weg from "./assets/companies/weg.png";


const SignIn = () => {
  // const navigate = useNavigate();
  const [tipoSenha, setTipoSenha] = useState("password");
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
    if (tipoSenha == "text") {
      setTipoSenha("password");
    } else {
      setTipoSenha("text");
    }
  }

  return (
    <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <BoxRightColumn>
        <BoxLogoImage>
          <img id="logo-white-full" src={logoWhiteFull} alt="Logo" />
        </BoxLogoImage>
        <BoxBackgroundImage>
          <img id="sign-in-background" src={signInBackground} alt="Background" />
        </BoxBackgroundImage>
      </BoxRightColumn>
      <BoxLeftColumn>
        <BoxTitle>
          <p className="big-title">Bem vindo(a)!</p>
          <p className="little-text">Insira suas credencias para acessar sua conta</p>
        </BoxTitle>
        <BoxInputs>
          <Inputs variant="outlined" placeholder="Email" name="email" /* onChange={handledChange} */ size="small" required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailOutlinedIcon sx={{ color: "#999" }} />
                </InputAdornment>
              )
            }}
          />
          <Inputs variant="outlined" placeholder="Senha" name="senha" type={tipoSenha} size="small" required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#999" }} />
                </InputAdornment>
              ),
              endAdornment: (
                tipoSenha == "text" ? <VisibilityOffOutlinedIcon onClick={mostrarSenha} sx={{ color: "#999", cursor: "pointer" }} />
                  : <VisibilityOutlinedIcon onClick={mostrarSenha} sx={{ color: "#999", cursor: "pointer" }} />
              )
            }}
          />
        </BoxInputs>
        <BoxButtons>
          <PrimaryButton variant="contained" startIcon={<LoginOutlinedIcon />}>Entrar</PrimaryButton>
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

export default SignIn;