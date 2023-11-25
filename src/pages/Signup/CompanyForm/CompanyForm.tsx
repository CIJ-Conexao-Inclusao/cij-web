import { useState } from "react";
import TCompany from "../../../types/TCompany";
import { companySchema } from "../../../validations";
import { TToast } from "../../../types";
import CompanyService from "../../../services/CompanyService";
import Toast from "../../../components/Toast";
import { Button, TextField } from "@mui/material";

const CompanyForm = () => {
  const [company, setCompany] = useState<Omit<TCompany, "id">>({
    cnpj: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [feedback, setFeedback] = useState<TToast>({
    open: false,
    message: "",
    severity: "success",
  });

  const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleOnFeedbackClose = () => {
    setFeedback({ ...feedback, open: false });
  };

  const createCompany = () => {
    companySchema
      .validate(company)
      .then(() => {
        if (company.password !== confirmPassword) {
          setFeedback({
            ...feedback,
            open: true,
            message: "As senhas não coincidem",
            severity: "error",
          });
          return;
        }

        CompanyService.create(company).then(() => {
          setFeedback({
            ...feedback,
            open: true,
            message: "Empresa criada com sucesso",
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
      <Toast
        open={feedback.open}
        message={feedback.message}
        severity={feedback.severity}
        onClose={handleOnFeedbackClose}
      />
      <TextField
        variant="standard"
        placeholder="Nome Completo"
        name="name"
        value={company.name}
        onChange={handledChange}
      />
      <TextField
        variant="standard"
        placeholder="CNPJ"
        name="cnpj"
        value={company.cnpj}
        onChange={handledChange}
      />
      <TextField
        variant="standard"
        placeholder="Telefone"
        name="phone"
        value={company.phone}
        onChange={handledChange}
      />
      <TextField
        variant="standard"
        placeholder="Domínio"
        name="email"
        value={company.email}
        onChange={handledChange}
      />
      <TextField
        variant="standard"
        placeholder="Senha"
        type="password"
        name="password"
        value={company.password}
        onChange={handledChange}
      />
      <TextField
        variant="standard"
        placeholder="Confirmar senha"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" disableElevation onClick={createCompany}>
        Sign up
      </Button>
    </div>
  );
};

export default CompanyForm;