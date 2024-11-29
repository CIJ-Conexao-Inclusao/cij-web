import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, MenuItem, Typography } from "@mui/material";
import {
  AgGridContainer,
  BoxInput,
  ButtonStyled,
  ContainerAll,
  Content,
  FieldsContainer,
  HeaderContainer,
  InputStyled,
  SelectStyled,
} from "./JobVacancies.styled";

import "tailwindcss/tailwind.css";

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import VacancyModal from "../../components/VacancyModal/VacancyModal";
import { DisabilityTypes } from "../../constants/disabilityTypes";
import { ROLES } from "../../constants/ROLES";
import { VacancyAreas } from "../../constants/vacancyAreas";
import { useFontSize } from "../../hooks/useFontSize";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";
import { useToast } from "../../hooks/useToast";
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
  disabilities: string[];
}

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const role = CookieService.getRole();
  const { fontSizeConfig: fsc } = useFontSize();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { themeMode } = useSwitchTheme();

  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState<TCompany[]>([]);

  const [name, setName] = useState<string>("");
  const [debouncedName, setDebouncedName] = useState<string>(name);
  const [type, setType] = useState<string>("");
  const [deficiency, setDeficiency] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [company, setCompany] = useState(0);

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
        cellRenderer: (params: any) =>
          params.value
            .map((e: string) => t("disabilityTypes." + e.toLowerCase()))
            .join(", ") || t("vacancyScreen.noDisability"),
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
    console.log(data);
    if (!data) return;
    navigate(`/vacancy/${data.id}`);
  };

  const getVacancyFilters = () => {
    const filters: IGetVacancyParams = {
      perPage: 100,
      page: 0,
    };

    if (name) filters.search_text = debouncedName;
    if (type) filters.contract_type = type;
    if (deficiency) filters.disability = deficiency;
    if (area) filters.area = area;
    if (company) filters.company_id = company;

    return filters;
  };

  const getVacancies = async () => {
    try {
      const filters = getVacancyFilters();

      const res = await JobService.Get(filters);
      console.log(res.data);

      const data = res.data.map((e) => {
        return {
          id: e.id || 0,
          company: e.company,
          area: e.area,
          title: e.title,
          disabilities: e.disabilities
            ? e.disabilities.map((d) => d.category)
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

  useEffect(() => {
    if (gridApi && rowData) gridApi.sizeColumnsToFit();
  }, [rowData]);

  useEffect(() => {
    getCompanies();
    getVacancies();
  }, []);

  useEffect(() => {
    getVacancies();
  }, [debouncedName, type, deficiency, area, company]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(name);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  return (
    <>
      {showModal && <VacancyModal open={showModal} onClose={handleClose} />}
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
                  {t("disabilityType")}
                </Typography>
                <SelectStyled
                  value={deficiency}
                  onChange={(e) => setDeficiency(e.target.value)}
                  size="small">
                  {Object.values(DisabilityTypes).map((disability: string) => (
                    <MenuItem key={disability} value={disability}>
                      {t("disabilityTypes." + disability)}
                    </MenuItem>
                  ))}
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
                  size="small">
                  {companies.map((item: TCompany) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.cnpj + " - " + item.name}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </BoxInput>
            </Box>
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
