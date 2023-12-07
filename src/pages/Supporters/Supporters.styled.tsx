import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styled from '@emotion/styled';

export const BoxCompanies = styled(Box)({
  '@apply': 'items-center flex justify-center m-4 w-1/5',
});

export const StyledCard = styled(Card)({
  '@apply': 'w-60 h-250 p-2 bg-gray-200 shadow-md m-2 flex items-center', // Ajustado para 250 pixels de largura e altura
  margin: '0 20px',
});

export const StyledCardContent = styled(CardContent)({
  '@apply': 'flex flex-col items-center',
  width: '60%', // Manter a largura de 100%
  height: '100%', // Manter a altura de 100%
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center'
});

export const StyledCardContentTitle = styled(CardContent)({
  '@apply': 'flex flex-col items-center',
  width: '100%', // Manter a largura de 100%
  height: '100%', // Manter a altura de 100%
});

export const StyledCardMedia = styled(CardMedia)({
  '@apply': 'w-50 h-full', // Ajuste as classes do Tailwind aqui
});

export const StyledTitle = styled(Typography)({
  '@apply': 'text-blue-500 text-lg font-bold', // Ajuste as classes do Tailwind aqui
  fontWeight: 520,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const StyledSubtitle = styled(Typography)({
  '@apply': 'text-sm font-light', // Ajuste as classes do Tailwind aqui
  fontWeight: 600,
  textAlign: 'center',
});

export const StyledImage = styled('img')({
  '@apply': 'w-full h-full object-cover',
  width: '100vw', // Defina a largura como 100% para ocupar a largura total do contêiner
  height: '40vh',
});