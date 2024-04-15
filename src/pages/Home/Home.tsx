import React, { useEffect, useState } from "react";

import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Slider,
	Typography,
	useTheme,
} from "@mui/material";

import { THEME_OPTIONS } from "../../constants";
import { useFontSize } from "../../hooks/useFontSize";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";
import cadeirante from "./assets/cadeirante.png";
import filmagens from "./assets/filmagens.png";
import prefeitura from "./assets/prefeitura.png";
import trabalho from "./assets/trabalho.png";

// import NewsService from "../../services/NewsService";

const imagens = [prefeitura, cadeirante, filmagens];

const Titles = [
	{
		title: "Vem aí a 1ª Imersão Inclusiva PCD e Trabalho de Jaraguá do Sul",
	},
	{
		title: "Conselho do Trabalho promove palestras sobre inclusão em Jaraguá do Sul",
	},
	{
		title: "História de estilista surdo de Jaraguá do Sul é contada no Caldeirão do Huck",
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
	// const [news, setNews] = useState<[]>([]);
	const theme = useTheme();
	const { incrementFontSize, fontSizeConfig, fontSizeIncrementer } =
		useFontSize();
	const { switchTheme } = useSwitchTheme();
	const [isLoading, setIsLoading] = useState<boolean>(true);

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
		console.log("o q está mduando tanto 1");
	}, [fontSizeConfig]);

	const toggleTheme = () => {
		switchTheme(
			theme.palette.mode === THEME_OPTIONS.LIGHT
				? THEME_OPTIONS.DARK
				: THEME_OPTIONS.LIGHT
		);
	};

	const handleFontSizeChange = (event: any) => {
		console.log(event.target.value);
		incrementFontSize(event.target.value);
	};

	if (isLoading) {
		return (
			<div className="w-full mt-4 flex gap-2 items-center justify-center">
				<CircularProgress />
				Carregando...
			</div>
		);
	}

	return (
		<Box>
			<Button variant="contained" color="primary" onClick={toggleTheme}>
				lksdajflaskd;j
				<Typography sx={{ color: theme.palette.color09.main }}>
					teste dois
				</Typography>
			</Button>

			<Typography>{fontSizeConfig.verySmall}</Typography>
			<Typography>{fontSizeConfig.default}</Typography>
			<Typography>{fontSizeConfig.title}</Typography>
			<Slider
				min={-10}
				max={30}
				value={fontSizeIncrementer}
				onChange={handleFontSizeChange}
			/>
			<Container>
				<Card sx={{ marginTop: 4 }}>
					<CardContent sx={{ display: "flex", alignItems: "center" }}>
						<img src={trabalho} alt="News" />

						<Box sx={{ display: "grid" }}>
							<Typography variant="h6">
								WEG Equipamentos assina acordo para contratar
								mais de 200 pessoas com deficiência
							</Typography>

							<Typography variant="body2" sx={{ marginTop: 5 }}>
								A WEG Equipamentos Elétricos S/A, com sede em
								Jaraguá do Sul/SC, assinou um acordo com a
								Justiça do Trabalho comprometendo-se a contratar
								trabalhadores com deficiência ou reabilitados
								pelo INSS, no importe de, no mínimo 5%, da
								totalidade de seus empregados.
							</Typography>

							<Typography
								sx={{
									color: "grey",
									fontSize: 12,
									marginTop: 5,
								}}
							>
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
					}}
				>
					{imagens.map((imagem, index) => (
						<Card key={index} sx={{ width: "30%", boxShadow: 3 }}>
							<CardContent>
								<img
									src={imagem}
									alt={`News ${index}`}
									style={{ objectFit: "cover" }}
								/>
								<Typography
									variant="body2"
									sx={{ fontWeight: 600 }}
								>
									{Titles[index].title}
								</Typography>

								<Typography
									sx={{
										color: "grey",
										fontSize: 12,
										marginTop: 5,
									}}
								>
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

export default Home;
