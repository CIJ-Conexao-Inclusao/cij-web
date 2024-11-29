import React, { useState } from "react";

import { Box } from "@mui/material";
import { BoxLeftColumn, BoxRightColumn, BoxTab } from "./Profile.styled";

import PersonalData from "./Tabs/PersonalData/PersonalData";
import Settings from "./Tabs/Settings/Settings";

const Profile = () => {
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <Box className="px-4 mt-10">
      <p className="title">Meu perfil</p>

      <Box sx={{ display: "flex", width: "100%" }}>
        <BoxLeftColumn>
          <BoxTab
            onClick={() => {
              setTabSelected(0);
            }}>
            {tabSelected == 0 ? (
              <p style={{ color: "#004AAD" }}>Dados pessoais</p>
            ) : (
              <p>Dados pessoais</p>
            )}
          </BoxTab>

          <BoxTab
            onClick={() => {
              setTabSelected(1);
            }}>
            {tabSelected == 1 ? (
              <p style={{ color: "#004AAD" }}>Configurações</p>
            ) : (
              <p>Configurações</p>
            )}
          </BoxTab>
        </BoxLeftColumn>

        <BoxRightColumn>
          {tabSelected == 0 && <PersonalData />}
          {tabSelected == 1 && <Settings />}
        </BoxRightColumn>
      </Box>
    </Box>
  );
};

export default Profile;
