import React from 'react';
import { BoxCompanies, StyledTitle, StyledCard, StyledCardContent, StyledCardMedia, StyledImage } from "./Backing.styled";
import { Typography, CardHeader, Box } from '@mui/material';
import vetor from "./assets/vetor.png";

const listCards = [
    { title: '+20', subtitle: 'Empresas que são parceiras e apoiam a causa CIJ' },
    { title: '+350', subtitle: 'Pessoas com deficiência contratadas através do nosso sistema' },
    { title: '+500', subtitle: 'Mil reais doados para realizar melhorias de acessibilidade na cidade' }
]

const Backing: React.FC = () => {
    return (
        <BoxCompanies>
            <Box className="cabecalho">
                <StyledCard>
                    <StyledCardContent>
                        <CardHeader title="Título Grande" />
                        <Typography variant="body1" className="font-bold">
                            Subtítulo
                        </Typography>
                    </StyledCardContent>
                    <StyledCardMedia>
                        <StyledImage alt="Imagem" src={vetor} />
                    </StyledCardMedia>
                </StyledCard>
            </Box>
            <Box className="cards-container" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                {listCards.map((item, index) => (
                    <StyledCard key={index}>
                        <StyledCardContent>
                            <StyledTitle variant="h2">{item.title}</StyledTitle>
                            <Typography variant="h3">{item.subtitle}</Typography>
                        </StyledCardContent>
                    </StyledCard>
                ))}
            </Box>
        </BoxCompanies>
    );
};

export default Backing;