import { useState } from "react";

import { Box, Switch, Typography } from "@mui/material";

import UserForm from "./UserForm/UserForm";
import CompanyForm from "./CompanyForm/CompanyForm";

const Signup = () => {
  const [isCompanyForm, setIsCompanyForm] = useState<boolean>(false);

  return (
    <Box className="flex flex-col">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Box className="flex gap-2 items-center">
          <Switch
            value={isCompanyForm}
            onChange={() => setIsCompanyForm(!isCompanyForm)}
          />
          <Typography>Cadastro de Empresa</Typography>
        </Box>

        {!isCompanyForm ? <UserForm /> : <CompanyForm />}
      </div>
    </Box>
  );
};

export default Signup;
