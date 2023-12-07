import React from "react";
import { Typography, Button, Box } from "@mui/material";
import weg from "./assets/weg.png";
import { BoxCompanies } from "./JobVacancyDetails.styled";

// Componente da tela de detalhes
const DetailsJobs: React.FC = () => {
	return (
		<Box>
			<Box>
				<Typography className="flex">
					<Typography
						variant="h6"
						gutterBottom
						sx={{
							color: "#999999",
							fontWeight: 600,
							marginLeft: 2,
						}}
					>
						Vagas de emprego /
					</Typography>
					<Typography
						variant="h5"
						gutterBottom
						sx={{
							color: "#004AAD",
							fontWeight: 700,
							marginLeft: 2,
						}}
					>
						12345 - Projetista
					</Typography>
				</Typography>
			</Box>

			<Box>
				<Typography className="flex" sx={{ margin: 3 }}>
					<Box
						sx={{ marginRight: 2.5 }}
						className="bg-green-200 w-40 h-10 rounded-full flex items-center justify-center"
					>
						<Typography
							sx={{ color: "#1C5B25", fontWeight: 600 }}
							variant="caption"
						>
							Inscrições Abertas
						</Typography>
					</Box>
					<Box className="grid">
						<p style={{ fontSize: 12 }}>
							Vaga publicada em 05/11/2023
						</p>
						<p style={{ fontSize: 12 }}>
							Inscrições abertas até 05/12/2023
						</p>
					</Box>
				</Typography>
			</Box>
			<Box
				sx={{
					padding: "16px",
					margin: "auto",
				}}
			>
				<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
					Descrição da Vaga
				</Typography>
				<Typography
					paragraph
					variant="body2"
					sx={{ marginLeft: 5, fontWeight: 600, margin: 2.5 }}
				>
					Responsável tecnicamente pela elaboração de soluções
					digitais/visão baseado em especificações; auxiliar no
					desenvolvimento e testes dos produtos em conformidade com
					normas e padronizações internas, garantindo o desempenho
					satisfatório do produto; auxiliar na aplicação dos programas
					de qualidade.
				</Typography>

				<Box sx={{ marginTop: 2 }}>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ fontWeight: 600, marginBottom: 3 }}
					>
						Atribuições e Responsabilidades
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Elaborar soluções digitais envolvendo diferentes
						soluções de software, hardware e redes de comunicação
						conforme definido na especificação.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Auxiliar e ou participar em testes de pré-operação das
						soluções digitais desenvolvidas.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Desenvolver softwares de acordo com a especificação.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Executar planos de testes de acordo com
						especificações.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Realizar atividades de pesquisa e desenvolvimento.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Auxiliar na análise de novos desenvolvimentos.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Contribuir na elaboração da documentação das diversas
						fases do projeto (estruturação, fluxogramação, diagramas
						lógicos, interfaces, lay-outs, etc...).
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Participar da elaboração da documentação para clientes
						internos e externos, em Português ou Inglês.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Contribuir tecnicamente nos contatos com clientes, em
						Português ou Inglês, com o objetivo de atender da melhor
						forma as soluções digitais aprovadas na especificação.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Interpretar textos, catálogos e manuais, afim de obter
						subsídios para o desenvolvimento de soluções digitais.
					</Typography>
					<Typography
						sx={{ marginLeft: 5 }}
						paragraph
						variant="body2"
					>
						- Ministrar treinamento para clientes internos e
						externos.
					</Typography>
				</Box>

				<Box sx={{ marginTop: "16px" }}>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ fontWeight: 600 }}
					>
						Requisitos e Qualificações
					</Typography>

					<Typography
						variant="body1"
						sx={{ margin: 3, fontWeight: 600 }}
					>
						Habilidades Pessoais
					</Typography>

					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Facilidade de trabalho em equipe, bom relacionamento
						interpessoal, facilidade para comunicação, atenção aos
						detalhes, facilidade com números/cálculos, boa
						capacidade analítica e organização.
					</Typography>

					<Typography
						variant="body1"
						sx={{ margin: 3, fontWeight: 600 }}
					>
						Requisitos Obrigatórios
					</Typography>

					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Técnico completo em Automação Controle Industrial,
						Automação Controle Processos, Eletrônica,
						Instrumentação, Automação Industrial, Mecatrônica,
						Telecomunicações ou Sistemas da Informação.
					</Typography>
					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Conhecimento em Cloud e Redes de comunicação
						industriais.
					</Typography>
					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Conhecimento em Ferramentas de Apoio ao
						Desenvolvimento (JIRA, PMD, Maven, Mocks, DBUnit).
					</Typography>
					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Conhecimento em Banco de Dados.
					</Typography>
					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Conhecimento em Sistemas Operacionais.
					</Typography>

					<Typography
						variant="body1"
						sx={{ margin: 3, fontWeight: 600 }}
					>
						Requisitos Desejáveis
					</Typography>

					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Conhecimento em Programação orientada a objetos
						Intermediário.
					</Typography>
					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Conhecimento em Programação de CLP (ladder, FBD, SFC,
						IEC 61131).
					</Typography>
					<Typography sx={{ marginLeft: 10 }} variant="body2">
						- Conhecimento em Sistemas de Automação Industrial.
					</Typography>
				</Box>

				<Box sx={{ marginTop: "16px" }}>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ fontWeight: 600, marginBottom: 3 }}
					>
						Informações Adicionais
					</Typography>
					<Box className="flex">
						<BoxCompanies>
							<img
								className="companies"
								src={weg}
								alt="Marisol"
							/>
						</BoxCompanies>
						<Box>
							<Typography variant="body2">
								Departamento: Desenvolvimento Ev Chargers e Edge
								Devices
							</Typography>
							<Typography variant="body2">
								Seção: Desenv. de Gateways e Medidores
								Inteligentes
							</Typography>
							<Typography variant="body2">
								Turno: Horário Normal
							</Typography>
						</Box>
					</Box>
				</Box>

				<Box>
					<Box className="fixed bottom-0 right-0 m-4">
						<Button
							variant="contained"
							style={{
								backgroundColor: "#004AAD",
								color: "#fff",
							}}
						>
							Candidatar-se
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default DetailsJobs;
