import {
  MenuItem,
  Modal,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { VacancyAreas } from "../../constants/vacancyAreas";
import { VacancySections } from "../../constants/vacancySections";
import { useFontSize } from "../../hooks/useFontSize";
import { IVacancyCreate, VacancyContractType } from "../../services/JobService";
import {
  BoxForm,
  BoxInput,
  BoxInputs,
  ButtonNavigation,
  ButtonStyled,
  FormContent,
  FormFooter,
  FormHeader,
  InputStyled,
  ModalContainer,
  SelectStyled,
} from "./VacancyModal.styled";

export interface IVacancyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const VacancyModal: React.FC<IVacancyModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const { fontSizeConfig: fsc } = useFontSize();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["geral", "requirements", "responsibilities", "skills"];

  const [vacancy, setVacancy] = useState({
    area: "",
    code: "",
    contractType: VacancyContractType.clt,
    department: "",
    description: "",
    disabilities: [],
    publishDate: "",
    registrationDate: format(new Date(), "yyyy-MM-dd"),
    requirements: [],
    responsibilities: [],
    section: "",
    skills: [],
    title: "",
    turn: "",
  } as IVacancyCreate);

  const allFieldsFilled = useMemo(() => {
    return (
      !vacancy.area ||
      !vacancy.code ||
      !vacancy.contractType ||
      !vacancy.department ||
      !vacancy.description ||
      !vacancy.disabilities ||
      !vacancy.publishDate ||
      !vacancy.registrationDate ||
      !vacancy.requirements ||
      !vacancy.responsibilities ||
      !vacancy.section ||
      !vacancy.skills ||
      !vacancy.title ||
      !vacancy.turn
    );
  }, [vacancy]);

  const handleVacancyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVacancy({ ...vacancy, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setVacancy({ ...vacancy, [e.target.name]: e.target.value as string });
  };

  useEffect(() => {
    console.log(vacancy);
  }, [vacancy]);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <FormHeader>
          <Typography
            variant="h6"
            component="h2"
            color={"primary"}
            fontWeight={700}>
            {t("addVacancy")}
          </Typography>

          <Stepper sx={{ width: "100%" }} activeStep={activeStep}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{t(`formVacancy.${label}`)}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </FormHeader>
        <FormContent>
          {activeStep === 0 && (
            <BoxForm>
              <BoxInputs>
                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.title")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="title"
                    value={vacancy.title}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.code")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="code"
                    value={vacancy.code}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.area")}
                  </Typography>
                  <SelectStyled
                    value={vacancy.area || ""}
                    name="area"
                    onChange={handleSelectChange}>
                    {VacancyAreas.map((area) => (
                      <MenuItem key={area} value={area}>
                        {t(area)}
                      </MenuItem>
                    ))}
                  </SelectStyled>
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.section")}
                  </Typography>
                  <SelectStyled
                    value={vacancy.section || ""}
                    name="section"
                    onChange={handleSelectChange}>
                    {VacancySections.map((section) => (
                      <MenuItem key={section} value={section}>
                        {t(section)}
                      </MenuItem>
                    ))}
                  </SelectStyled>
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.description")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="description"
                    value={vacancy.description}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.turn")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="turn"
                    value={vacancy.turn}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.contractType")}
                  </Typography>
                  <SelectStyled
                    value={vacancy.contractType || ""}
                    name="contractType"
                    onChange={handleSelectChange}>
                    {Object.values(VacancyContractType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {t(`contractType.${type}`)}
                      </MenuItem>
                    ))}
                  </SelectStyled>
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.department")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    name="department"
                    value={vacancy.department}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  {/* TODO: Disability types */}
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.disabilities")}
                  </Typography>
                  <SelectStyled
                    value={vacancy.disabilities || ""}
                    multiple
                    name="disabilities"
                    onChange={handleSelectChange}>
                    {Object.values(VacancyContractType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {t(`contractType.${type}`)}
                      </MenuItem>
                    ))}
                  </SelectStyled>
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.publishDate")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    type="date"
                    name="publishDate"
                    value={vacancy.publishDate}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>
              </BoxInputs>
            </BoxForm>
          )}
          {activeStep === 1 && (
            <div>
              <Typography>{t("formVacancy.requirements")}</Typography>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <Typography>{t("formVacancy.skills")}</Typography>
            </div>
          )}
        </FormContent>
        <FormFooter>
          <ButtonStyled disableElevation variant="outlined" onClick={onClose}>
            <Typography fontSize={fsc.medium}>{t("cancel")}</Typography>
          </ButtonStyled>
          <ButtonNavigation>
            <ButtonStyled
              disableElevation
              variant="outlined"
              onClick={() => setActiveStep(activeStep - 1)}
              disabled={activeStep === 0}>
              <Typography fontSize={fsc.medium}>{t("back")}</Typography>
            </ButtonStyled>
            {activeStep !== steps.length - 1 ? (
              <ButtonStyled
                disableElevation
                variant="contained"
                onClick={() => setActiveStep(activeStep + 1)}
                sx={{ width: "50%" }}>
                <Typography fontSize={fsc.medium}>{t("next")}</Typography>
              </ButtonStyled>
            ) : (
              <ButtonStyled
                disableElevation
                disabled={allFieldsFilled}
                variant="contained"
                onClick={onSave}
                sx={{ width: "50%" }}>
                <Typography fontSize={fsc.medium}>{t("create")}</Typography>
              </ButtonStyled>
            )}
          </ButtonNavigation>
        </FormFooter>
      </ModalContainer>
    </Modal>
  );
};

export default VacancyModal;
