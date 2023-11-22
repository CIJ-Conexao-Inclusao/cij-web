import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Typography,
  Container,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NewsIcon from '@mui/icons-material/Article';
import JobIcon from '@mui/icons-material/Work';
import ChartIcon from '@mui/icons-material/BarChart';
import PartnerIcon from '@mui/icons-material/PeopleAlt';

import cadeirante from "../assets/cadeirante.png";
import prefeitura from "../assets/prefeitura.png";
import trabalho from "../assets/trabalho.png";
import filmagens from "../assets/filmagens.png";

const imagens = [
  prefeitura,
  cadeirante,
  filmagens
];

const Titles = [
  {
    title: 'Vem aí a 1ª Imersão Inclusiva PCD e Trabalho de Jaraguá do Sul',
  },
  {
    title: 'Conselho do Trabalho promove palestras sobre inclusão em Jaraguá do Sul',
  },
  {
    title: 'História de estilista surdo de Jaraguá do Sul é contada no Caldeirão do Huck',
  },
];

const Company = [
  {
    company: 'SINDMET | 19/08/2023',
  },
  {
    company: 'OCP News | 13/08/2023',
  },
  {
    company: 'NSC Total | 07/08/2023',
  },
];


const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Seu Site</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <NewsIcon />
            </ListItemIcon>
            <ListItemText primary="Notícias" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <JobIcon />
            </ListItemIcon>
            <ListItemText primary="Vagas de Emprego" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChartIcon />
            </ListItemIcon>
            <ListItemText primary="Gráficos" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PartnerIcon />
            </ListItemIcon>
            <ListItemText primary="Parcerias e Apoiadores" />
          </ListItem>
        </List>
      </Drawer>

      <Container>
        {/* Large News Card */}
        <Card sx={{ marginTop: 4 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Image on the left */}
            <img
              src={trabalho} // Example image URL
              alt="News"
            />
            {/* News content on the right */}
            <Box sx={{ display: 'grid'}}>
              <Typography variant="h6">WEG Equipamentos assina acordo para contratar mais de 200 pessoas com deficiência</Typography>
              <Typography variant="body2" sx={{ marginTop: 5}}>
                A WEG Equipamentos Elétricos S/A, com sede em Jaraguá do Sul/SC, assinou um acordo com a Justiça do Trabalho comprometendo-se a contratar trabalhadores com deficiência ou reabilitados pelo INSS, no importe de, no mínimo 5%, da totalidade de seus empregados.
              </Typography>
              <Typography sx={{ color: 'grey', fontSize: 12, marginTop: 5}}>
                CUT-SC | 22/11/2023
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Small News Cards */}
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
          }}
        >
          {imagens.map((imagem, index) => (
            <Card key={index} sx={{ width: '30%', boxShadow: 3 }}>
              <CardContent>
                <img
                  src={imagem}
                  alt={`News ${index}`}
                  style={{ objectFit: 'cover' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600}}>{Titles[index].title}</Typography>
                <Typography sx={{ color: 'grey', fontSize: 12, marginTop: 5}}>
                {Company[index].company}
              </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default App;