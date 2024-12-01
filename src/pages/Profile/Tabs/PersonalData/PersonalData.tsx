import { Close, Download, UploadFile } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactInputMask from "react-input-mask";
import api from "../../../../api";
import Loading from "../../../../components/Loading/Loading";
import { DisabilitiesTypesDesc } from "../../../../constants/disabilityTypesDesc";
import { useFontSize } from "../../../../hooks/useFontSize";
import { useToast } from "../../../../hooks/useToast";
import { useAppSelector } from "../../../../redux/hooks";
import { UserService } from "../../../../services";
import ViaCepService from "../../../../services/ViaCepService";
import { TUserById } from "../../../../types/TUserForm";
import {
  ActionsContainer,
  BoxInput,
  ButtonStyled,
  ContainerFields,
  ContainerFieldsSameLine,
  FieldsSection,
  Grid,
  InputStyled,
  PaperCurriculum,
  ResumeBox,
  SelectStyled,
} from "./PersonalData.styled";

const PersonalData = () => {
  const { fontSizeConfig: fsc } = useFontSize();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

  const fileInput = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({} as TUserById);
  const [isLoading, setIsLoading] = useState(true);
  const [curriculum, setCurriculum] = useState<File | null>(null);

  const onChooseFile = () => {
    fileInput.current?.click();
  };

  const fetchData = async () => {
    const id = user?.id;

    if (!id) {
      return;
    }

    const res = await UserService.GetById(user?.id);

    setUserData(res);

    if (res.curriculum) {
      await getResume(res.curriculum);
    }

    setIsLoading(false);
  };

  const getResume = async (url: string) => {
    try {
      const response = await api.get(url, {
        responseType: "blob",
      });
      const blob = response.data;

      const file = new File([blob], "resume.pdf", { type: blob.type });
      setCurriculum(file);
    } catch (err) {
      console.log("error getting file", err);
    }
  };

  const onCancel = () => {
    fetchData();
  };

  const onSave = async () => {
    if (!user?.id) return;

    try {
      await Promise.all([
        UserService.UpdatePerson(user.id, userData),
        UserService.UpdateAddress(user.id, userData.address),
        UserService.UpdateDisabilities(user.id, userData.disabilities),
        curriculum
          ? UserService.UploadResume(user.id, curriculum as File)
          : () => {},
      ]);

      showToast("success", t("profile.successUpdate"));
    } catch (err) {
      showToast("error", t("profile.errorUpdate"));
      console.error(err);
    }
  };

  const onCepBlur = async () => {
    if (userData.address.zip_code.length < 8) return;

    const cep = userData.address.zip_code.replace(/\D/g, "");

    const data = await ViaCepService.GetAddress(cep);
    if (!data) return;

    setUserData({
      ...userData,
      address: {
        ...userData.address,
        street: data.logradouro,
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        country: "Brasil",
      },
    });
  };

  const onDisabilityChange = (e: SelectChangeEvent<any>) => {
    const disabilityIdx = DisabilitiesTypesDesc.findIndex(
      (disability) => disability.Description === e.target.value
    );

    if (disabilityIdx == -1) return;

    const disability = DisabilitiesTypesDesc[disabilityIdx];

    setUserData({
      ...userData,
      disabilities: [
        {
          acquired: userData.disabilities[0].acquired,
          category: disability.Category,
          rate: disability.Rate,
          description: disability.Description,
          id: disabilityIdx + 1,
        },
      ],
    });
  };

  const onDragFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setFile(file);
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) return;

    setFile(file);
  };

  const setFile = (file: File) => {
    if (!isFileValid(file)) {
      removeCurriculum();
      return;
    }

    setCurriculum(file);
  };

  const isFileValid = (file: File) => {
    if (file.type !== "application/pdf") {
      showToast("warning", t("fileTypePdf"));
      return false;
    }

    return true;
  };

  const removeCurriculum = () => {
    setCurriculum(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const downloadFile = () => {
    if (!curriculum) return;

    const url = URL.createObjectURL(curriculum);
    const a = document.createElement("a");
    a.href = url;
    a.download = curriculum.name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <>
      <input
        ref={fileInput}
        onChange={onChangeFileInput}
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
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>{t("profile.cpf")}</Typography>
              <ReactInputMask
                mask={"999.999.999-99"}
                value={userData.cpf}
                disabled>
                {
                  /* @ts-ignore */
                  (inputProps: any) => (
                    <InputStyled variant="outlined" size="small" disabled />
                  )
                }
              </ReactInputMask>
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
              <ReactInputMask
                mask={"(99) 99 99999-9999"}
                value={userData.phone}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }>
                {
                  /*@ts-ignore */
                  (inputProps: any) => (
                    <InputStyled variant="outlined" size="small" />
                  )
                }
              </ReactInputMask>
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
              <ReactInputMask
                mask={"99999-999"}
                value={userData.address.zip_code}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: {
                      ...userData.address,
                      zip_code: e.target.value.replace(/\D/g, ""),
                    },
                  })
                }
                onBlur={onCepBlur}>
                {
                  /* @ts-ignore */
                  (inputProps: any) => (
                    <InputStyled variant="outlined" size="small" />
                  )
                }
              </ReactInputMask>
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>
                {t("profile.country")}
              </Typography>
              <InputStyled
                value={userData.address.country}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, country: e.target.value },
                  })
                }
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
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, state: e.target.value },
                  })
                }
                variant="outlined"
                size="small"
              />
            </BoxInput>

            <BoxInput>
              <Typography fontSize={fsc.medium}>{t("profile.city")}</Typography>
              <InputStyled
                value={userData.address.city}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData.address, city: e.target.value },
                  })
                }
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
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: {
                      ...userData.address,
                      neighborhood: e.target.value,
                    },
                  })
                }
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
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      address: { ...userData.address, street: e.target.value },
                    })
                  }
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
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      address: { ...userData.address, number: e.target.value },
                    })
                  }
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
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: {
                      ...userData.address,
                      complement: e.target.value,
                    },
                  })
                }
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
                onChange={onDisabilityChange}
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
                value={t(
                  "disabilityTypes." +
                    userData.disabilities[0].category.toLocaleLowerCase()
                )}
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
            {!curriculum ? (
              <BoxInput
                onDragOver={onDragFile}
                onDragEnter={onDragFile}
                onDrop={onDropFile}>
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
            ) : (
              <PaperCurriculum elevation={0}>
                <Typography fontSize={fsc.medium} color="color03.main">
                  {curriculum.name}
                </Typography>

                <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
                  <Typography fontSize={fsc.medium} color="color03.main">
                    {curriculum.type}
                  </Typography>

                  <IconButton onClick={downloadFile}>
                    <Download />
                  </IconButton>

                  <IconButton onClick={removeCurriculum}>
                    <Close />
                  </IconButton>
                </Box>
              </PaperCurriculum>
            )}
          </FieldsSection>

          <ActionsContainer>
            <ButtonStyled
              onClick={onCancel}
              variant="outlined"
              disableElevation>
              {t("profile.cancel")}
            </ButtonStyled>

            <ButtonStyled onClick={onSave} variant="contained" disableElevation>
              {t("profile.save")}
            </ButtonStyled>
          </ActionsContainer>
        </ContainerFields>
      </Grid>
    </>
  );
};

export default PersonalData;
