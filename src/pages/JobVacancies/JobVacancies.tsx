import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, IconButton, MenuItem, Switch, Tooltip, Typography } from "@mui/material";
import {
  AgGridContainer,
  BoxInput,
  ButtonStyled,
  ContainerActions,
  ContainerAll,
  Content,
  FieldsContainer,
  HeaderContainer,
  InputStyled,
  SelectStyled,
} from "./JobVacancies.styled";

import "tailwindcss/tailwind.css";

import { Close, Refresh } from "@mui/icons-material";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import VacancyModal from "../../components/VacancyModal/VacancyModal";
import { ROUTES } from "../../constants";
import { DisabilitiesTypesDesc } from "../../constants/disabilityTypesDesc";
import { ROLES } from "../../constants/ROLES";
import { VacancyAreas } from "../../constants/vacancyAreas";
import { useFontSize } from "../../hooks/useFontSize";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";
import { useToast } from "../../hooks/useToast";
import { useAppSelector } from "../../redux/hooks";
import { CookieService } from "../../services";
import CompanyService from "../../services/CompanyService";
import JobService, {
  IGetVacancyParams,
  VacancyContractType,
} from "../../services/JobService";
import { TCompany } from "../../types/TCompany";

interface IVacancyRowData {
  id: number;
  company: string;
  area: string;
  title: string;
  contract_type: string;
  disabilities: {
    category: string;
    description: string;
  }[];
}

