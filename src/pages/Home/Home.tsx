import React, { useEffect, useMemo, useState } from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading/Loading";
import NewsModal from "../../components/NewsModal/NewsModal";
import { ROLES } from "../../constants/ROLES";
import { useFontSize } from "../../hooks/useFontSize";
import { CookieService } from "../../services";
import NewsService, { INews } from "../../services/NewsService";
import cadeirante from "./assets/cadeirante.png";
import filmagens from "./assets/filmagens.png";
import prefeitura from "./assets/prefeitura.png";
import {
  ButtonStyled,
  ContainerActions,
  ContainerNews,
  GridNews,
  MainNewsInfoContainer,
} from "./Home.styled";

const imagens = [prefeitura, cadeirante, filmagens];

const Titles = [
  {
    title: "Vem aí a 1ª Imersão Inclusiva PCD e Trabalho de Jaraguá do Sul",
  },
  {
    title:
      "Conselho do Trabalho promove palestras sobre inclusão em Jaraguá do Sul",
  },
  {
    title:
      "História de estilista surdo de Jaraguá do Sul é contada no Caldeirão do Huck",
  },
];

const Company = [
  {
    company: "SINDMET | 19/08/2023",
  },
  {
    company: "OCP News | 13/08/2023",
  },
  {
    company: "NSC Total | 07/08/2023",
  },
];

const Home = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { fontSizeConfig: fsc } = useFontSize();
  const [news, setNews] = useState<INews[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const role = CookieService.getRole();

  const handleClose = (_: {}, reason: string) => {
    if (reason === "backdropClick") return;

    setShowModal(false);
  };

  const chunkArray = (array: INews[], size: number = 4) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      const arrAux = array.slice(i, i + size);

      arrAux.forEach((item) => {
        console.log(
          new Date(item.date),
          new Date(item.date).toLocaleDateString(i18n.language)
        );
        item.date = new Date(item.date).toLocaleDateString(i18n.language);

        return item;
      });

      result.push(arrAux);
    }

    console.log(result);
    return result;
  };

  const getNews = async () => {
    try {
      const res = await NewsService.List();

      if (res.data && res.data.length > 0) setNews(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateNews = () => {
    setShowModal(false);
    getNews();
  };

  const userRole = useMemo(() => {
    let userRoleAux = ROLES.PERSON;

    if (role != null) userRoleAux = role;

    return userRoleAux;
  }, [role]);

  const newsFormatted = useMemo(() => {
    const arrCopy = JSON.parse(JSON.stringify(news));
    return chunkArray(arrCopy);
  }, [news, i18n]);

  useEffect(() => {
    getNews();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {showModal && (
        <NewsModal
          open={showModal}
          onClose={handleClose}
          onSaveAction={onCreateNews}
        />
      )}
      <ContainerActions>
        {userRole === ROLES.ADMIN && (
          <ButtonStyled
            onClick={() => setShowModal(true)}
            variant="contained"
            disableElevation>
            {t("home.create")}
          </ButtonStyled>
        )}
      </ContainerActions>
      <ContainerNews>
        {newsFormatted.length == 0 && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography fontSize={fsc.medium}>{t("home.noNews")}</Typography>
          </Box>
        )}
        {newsFormatted.map((arr) => (
          <>
            {arr[0] && (
              <Card sx={{ marginTop: 4 }}>
                <CardContent sx={{ display: "flex", gap: "1rem" }}>
                  <img
                    src={arr[0].banner}
                    alt="News"
                    style={{
                      width: "500px",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <MainNewsInfoContainer>
                    <Box>
                      <Typography fontSize={fsc.veryBig} fontWeight={600}>
                        {arr[0].title}
                      </Typography>

                      <Typography fontSize={fsc.medium}>
                        {arr[0].description}
                      </Typography>
                    </Box>

                    <Typography fontSize={fsc.small} color="color10.main">
                      {arr[0].author} | {arr[0].date}
                    </Typography>
                  </MainNewsInfoContainer>
                </CardContent>
              </Card>
            )}

            {arr[1] && (
              <GridNews>
                {arr.slice(1).map((e, index) => (
                  <Card key={index}>
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}>
                        <img
                          src={e.banner}
                          alt={`News ${index}`}
                          style={{
                            width: "300px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <Typography fontSize={fsc.veryBig} fontWeight={600}>
                          {e.title}
                        </Typography>

                        <Typography fontSize={fsc.medium}>
                          {e.description}
                        </Typography>
                      </Box>

                      <Box sx={{ marginTop: "1rem", width: "100%" }}>
                        <Typography fontSize={fsc.small} color="color10.main">
                          {e.author} | {e.date}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </GridNews>
            )}
          </>
        ))}
      </ContainerNews>
    </>
  );
};

export default Home;
