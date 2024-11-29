import { MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFontSize } from "../../../../hooks/useFontSize";
import { useAppSelector } from "../../../../redux/hooks";
import { UserService } from "../../../../services";
import { TUserById } from "../../../../types/TUserForm";
import {
  BoxInput,
  ContainerFields,
  ContainerFieldsSameLine,
  FieldsSection,
  InputStyled,
  SelectStyled,
} from "./PersonalData.styled";

const PersonalData = () => {
  const { fontSizeConfig: fsc } = useFontSize();
  const { t } = useTranslation();
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

  const [userData, setUserData] = useState({} as TUserById);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const id = user?.id;

      if (!id) {
        return;
      }

      const res = await UserService.GetById(user?.id);

      console.log("aqui", res);
      setUserData(res);
      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <ContainerFields>
      <FieldsSection>
        <Typography fontSize={fsc.big} fontWeight={600}>
          {t("profile.geral")}
        </Typography>
        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.fullName")}</Typography>
          <InputStyled
            value={userData.name}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.cpf")}</Typography>
          <InputStyled
            value={userData.cpf}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.gender")}</Typography>
          <InputStyled
            value={userData.gender}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.phone")}</Typography>
          <InputStyled
            value={userData.phone}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.email")}</Typography>
          <InputStyled
            value={userData.user.email}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>
      </FieldsSection>

      <FieldsSection>
        <Typography fontSize={fsc.big} fontWeight={600}>
          {t("profile.address")}
        </Typography>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.cep")}</Typography>
          <InputStyled
            value={userData.address.zip_code}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.country")}</Typography>
          <InputStyled
            value={userData.address.country}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.state")}</Typography>
          <InputStyled
            value={userData.address.state}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>{t("profile.city")}</Typography>
          <InputStyled
            value={userData.address.city}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <BoxInput>
          <Typography fontSize={fsc.medium}>
            {t("profile.neighborhood")}
          </Typography>
          <InputStyled
            value={userData.address.neighborhood}
            variant="outlined"
            size="small"
            required
          />
        </BoxInput>

        <ContainerFieldsSameLine>
          <BoxInput sx={{ flex: "4" }}>
            <Typography fontSize={fsc.medium}>{t("profile.street")}</Typography>
            <InputStyled
              value={userData.address.street}
              variant="outlined"
              size="small"
              required
            />
          </BoxInput>

          <BoxInput sx={{ flex: "1" }}>
            <Typography fontSize={fsc.medium}>{t("profile.number")}</Typography>
            <InputStyled
              value={userData.address.number}
              variant="outlined"
              size="small"
              required
            />
          </BoxInput>
        </ContainerFieldsSameLine>
      </FieldsSection>

      <FieldsSection>
        <Typography fontSize={fsc.big} fontWeight={600}>
          {t("profile.disability")}
        </Typography>

        <BoxInput>
          <Typography fontSize={fsc.medium}>
            {t("profile.disabilityType")}
          </Typography>
          <SelectStyled
            value={userData.disabilities[0].category.toLocaleLowerCase()}
            variant="outlined"
            size="small"
            required>
            {Object.values(t("disabilityType")).map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </SelectStyled>
        </BoxInput>
      </FieldsSection>
    </ContainerFields>
  );
};

export default PersonalData;
