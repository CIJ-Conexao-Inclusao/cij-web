import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/ROUTES";

import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import { BoxCompanies, BoxButtons } from "./JobVacancies.styled";

import "tailwindcss/tailwind.css";

import BlindIcon from "@mui/icons-material/Blind";
import HearingIcon from "@mui/icons-material/Hearing";
import AccessibleIcon from "@mui/icons-material/Accessible";

import marisol from "./assets/companies/marisol.png";
import duasRodas from "./assets/companies/duas-rodas.png";
import malwee from "./assets/companies/grupo-malwee.png";
import urbano from "./assets/companies/urbano.png";
import weg from "./assets/companies/weg.png";


import { useTranslation } from "react-i18next";
import RegisterJobsModal from '../../modals/registerJob/registerJob';

interface Vaga {
	id: number;
	empresa: string;
	codigoEmpresa: string;
	area: string;
	vaga: string;
	deficiencia: string;
}

const listImages = [
	{ image: marisol },
	{ image: duasRodas },
	{ image: malwee },
	{ image: urbano },
	{ image: weg },
];

const Jobs: React.FC = () => {
	const { t } = useTranslation("translation", { keyPrefix: "signIn" });

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const navigate = useNavigate();

	const [vagas] = useState<Vaga[]>([
		{
			id: 1,
			empresa: "Empresa A",
			codigoEmpresa: "123",
			area: "TI",
			vaga: "Desenvolvedor",
			deficiencia: "Nenhuma",
		},
		{
			id: 2,
			empresa: "Empresa B",
			codigoEmpresa: "456",
			area: "RH",
			vaga: "Recrutador",
			deficiencia: "Visual",
		},
		{
			id: 3,
			empresa: "Empresa C",
			codigoEmpresa: "789",
			area: "Marketing",
			vaga: "Especialista em Marketing",
			deficiencia: "Auditiva",
		},
		{
			id: 4,
			empresa: "Empresa D",
			codigoEmpresa: "101",
			area: "TI",
			vaga: "Analista de Dados",
			deficiencia: "Nenhuma",
		},
		{
			id: 5,
			empresa: "Empresa E",
			codigoEmpresa: "112",
			area: "Financeiro",
			vaga: "Analista Financeiro",
			deficiencia: "Nenhuma",
		},
		// Adicione mais dados conforme necessário
	]);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage] = useState<number>(5);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = vagas.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const jobVacancyDetails = () => {
		navigate(ROUTES.jobVacancyDetails);
	};

	return (
		<Box p={4} sx={{ maxWidth: "xl", margin: "auto" }}>
			<Box sx={{justifyContent: "space-between", display: "flex"}}>
				<Box>
					<h1 className="text-lg font-bold mb-2 text-blue-500">
						Vagas de Emprego
					</h1>
				</Box>
				<Box>
					<Box>
						<BoxButtons
							variant="contained"
							onClick={handleOpenModal}
						>
							Cadastrar Vaga
						</BoxButtons>
					</Box>
					<Box>
						<RegisterJobsModal open={openModal} onClose={handleCloseModal} />
					</Box>
				</Box>
			</Box>
			<Box sx={{ textAlign: "center" }}>
				<Box display="flex" gap={2} mb={2}>
					<Box flex="1">
						<label className="flex text-xs mb-1 font-bold">
							Nome da Vaga:
						</label>
						<TextField
							variant="outlined"
							size="small"
							fullWidth
							placeholder="Nome da Vaga"
						/>
					</Box>

					<Box flex="1">
						<label className="flex text-xs mb-1 font-bold">
							Tipo de Vaga:
						</label>
						<Select variant="outlined" size="small" fullWidth>
							<MenuItem value="opcao1">Opção 1</MenuItem>
							<MenuItem value="opcao2">Opção 2</MenuItem>
						</Select>
					</Box>
				</Box>

				<Box display="flex" gap={2} mb={2}>
					<Box flex="1">
						<label className="flex text-xs mb-1 font-bold">
							Deficiência:
						</label>
						<Select variant="outlined" size="small" fullWidth>
							<MenuItem value="nenhuma">Nenhuma</MenuItem>
							<MenuItem value="visual">Visual</MenuItem>
							<MenuItem value="auditiva">Auditiva</MenuItem>
						</Select>
					</Box>

					<Box flex="1">
						<label className="flex text-xs mb-1 font-bold">
							Área:
						</label>
						<Select variant="outlined" size="small" fullWidth>
							<MenuItem value="ti">TI</MenuItem>
							<MenuItem value="rh">RH</MenuItem>
							<MenuItem value="marketing">Marketing</MenuItem>
						</Select>
					</Box>

					<Box flex="1">
						<label className="flex text-xs mb-1 font-bold">
							Empresa:
						</label>
						<Select variant="outlined" size="small" fullWidth>
							<MenuItem value="empresaA">Empresa A</MenuItem>
							<MenuItem value="empresaB">Empresa B</MenuItem>
							<MenuItem value="empresaC">Empresa C</MenuItem>
						</Select>
					</Box>
				</Box>

				<ul className="mt-8" onClick={jobVacancyDetails}>
					<li className="flex mb-2 border-b">
						<p className="w-1/5 font-bold text-sm">Logo</p>
						<p className="w-1/5 font-bold text-sm">Empresa</p>
						<p className="w-1/5 font-bold text-sm">Área</p>
						<p className="w-1/5 font-bold text-sm">Vaga</p>
						<p className="w-1/5 font-bold text-sm">Deficiência</p>
					</li>
					{currentItems.map((vaga, index) => (
						<li
							key={vaga.id}
							className="flex mb-2 border-b justify-center items-center"
						>
							<p className="w-1/5 justify-center items-center flex">
								<BoxCompanies>
									<img
										className="companies"
										src={listImages[index].image}
										alt="Marisol"
									/>
								</BoxCompanies>
							</p>
							<p className="w-1/5 text-sm font-bold">
								{vaga.codigoEmpresa + " - " + vaga.empresa}
							</p>
							<p className="w-1/5 text-sm">{vaga.area}</p>
							<p className="w-1/5 text-sm">{vaga.vaga}</p>
							<p className="w-1/5 text-sm">
								<i className="material-icons">
									<BlindIcon />
								</i>
								<i className="material-icons">
									<HearingIcon />
								</i>
								<i className="material-icons">
									<AccessibleIcon />
								</i>
							</p>
						</li>
					))}
				</ul>

				<Box mt={2} display="flex" justifyContent="space-between">
					<p className="text-sm">{`Mostrando ${indexOfFirstItem + 1
						} - ${indexOfLastItem} de ${vagas.length} itens`}</p>
					<div>
						{Array.from({
							length: Math.ceil(vagas.length / itemsPerPage),
						}).map((_, index) => (
							<Button
								key={index}
								onClick={() => paginate(index + 1)}
								variant="outlined"
								size="small"
							>
								{index + 1}
							</Button>
						))}
					</div>
				</Box>
			</Box>
		</Box>
	);
};

export default Jobs;
