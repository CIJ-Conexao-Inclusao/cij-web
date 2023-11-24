// import React from "react";
import * as React from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import { ILogin } from "../../interfaces";

import { Box, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, Inputs, BoxButtons, PrimaryButton, BoxRadios} from "./Signup.styled";

import InputAdornment from '@mui/material/InputAdornment';

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// import "../../App.scss"

import logoWhiteFull from "../../assets/logo-white-full.png";
import signUpBackground from "./assets/sign-up-background.png";

const SignUp = () => {
  const [tipoSenha, setTipoSenha] = useState("password");
  const [tipoConfirmarSenha, setTipoConfirmarSenha] = useState("password");

  function mostrarSenha() {
    if (tipoSenha == "text") {
      setTipoSenha("password");
    } else {
      setTipoSenha("text");
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <BoxRightColumn>
        <BoxLogoImage>
          <img id="logo-white-full" src={logoWhiteFull} alt="Logo" />
        </BoxLogoImage>
        <BoxBackgroundImage>
          <img id="sign-up-background" src={signUpBackground} alt="Background" />
        </BoxBackgroundImage>
      </BoxRightColumn>
      <BoxLeftColumn>
        <BoxTitle>
          <p className="big-title">Crie sua conta</p>
          <p className="little-text">Forneça alguns dados para criar sua conta no CIJ</p>
        </BoxTitle>
        <BoxInputs>
          <Inputs variant="outlined" placeholder="Nome completo" name="nome-completo" size="small" required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlinedIcon sx={{ color: "#999" }} />
                </InputAdornment>
              )
            }}
          />
          <Inputs variant="outlined" placeholder="CPF" name="cpf" size="small" required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlinedIcon sx={{ color: "#999" }} />
                </InputAdornment>
              )
            }}
          />
          <BoxRadios>
            <FormLabel id="demo-radio-buttons-group-label">Gênero</FormLabel>
            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
              <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
              <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
              <FormControlLabel value="outro" control={<Radio />} label="Outro" />
            </RadioGroup>
          </BoxRadios>
          <Inputs variant="outlined" placeholder="Celular" name="celular" size="small" required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneOutlinedIcon sx={{ color: "#999" }} />
                </InputAdornment>
              )
            }}
          />
          <Inputs variant="outlined" placeholder="Email" name="email" size="small" required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailOutlinedIcon sx={{ color: "#999" }} />
                </InputAdornment>
              )
            }}
          />
          <Inputs variant="outlined" placeholder="Senha" name="senha" size="small" required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#999" }} />
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
          <PrimaryButton variant="contained" >Cadastrar</PrimaryButton>
          <p className="little-text">Já possui uma conta? <a href="/signin" className="link">Login</a></p>
        </BoxButtons>
      </BoxLeftColumn>
    </Box>
  );
};

export default SignUp;
