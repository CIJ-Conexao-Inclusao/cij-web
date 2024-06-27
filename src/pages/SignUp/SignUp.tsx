import { Box, FormControl, FormLabel } from "@mui/material";
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, BoxButtons } from "./SignUp.styled";
import { Inputs, PrimaryButton } from "../../App.styled";
import PersonalData from "./Steps/PersonalData/PersonalData.tsx";
import Disability from "./Steps/Disability/Disability.tsx";
import Address from "./Steps/Address/Address.tsx";

import "./SignUp.scss";

import logoWhiteFull from "../../assets/logo-white-full.png";
import signUpBackground from "./assets/sign-up-background.png";

import { userSchema } from "../../validations/index.ts";

import { GENDER, ROUTES } from "../../constants/index.ts";
import { TUserForm } from "../../types/index.ts";

import { UserService } from "../../services/index.ts";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast.tsx";
import { useTranslation } from "react-i18next";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Stepper, Step, StepLabel, Button, TextField, RadioGroup, FormControlLabel, Radio, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

import InputMask from 'react-input-mask';


const steps = ['Dados Pessoais', 'Deficiência', 'Endereço'];

const SignUp = () => {
	const [activeStep, setActiveStep] = useState(0);
    const { handleSubmit, control, watch, setValue } = useForm();
    const [cepData, setCepData] = useState(null);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const handleCepBlur = async () => {
        const cep = watch('cep');
        if (cep && cep.replace(/\D/g, '').length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (response.data) {
                    setValue('pais', 'Brasil');
                    setValue('estado', response.data.uf);
                    setValue('cidade', response.data.localidade);
                    setValue('bairro', response.data.bairro);
                    setValue('rua', response.data.logradouro);
                }
            } catch (error) {
                console.error('Erro ao buscar o CEP:', error);
            }
        }
    };

	// const signUp = () => {
	// 	userSchema
	// 		.validate(user)
	// 		.then(() => {
	// 			if (user.password !== confirmPassword) {
	// 				toast.showToast("error", "As senhas não coincidem");
	// 				return;
	// 			}

	// 			UserService.create(user)
	// 				.then(() => {
	// 					toast.showToast(
	// 						"success",
	// 						"Usuário criado com sucesso"
	// 					);
	// 					navigate(ROUTES.signIn);
	// 				})
	// 				.catch((err) => {
	// 					console.log("err: ", err);
	// 					toast.showToast("error", "Erro ao criar usuário");
	// 				});
	// 		})
	// 		.catch((err) => {
	// 			toast.showToast("error", err.errors[0]);
	// 		});
	// };

	return (
		<Box sx={{ display: "flex" }}>
			<BoxLeftColumn>
				<BoxLogoImage>
					<img
						id="logo-white-full"
						src={logoWhiteFull}
						alt={t("imgs.logo")}
					/>
				</BoxLogoImage>
				<BoxBackgroundImage>
					<img id="sign-up-background" src={signUpBackground} alt="Background"/>
				</BoxBackgroundImage>
			</BoxLeftColumn>
			<BoxRightColumn>
			<form onSubmit={handleSubmit(onSubmit)}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === 0 && (
                <>
                    <Controller
                        name="nome"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Nome Completo" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="cpf"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputMask mask="999.999.999-99" {...field} maskChar={null}>
                                {(inputProps: any) => <TextField {...inputProps} label="CPF" fullWidth margin="normal" />}
                            </InputMask>
                        )}
                    />
                    <Controller
                        name="dataNascimento"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    {...field}
                                    label="Data de Nascimento"
                                    renderInput={(props: any) => <TextField {...props} fullWidth margin="normal" />}
                                />
                            </LocalizationProvider>
                        )}
                    />
                    <Controller
                        name="genero"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                                <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
                                <FormControlLabel value="outro" control={<Radio />} label="Outro" />
                            </RadioGroup>
                        )}
                    />
                    <Controller
                        name="celular"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputMask mask="(99) 99999-9999" {...field}>
                                {(inputProps: any) => <TextField {...inputProps} label="Celular" fullWidth margin="normal" />}
                            </InputMask>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="E-mail" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="senha"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} type="password" label="Senha" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="confirmarSenha"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} type="password" label="Confirmar Senha" fullWidth margin="normal" />}
                    />
                </>
            )}
            {activeStep === 1 && (
                <>
                    <Controller
                        name="tipoDeficiencia"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} select label="Tipo de Deficiência" fullWidth margin="normal">
                                <MenuItem value="auditiva">Auditiva</MenuItem>
                                <MenuItem value="fisica">Física</MenuItem>
                                <MenuItem value="intelectual">Intelectual</MenuItem>
                                <MenuItem value="psicossocial">Psicossocial</MenuItem>
                                <MenuItem value="visual">Visual</MenuItem>
                            </TextField>
                        )}
                    />
                    <Controller
                        name="deficiencia"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Deficiência" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="grauSubdivisao"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Grau/Subdivisão" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="deficienciaAdquirida"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                <FormControlLabel value="nao" control={<Radio />} label="Não" />
                            </RadioGroup>
                        )}
                    />
                </>
            )}
            {activeStep === 2 && (
                <>
                    <Controller
                        name="cep"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <InputMask mask="99999-999" {...field}>
                                {(inputProps: any) => <TextField {...inputProps} label="CEP" fullWidth margin="normal" onBlur={handleCepBlur} />}
                            </InputMask>
                        )}
                    />
                    <Controller
                        name="pais"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="País" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="estado"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Estado" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="cidade"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Cidade" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="bairro"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Bairro" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="rua"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Rua" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="numero"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Número" fullWidth margin="normal" />}
                    />
                    <Controller
                        name="complemento"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Complemento" fullWidth margin="normal" />}
                    />
                </>
            )}
            <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    Voltar
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
            </div>
        </form>
			</BoxRightColumn>
		</Box>
	);
};

export default SignUp;
