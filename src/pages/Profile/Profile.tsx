import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import { BoxLeftColumn, BoxRightColumn, BoxTab } from "./Profile.styled";

import { useFontSize } from "../../hooks/useFontSize";
import PersonalData from "./Tabs/PersonalData/PersonalData";
import Settings from "./Tabs/Settings/Settings";

const Profile = () => {
  const { fontSizeConfig: fsc } = useFontSize();

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
              <Typography color="primary" fontSize={fsc.big}>
                Dados pessoais
              </Typography>
            ) : (
              <Typography fontSize={fsc.big}>Dados pessoais</Typography>
            )}
          </BoxTab>

          <BoxTab
            onClick={() => {
              setTabSelected(1);
            }}>
            {tabSelected == 1 ? (
              <Typography color="primary" fontSize={fsc.big}>
                Configurações
              </Typography>
            ) : (
              <Typography fontSize={fsc.big}>Configurações</Typography>
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
