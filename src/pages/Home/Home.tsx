import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import NewsModal from "../../components/NewsModal/NewsModal";
import { ROLES } from "../../constants/ROLES";
import { CookieService } from "../../services";
import NewsService from "../../services/NewsService";
import cadeirante from "./assets/cadeirante.png";
import filmagens from "./assets/filmagens.png";
import prefeitura from "./assets/prefeitura.png";
import trabalho from "./assets/trabalho.png";
import { ButtonStyled, ContainerActions } from "./Home.styled";

// import NewsService from "../../services/NewsService";

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
  // const [news, setNews] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const role = CookieService.getRole();
  const userRole = useMemo(() => {
    let userRoleAux = ROLES.PERSON;

    if (role != null) userRoleAux = role;

    return userRoleAux;
  }, [role]);

  const onSave = async () => {
    try {
      const res = await NewsService.Create({
        author: "teste",
        date: "2024-11-22",
        description: "teste",
        title: "teste",
        banner: new File(["foo"], "foo.txt", {
          type: "text/plain",
        }),
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (_: {}, reason: string) => {
    if (reason === "backdropClick") return;

    setShowModal(false);
  };

  useEffect(() => {
    // NewsService.list()
    // 	.then((res) => {
    // 		setNews(res.data);
    // 		console.log(news);
    // 		setIsLoading(false);
    // 	})
    // 	.catch((err) => {
    // 		console.log(err);
    // 		setIsLoading(false);
    // 	});
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("sim", showModal);
  }, [showModal]);

  if (isLoading) {
    return (
      <div className="w-full mt-4 flex gap-2 items-center justify-center">
        <CircularProgress />
        Carregando...
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <NewsModal
          open={showModal}
          onClose={handleClose}
          onSaveAction={() => setShowModal(false)}
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
      <Container>
        <Card sx={{ marginTop: 4 }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <img src={trabalho} alt="News" />

            <Box sx={{ display: "grid" }}>
              <Typography variant="h6">
                WEG Equipamentos assina acordo para contratar mais de 200
                pessoas com deficiência
              </Typography>

              <Typography variant="body2" sx={{ marginTop: 5 }}>
                A WEG Equipamentos Elétricos S/A, com sede em Jaraguá do Sul/SC,
                assinou um acordo com a Justiça do Trabalho comprometendo-se a
                contratar trabalhadores com deficiência ou reabilitados pelo
                INSS, no importe de, no mínimo 5%, da totalidade de seus
                empregados.
              </Typography>

              <Typography
                sx={{
                  color: "grey",
                  fontSize: 12,
                  marginTop: 5,
                }}>
                CUT-SC | 22/11/2023
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}>
          {imagens.map((imagem, index) => (
            <Card key={index} sx={{ width: "30%", boxShadow: 3 }}>
              <CardContent>
                <img
                  src={imagem}
                  alt={`News ${index}`}
                  style={{ objectFit: "cover" }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {Titles[index].title}
                </Typography>

                <Typography
                  sx={{
                    color: "grey",
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  {Company[index].company}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Home;
