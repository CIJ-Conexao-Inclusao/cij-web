// import React from "react";
import * as React from "react";
import { useState } from "react";


import { Box, Button } from '@mui/material';
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, Inputs, BoxButtons, PrimaryButton, TypographyH3 } from "./Signup.styled";

import InputAdornment from '@mui/material/InputAdornment';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';


import logo from "./assets/logo.png";
import cij from "./assets/cij.png";


// import { ILogin } from "../../interfaces";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <BoxRightColumn>
        <BoxLogoImage>
          <img src={cij} alt="Logo" />
        </BoxLogoImage>

        <BoxBackgroundImage>
          <img src={logo} alt="Background" />
        </BoxBackgroundImage>
      </BoxRightColumn>

      <BoxLeftColumn>
        <BoxTitle>
          <TypographyH3 id="title" variant="h3">
            Crie sua conta
          </TypographyH3>
          <p>Forneça alguns dados para criar sua conta no CIJ</p>
        </BoxTitle>

        <BoxInputs>
          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <Checkbox checked={true} sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="Cadastro de empresa"
            required
            name="empresa"
          />

          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <PersonCircleIcon sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="Nome completo"
            required
            name="nome_completo"
          />

          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <CpfCircleIcon sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="CPF"
            required
            name="cpf"
          />

          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <GenderCircleIcon sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="Gênero"
            required
            name="genero"
          />

          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <PhoneCircleIcon sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="Celular"
            required
            name="celular"
          />

          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <EmailCircleIcon sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="Email"
            required
            name="email"
          />

          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <LockCircleIcon sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="Senha"
            required
            name="senha"
          />

          <Inputs
            sx={{ margin: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* <LockCircleIcon sx={{ color: "#999999" }} /> */}
                </InputAdornment>
              )
            }}
            variant="outlined"
            placeholder="Confirmar senha"
            required
            name="confirmar_senha"
          />
        </BoxInputs>
        <BoxButtons>
          <PrimaryButton variant="contained" >Cadastrar</PrimaryButton>
          <p>Já possui uma conta? <a href="/signin">Login</a></p>
        </BoxButtons>
      </BoxLeftColumn>
    </Box>
  );
};

export default Signup;
