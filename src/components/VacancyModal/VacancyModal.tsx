import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DisabilitiesTypesDesc } from "../../constants/disabilityTypesDesc";
import { VacancyAreas } from "../../constants/vacancyAreas";
import { VacancySections } from "../../constants/vacancySections";
import { useFontSize } from "../../hooks/useFontSize";
import { useToast } from "../../hooks/useToast";
import { useAppSelector } from "../../redux/hooks";
import JobService, {
  IVacancyCreate,
  IVacancyCreateBody,
  VacancyContractType,
  VacancyRequirementType,
} from "../../services/JobService";
import {
  BottomRequirement,
  BoxForm,
  BoxInput,
  BoxInputs,
  BoxItem,
  BoxRequirements,
  ButtonNavigation,
  ButtonStyled,
  ContainerRequirement,
  FormContent,
  FormFooter,
  FormHeader,
  InputStyled,
  ModalContainer,
  ResponsibilitiesField,
  ResponsibilitiesForm,
  SelectStyled,
} from "./VacancyModal.styled";

export interface IVacancyModalProps {
  open: boolean;
  onClose: any;
}

const VacancyModal: React.FC<IVacancyModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { fontSizeConfig: fsc } = useFontSize();
  const { showToast } = useToast();

  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["geral", "requirements", "responsibilities", "skills"];

  const [vacancy, setVacancy] = useState({
    area: "",
    code: "",
    contract_type: VacancyContractType.clt,
    department: "",
    description: "",
    disabilities: [],
    publish_date: "",
    registration_date: "",
    requirements: [],
    responsabilities: [],
    section: "",
    skills: [],
    title: "",
    turn: "",
  } as IVacancyCreate);

  const [newReq, setNewReq] = useState("");
  const [newReqType, setNewReqType] = useState(
    VacancyRequirementType.desirable
  );
  const [newRes, setNewRes] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const allFieldsFilled = useMemo(() => {
    return (
      !vacancy.area ||
      !vacancy.code ||
      !vacancy.contract_type ||
      !vacancy.department ||
      !vacancy.description ||
      !vacancy.disabilities ||
      !vacancy.publish_date ||
      !vacancy.registration_date ||
      !vacancy.requirements ||
      !vacancy.responsabilities ||
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

  const addRequirement = () => {
    if (!newReq) return;

    setVacancy({
      ...vacancy,
      requirements: [
        ...vacancy.requirements,
        { requirement: newReq, type: newReqType },
      ],
    });
    setNewReq("");
  };

  const addResponsibilities = () => {
    if (!newRes) return;

    setVacancy({
      ...vacancy,
      responsabilities: [...vacancy.responsabilities, newRes],
    });
    setNewRes("");
  };

  const addSkill = () => {
    if (!newSkill) return;

    setVacancy({
      ...vacancy,
      skills: [...vacancy.skills, newSkill],
    });
    setNewSkill("");
  };

  const onSave = async () => {
    try {
      if (!fieldsValid()) return;

      const data: IVacancyCreateBody = { ...vacancy, company_id: 0 };
      data.publish_date = format(new Date(data.publish_date), "yyyy-MM-dd");
      data.registration_date = format(
        new Date(data.registration_date),
        "yyyy-MM-dd"
      );
      data.company_id = user?.id || 0;

      await JobService.Create(data);
      showToast("success", t("successVacancyCreation"));
    } catch (e: any) {
      showToast("error", t("errorOnVacancyCreation"));
    }
  };

  const fieldsValid = () => {
    if (vacancy.requirements.length === 0) {
      showToast("error", t("vacancyRequirementsError"));
      return false;
    }

    if (vacancy.responsabilities.length === 0) {
      showToast("error", t("vacancyResponsibilitiesError"));
      return false;
    }

    if (vacancy.skills.length === 0) {
      showToast("error", t("vacancySkillsError"));
      return false;
    }

    return true;
  };

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
                        {t("areas." + area)}
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
                        {t("sector." + section)}
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
                    value={vacancy.contract_type || ""}
                    name="contract_type"
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
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.disabilities")}
                  </Typography>
                  <SelectStyled
                    value={vacancy.disabilities || ""}
                    multiple
                    name="disabilities"
                    onChange={handleSelectChange}>
                    {Object.values(DisabilitiesTypesDesc).map((type, index) => (
                      <MenuItem key={index} value={index}>
                        {t(
                          "disabilityTypes." + type.Category.toLocaleLowerCase()
                        )}{" "}
                        - {type.Description}
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
                    name="publish_date"
                    value={vacancy.publish_date}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>

                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.registrationDate")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    type="date"
                    name="registration_date"
                    value={vacancy.registration_date}
                    onChange={handleVacancyChange}
                    size="small"
                    required
                  />
                </BoxInput>
              </BoxInputs>
            </BoxForm>
          )}
          {activeStep === 1 && (
            <BoxForm>
              <ContainerRequirement>
                <BoxInput>
                  <Typography fontSize={fsc.medium}>
                    {t("vacancy.requirements")}
                  </Typography>
                  <InputStyled
                    variant="outlined"
                    value={newReq}
                    onChange={(e) => setNewReq(e.target.value)}
                    size="small"
                  />
                </BoxInput>

                <BottomRequirement>
                  <SelectStyled
                    value={newReqType}
                    onChange={(e) => setNewReqType(e.target.value)}>
                    {Object.values(VacancyRequirementType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {t(`vacancyRequirementType.${type}`)}
                      </MenuItem>
                    ))}
                  </SelectStyled>

                  <ButtonStyled
                    disableElevation
                    variant="contained"
                    onClick={addRequirement}
                    sx={{}}>
                    <Typography fontSize={fsc.medium}>{t("add")}</Typography>
                  </ButtonStyled>
                </BottomRequirement>
              </ContainerRequirement>

              <Divider />

              <BoxRequirements>
                {vacancy.requirements.map((req, index) => (
                  <BoxItem key={index}>
                    <Box>
                      <Typography fontSize={fsc.medium}>
                        {req.requirement}
                      </Typography>
                      <Typography fontSize={fsc.medium} fontWeight={600}>
                        {t(`vacancyRequirementType.${req.type}`)}
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => {
                        setVacancy({
                          ...vacancy,
                          requirements: vacancy.requirements.filter(
                            (_, i) => i !== index
                          ),
                        });
                      }}>
                      <CloseIcon />
                    </IconButton>
                  </BoxItem>
                ))}
              </BoxRequirements>
            </BoxForm>
          )}
          {activeStep === 2 && (
            <BoxForm>
              <ResponsibilitiesForm>
                <Typography fontSize={fsc.medium}>
                  {t("vacancy.responsibilities")}
                </Typography>
                <ResponsibilitiesField>
                  <InputStyled
                    variant="outlined"
                    value={newRes}
                    onChange={(e) => setNewRes(e.target.value)}
                    size="small"
                  />
                  <ButtonStyled
                    disableElevation
                    variant="contained"
                    onClick={addResponsibilities}>
                    <Typography fontSize={fsc.medium}>{t("add")}</Typography>
                  </ButtonStyled>
                </ResponsibilitiesField>
              </ResponsibilitiesForm>

              <Divider />

              <BoxRequirements>
                {vacancy.responsabilities.map((value, index) => (
                  <BoxItem key={index}>
                    <Typography fontSize={fsc.medium}>{value}</Typography>
                    <IconButton
                      onClick={() => {
                        setVacancy({
                          ...vacancy,
                          responsabilities: vacancy.responsabilities.filter(
                            (_, i) => i !== index
                          ),
                        });
                      }}>
                      <CloseIcon />
                    </IconButton>
                  </BoxItem>
                ))}
              </BoxRequirements>
            </BoxForm>
          )}

          {activeStep === 3 && (
            <BoxForm>
              <ResponsibilitiesForm>
                <Typography fontSize={fsc.medium}>
                  {t("vacancy.skills")}
                </Typography>
                <ResponsibilitiesField>
                  <InputStyled
                    variant="outlined"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    size="small"
                  />
                  <ButtonStyled
                    disableElevation
                    variant="contained"
                    onClick={addSkill}>
                    <Typography fontSize={fsc.medium}>{t("add")}</Typography>
                  </ButtonStyled>
                </ResponsibilitiesField>
              </ResponsibilitiesForm>

              <Divider />

              <BoxRequirements>
                {vacancy.skills.map((value, index) => (
                  <BoxItem key={index}>
                    <Typography fontSize={fsc.medium}>{value}</Typography>
                    <IconButton
                      onClick={() => {
                        setVacancy({
                          ...vacancy,
                          skills: vacancy.skills.filter((_, i) => i !== index),
                        });
                      }}>
                      <CloseIcon />
                    </IconButton>
                  </BoxItem>
                ))}
              </BoxRequirements>
            </BoxForm>
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
