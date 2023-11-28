import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styled from '@emotion/styled';

export const BoxCompanies = styled(Box)({
  '@apply': 'items-center flex justify-center m-4 w-1/5',
});

export const StyledCard = styled(Card)({
  '@apply': 'w-80 p-2 bg-gray-200 shadow-md m-2 flex items-center',
});

export const StyledCardContent = styled(CardContent)({
  '@apply': 'flex flex-col items-center',
  width: 'calc(100% - 200px)', // Ajuste para o tamanho desejado
});

export const StyledCardMedia = styled(CardMedia)({
  '@apply': 'w-200 h-full', // Ajuste as classes do Tailwind aqui
});

export const StyledTitle = styled(Typography)({
  '@apply': 'text-blue-500 text-lg font-bold', // Ajuste as classes do Tailwind aqui
});

export const StyledSubtitle = styled(Typography)({
  '@apply': 'text-sm font-light', // Ajuste as classes do Tailwind aqui
});

export const StyledImage = styled('img')({
  '@apply': 'w-full h-full object-cover',
});