import * as React from "react";
import { useState } from "react";

import { Box, Button } from '@mui/material';
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, Inputs, BoxButtons, PrimaryButton, TypographyH3 } from "./Login.styled";

import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import "./Login.css";

import logo from "./assets/logo.png";
import patrocinio from "./assets/patrocinio.png";
import cij from "./assets/cij.png";

import { ILogin } from "../../interfaces";
import { useNavigate } from "react-router-dom";

// import LoginService from "../../services/LoginService";

const Login = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("password");
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

  function mostrarSenha() {
    if (tipo == "text") {
      setTipo("password");
    } else {
      setTipo("text");
    }
  }

  return (
    // <Box display="flex" height="100%">
    //   <Box width="65%" bgcolor="#004AAD">
    //     <Box height="10%" display="flex" justifyContent="center" alignItems="center">
    //       <img src={cij} alt="Logo" style={{ height: '75%' }} />
    //     </Box>
    //     <Box height="90%" display="flex" justifyContent="center" alignItems="center">
    //       <img src={logo} alt="Family Inclusive" style={{ height: '65%' }} />
    //     </Box>
    //   </Box>
    //   <Box width="35%" display="grid" alignItems="center">
    //     <Container>
    //       <Box>
    //         <Box>
    //           <Typography variant="h2" textAlign="center">
    //             Bem-Vindo(a)!
    //           </Typography>
    //           <Box display="flex" justifyContent="center" alignItems="center">
    //             <Typography variant="subtitle1">
    //               Insira suas credenciais para acessar sua conta
    //             </Typography>
    //           </Box>
    //         </Box>
    //         <Box>
    //           <Container>
    //             <Grid container spacing={2}>
    //               <Grid item xs={12}>
    //                 <Box className="center">
    //                   <Input type="text" />
    //                 </Box>
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <Box className="center-top">
    //                   <Input type="password" />
    //                 </Box>
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <Box className="top-5">
    //                   <Box className="center-top">
    //                     <Box className="button-login">
    //                       <img
    //                         style={{ width: '2vw', height: '3vh' }}
    //                         src=""
    //                         alt="Login"
    //                       />
    //                       <Button variant="contained" color="primary">
    //                         Entrar
    //                       </Button>
    //                     </Box>
    //                   </Box>
    //                   <Box className="center-top-2">
    //                     <Box display="flex" justifyContent="center" alignItems="center" columnGap="5px">
    //                       <Typography>
    //                         Não possui uma conta?
    //                       </Typography>
    //                       <a href="">Cadastre-se</a>
    //                     </Box>
    //                   </Box>
    //                 </Box>
    //               </Grid>
    //             </Grid>
    //           </Container>
    //         </Box>
    //         <Box className="footer">
    //           <Box className="post-footer">
    //             {[1, 2, 3, 4, 5, 6].map((index) => (
    //               <Box key={index} className="circle-logo">
    //                 <img src={patrocinio} alt={`Patrocinio ${index}`} className="patrocinio" />
    //               </Box>
    //             ))}
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Container>
    //   </Box>
    // </Box>
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
            Bem vindo(a)!
          </TypographyH3>
          <p>Insira suas credencias para acessar sua conta</p>
        </BoxTitle>

        <BoxInputs>
          <Inputs
            sx={{ margin: 1.5}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailRoundedIcon sx={{ color: "#999999" }} />
                </InputAdornment>)
            }} 
            variant="outlined" 
            placeholder="Email"
            required
            name="email"
            value={user.email}
            /* onChange={handledChange} */
          />

          <Inputs
            sx={{ margin: 1.5}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon sx={{ color: "#999999" }} />
                </InputAdornment>),
              endAdornment: (
                tipo == "text" ? <VisibilityOffRoundedIcon onClick={mostrarSenha} sx={{ color: "#999999", cursor: "pointer" }} /> : <VisibilityRoundedIcon onClick={mostrarSenha} sx={{ color: "#999999", cursor: "pointer" }} />)
              }} variant="outlined" placeholder="Senha" 
              name="senha" 
              type={tipo}
          />
        </BoxInputs>

        <BoxButtons>
          <PrimaryButton variant="contained" startIcon={<LoginRoundedIcon />}>Entrar</PrimaryButton>
          <p>Não possui uma conta? <a href="/signup">Cadastrar-se</a></p>
        </BoxButtons>
      </BoxLeftColumn>
    </Box>
  );
};

export default Login;