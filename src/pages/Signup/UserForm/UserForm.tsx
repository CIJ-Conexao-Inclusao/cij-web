import React, { useState } from "react";

import Toast from "../../../components/Toast";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

import { userSchema } from "../../../validations";

import TUser, { GENDER } from "../../../types/TUser";
import { TToast } from "../../../types";

import { UserService } from "../../../services";

const UserForm = () => {
  const [user, setUser] = useState<Omit<TUser, "id">>({
    cpf: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: GENDER.Male,
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [feedback, setFeedback] = useState<TToast>({
    open: false,
    message: "",
    severity: "success",
  });

  const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnFeedbackClose = () => {
    setFeedback({ ...feedback, open: false });
  };

  const signUp = () => {
    userSchema
      .validate(user)
      .then(() => {
        if (user.password !== confirmPassword) {
          setFeedback({
            ...feedback,
            open: true,
            message: "As senhas não coincidem",
            severity: "error",
          });
          return;
        }

        UserService.create(user).then(() => {
          setFeedback({
            ...feedback,
            open: true,
            message: "Usuário criado com sucesso",
            severity: "success",
          });
        });
      })
      .catch((err) => {
        setFeedback({
          ...feedback,
          open: true,
          message: err.errors[0],
          severity: "error",
        });
      });
  };

  return (
    <div className="flex flex-col w-64 p-2 gap-2">
      <Toast open={feedback.open} message={feedback.message} severity={feedback.severity} onClose={handleOnFeedbackClose}/>
      
      <TextField variant="standard" placeholder="Nome Completo" name="name" value={user.name} onChange={handledChange}/>
      
      <TextField variant="standard" placeholder="CPF" name="cpf" value={user.cpf} onChange={handledChange}/>
      
      <FormControl>
        <FormLabel>Gênero</FormLabel>

        <RadioGroup defaultValue={GENDER.Female} name="gender" value={user.gender} onChange={handledChange}>
          <FormControlLabel value={GENDER.Female} control={<Radio />} label="Feminino"/>

          <FormControlLabel value={GENDER.Male} control={<Radio />} label="Masculino"/>
          
          <FormControlLabel value={GENDER.Other} control={<Radio />} label="Outros"/>
        </RadioGroup>
      </FormControl>

      <TextField variant="standard" placeholder="Celular" name="phone" value={user.phone} onChange={handledChange}/>
      
      <TextField variant="standard" placeholder="Email" name="email" value={user.email} onChange={handledChange}/>
      
      <TextField variant="standard" placeholder="Senha" type="password" name="password" value={user.password} onChange={handledChange}/>
      
      <TextField variant="standard" placeholder="Confirmar senha" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
      
      <Button variant="contained" disableElevation onClick={signUp}>
        Sign up
      </Button>
    </div>
  );
};

export default UserForm;