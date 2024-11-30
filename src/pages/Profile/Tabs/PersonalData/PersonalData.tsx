import { UploadFile } from "@mui/icons-material";
import { MenuItem, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DisabilitiesTypesDesc } from "../../../../constants/disabilityTypesDesc";
import { useFontSize } from "../../../../hooks/useFontSize";
import { useAppSelector } from "../../../../redux/hooks";
import { UserService } from "../../../../services";
import { TUserById } from "../../../../types/TUserForm";
import {
  BoxInput,
  ButtonStyled,
  ContainerFields,
  ContainerFieldsSameLine,
  FieldsSection,
  Grid,
  InputStyled,
  ResumeBox,
  SelectStyled,
} from "./PersonalData.styled";

const PersonalData = () => {
  const { fontSizeConfig: fsc } = useFontSize();
  const { t } = useTranslation();
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

  const fileInput = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({} as TUserById);
  const [isLoading, setIsLoading] = useState(true);

  const onChooseFile = () => {
    fileInput.current?.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = user?.id;

      if (!id) {
        return;
      }

      const res = await UserService.GetById(user?.id);

      setUserData(res);
      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <>
      <input
        ref={fileInput}
        type="file"
        id="file"
        style={{ display: "none" }}
      />
      <Grid>
        <ContainerFields>
          <FieldsSection>
            <Typography fontSize={fsc.big} fontWeight={600}>
              {t("profile.geral")}
            </Typography>
            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.fullName")}
              </Typography>
              <InputStyled
                value={userData.name}
                variant="outlined"
                size="small"
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>{t("profile.cpf")}</Typography>
              <InputStyled
                value={userData.cpf}
                variant="outlined"
                size="small"
                disabled
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.gender")}
              </Typography>
              <InputStyled
                value={t("profile." + userData.gender)}
                variant="outlined"
                size="small"
                disabled
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.phone")}
              </Typography>
              <InputStyled
                value={userData.phone}
                variant="outlined"
                size="small"
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.email")}
              </Typography>
              <InputStyled
                value={userData.user.email}
                variant="outlined"
                size="small"
                disabled
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
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.country")}
              </Typography>
              <InputStyled
                value={userData.address.country}
                variant="outlined"
                size="small"
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.state")}
              </Typography>
              <InputStyled
                value={userData.address.state}
                variant="outlined"
                size="small"
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>{t("profile.city")}</Typography>
              <InputStyled
                value={userData.address.city}
                variant="outlined"
                size="small"
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
              />
            </BoxInput>

            <ContainerFieldsSameLine>
              <BoxInput sx={{ flex: "4" }}>
                <Typography fontSize={fsc.medium}>
                  {t("profile.street")}
                </Typography>
                <InputStyled
                  value={userData.address.street}
                  variant="outlined"
                  size="small"
                />
              </BoxInput>

              <BoxInput sx={{ flex: "1" }}>
                <Typography fontSize={fsc.medium}>
                  {t("profile.number")}
                </Typography>
                <InputStyled
                  value={userData.address.number}
                  variant="outlined"
                  size="small"
                />
              </BoxInput>
            </ContainerFieldsSameLine>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.complement")}
              </Typography>
              <InputStyled
                value={userData.address.complement}
                variant="outlined"
                size="small"
              />
            </BoxInput>
          </FieldsSection>
        </ContainerFields>
        <ContainerFields>
          <FieldsSection>
            <Typography fontSize={fsc.big} fontWeight={600}>
              {t("profile.disability")}
            </Typography>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.disability")}
              </Typography>
              <SelectStyled
                value={userData.disabilities[0].description}
                variant="outlined"
                size="small"
                required>
                {DisabilitiesTypesDesc.map((disabilityType, index) => (
                  <MenuItem key={index} value={disabilityType.Description}>
                    {disabilityType.Description}
                  </MenuItem>
                ))}
              </SelectStyled>
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.disabilityType")}
              </Typography>
              <InputStyled
                value={userData.disabilities[0].category}
                variant="outlined"
                size="small"
                disabled
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>{t("profile.grau")}</Typography>
              <InputStyled
                value={userData.disabilities[0].rate}
                variant="outlined"
                size="small"
                disabled
              />
            </BoxInput>
          </FieldsSection>

          <FieldsSection>
            <Typography fontSize={fsc.big} fontWeight={600}>
              {t("profile.resume")}
            </Typography>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.attachPDF")}
              </Typography>

              <ResumeBox>
                <UploadFile fontSize="large" color="disabled" />

                <Typography fontSize={fsc.medium} color="color03.main">
                  {t("profile.attachPdfMessage")}
                </Typography>

                <Typography fontSize={fsc.medium} color="color03.main">
                  {t("profile.or")}
                </Typography>

                <ButtonStyled
                  onClick={onChooseFile}
                  variant="contained"
                  disableElevation>
                  {t("profile.chooseFile")}
                </ButtonStyled>
              </ResumeBox>
            </BoxInput>
          </FieldsSection>
        </ContainerFields>
      </Grid>
    </>
  );
};

export default PersonalData;