const Jobs: React.FC = () => {
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);
  const navigate = useNavigate();
  const role = CookieService.getRole();
  const { fontSizeConfig: fsc } = useFontSize();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { themeMode } = useSwitchTheme();
  const { i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState<TCompany[]>([]);

  const [name, setName] = useState<string>("");
  const [debouncedName, setDebouncedName] = useState<string>(name);
  const [type, setType] = useState<string>("");
  const [deficiency, setDeficiency] = useState({ id: 0, name: "" });
  const [area, setArea] = useState<string>("");
  const [company, setCompany] = useState<string | number>("");
  const [myApplies, setMyApplies] = useState<boolean>(false);

  const [rowData, setRowData] = useState<IVacancyRowData[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);

  const colDefs: ColDef<IVacancyRowData>[] = useMemo(
    () => [
      { headerName: t("vacancyScreen.company"), field: "company" },
      { headerName: t("vacancyScreen.area"), field: "area" },
      { headerName: t("vacancyScreen.vacancy"), field: "title" },
      { headerName: t("vacancyScreen.type"), field: "contract_type" },
      {
        headerName: t("vacancyScreen.disability"),
        field: "disabilities",
        cellRenderer: (params: any) => {
          const list = params.value.map((e: any) =>
            t("disabilityTypes." + e.category.toLowerCase())
          );

          const uniqueList = [...new Set(list)].filter(Boolean);

          return (
            <Tooltip
              title={
                params.value.map((e: any) => e.description).join(", ") ||
                t("vacancyScreen.noDisability")
              }>
              <span>
                {uniqueList.join(", ") || t("vacancyScreen.noDisability")}
              </span>
            </Tooltip>
          );
        },
      },
    ],
    [t]
  );

  const userRole = useMemo(() => {
    let userRoleAux = ROLES.PERSON;

    if (role != null) userRoleAux = role;

    return userRoleAux;
  }, [role]);

  const agGridTheme = useMemo(() => {
    return themeMode === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark";
  }, [themeMode]);

  const handleOnGridReady = (params: any) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const handleClose = (_: {}, reason: string) => {
    if (reason === "backdropClick") return;

    setShowModal(false);
  };

  const handleRowClick = (data: IVacancyRowData | undefined) => {
    if (!data) return;
    navigate(`${ROUTES.jobVacancies}/${data.id}`);
  };

  const hanldeOnDisabilityChange = (e: any) => {
    const index = DisabilitiesTypesDesc.findIndex(
      (f) => f.Description === e.target.value
    );

    setDeficiency({
      id: index + 1,
      name: e.target.value,
    });
  };

  const onRefresh = () => {
    getVacancies();
  };

  const onClear = () => {
    setName("");
    setType("");
    setDeficiency({ id: 0, name: "" });
    setArea("");
    setCompany(userRole === ROLES.COMPANY && user?.id ? user.id : 0);
    setMyApplies(false);
  };

  const getVacancyFilters = () => {
    const filters: IGetVacancyParams = {
      per_page: 100,
      page: 0,
    };

    if (name) filters.search_text = debouncedName;
    if (type) filters.contract_type = type;
    if (typeof deficiency === "object" && deficiency.id != 0)
      filters.disability_id = deficiency.id;
    if (area) filters.area = area;
    if (typeof company === "number" && company) filters.company_id = company;
    if (myApplies && user?.id) filters.candidate_id = user.id;

    if (userRole === ROLES.COMPANY && user?.id) filters.company_id = user.id;

    return filters;
  };

  const getVacancies = async () => {
    try {
      const filters = getVacancyFilters();

      const res = await JobService.Get(filters);

      const data = res.data.map((e) => {
        return {
          id: e.id || 0,
          company: e.company,
          area: t("areas." + e.area),
          title: e.title,
          contract_type: t("contractType." + e.contract_type),
          disabilities: e.disabilities
            ? e.disabilities.map((d) => ({
                category: d.category,
                description: d.description,
              }))
            : [],
        } as IVacancyRowData;
      });

      setRowData(data);
    } catch (error: any) {
      if (error.code == "ERR_CANCELED") return;

      if (error.response?.status === 404) {
        return;
      }

      showToast("error", "Falha ao listar vagas");
    }
  };

  const getCompanies = async () => {
    try {
      if (userRole === ROLES.COMPANY && user?.id) {
        const res = await CompanyService.getById(user.id);
        setCompanies([res.data.data]);
        setCompany(user.id);
        return;
      }

      const res = await CompanyService.get();
      setCompanies(res.data.data);
    } catch (error: any) {
      if (error.response.status === 404) {
        setCompanies([]);
        return;
      }
      showToast("error", "Falha ao listar empresas");
    }
  };

  const handleOnSaveVacancy = () => {
    getVacancies();
    setShowModal(false);
  };

  useEffect(() => {
    if (gridApi && rowData) gridApi.sizeColumnsToFit();
  }, [rowData]);

  useEffect(() => {
    getVacancies();
  }, [debouncedName, type, deficiency, area, company, i18n.language, myApplies]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(name);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  useEffect(() => {
    getCompanies();
    getVacancies();
  }, [user]);

  return (
    <>
      {showModal && (
        <VacancyModal
          open={showModal}
          onClose={handleClose}
          onSaveAction={handleOnSaveVacancy}
        />
      )}
      <ContainerAll>
        <HeaderContainer>
          <Typography
            color="primary.main"
            fontSize={fsc.veryBig}
            fontWeight={600}>
            {t("jobVacancies")}
          </Typography>

          {userRole == ROLES.COMPANY && (
            <ButtonStyled
              disableElevation
              variant="contained"
              onClick={() => setShowModal(true)}>
              <Typography fontSize={fsc.medium}>{t("add")}</Typography>
            </ButtonStyled>
          )}
        </HeaderContainer>
        <FieldsContainer>
          <Box display="flex" gap={2}>
            <Box flex="1">
              <BoxInput>
                <Typography fontSize={fsc.default} fontWeight={600}>
                  {t("name")}
                </Typography>
                <InputStyled
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                />
              </BoxInput>
            </Box>

            <Box flex="1">
              <BoxInput>
                <Typography fontSize={fsc.default} fontWeight={600}>
                  {t("vacancyType")}
                </Typography>
                <SelectStyled
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  size="small">
                  {Object.values(VacancyContractType).map((type: string) => (
                    <MenuItem key={type} value={type}>
                      {t("contractType." + type)}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </BoxInput>
            </Box>
            <Box flex="1">
              <BoxInput>
                <Typography fontSize={fsc.default} fontWeight={600}>
                  {t("disability")}
                </Typography>
                <SelectStyled
                  value={deficiency.name || ""}
                  onChange={hanldeOnDisabilityChange}
                  size="small">
                  {Object.values(DisabilitiesTypesDesc).map(
                    (disability, index) => (
                      <MenuItem key={index} value={disability.Description}>
                        {disability.Description}
                      </MenuItem>
                    )
                  )}
                </SelectStyled>
              </BoxInput>
            </Box>
          </Box>

          <Box display="flex" gap={2} mb={2}>
            <Box flex="1">
              <BoxInput>
                <Typography fontSize={fsc.default} fontWeight={600}>
                  {t("vacancy.area")}
                </Typography>
                <SelectStyled
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  size="small">
                  {Object.values(VacancyAreas).map((area: string) => (
                    <MenuItem key={area} value={area}>
                      {t("areas." + area)}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </BoxInput>
            </Box>

            <Box flex="1">
              <BoxInput>
                <Typography fontSize={fsc.default} fontWeight={600}>
                  {t("company")}
                </Typography>
                <SelectStyled
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={userRole === ROLES.COMPANY}
                  size="small">
                  {companies.map((item: TCompany) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.cnpj + " - " + item.name}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </BoxInput>
            </Box>

            <Box>
              <BoxInput>
                <Typography fontSize={fsc.default} fontWeight={600}>
                  {t("myApplies")}
                </Typography>
                <Switch
                  checked={myApplies}
                  onChange={() => setMyApplies(!myApplies)}
                />
            </BoxInput>
            </Box>

            <ContainerActions>
              <IconButton onClick={onRefresh} color="primary">
                <Refresh />
              </IconButton>

              <IconButton onClick={onClear} color="primary">
                <Close />
              </IconButton>
            </ContainerActions>
          </Box>
        </FieldsContainer>

        <Content>
          <AgGridContainer className={agGridTheme}>
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              rowSelection={"single"}
              onGridReady={handleOnGridReady}
              overlayNoRowsTemplate={t("noRowsToShow")}
              onRowClicked={(e) => handleRowClick(e.data)}
            />
          </AgGridContainer>
        </Content>
      </ContainerAll>
    </>
  );
};

export default Jobs;
