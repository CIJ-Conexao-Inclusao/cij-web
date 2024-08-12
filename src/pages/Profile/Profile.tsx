import React, { useState } from "react";

import { Box } from "@mui/material";
import { BoxLeftColumn, BoxRightColumn, BoxTab } from "./Profile.styled";

import Address from "./Tabs/Address/Address";
import Curriculum from "./Tabs/Curriculum/Curriculum";
import Disability from "./Tabs/Disability/Disability";
import PersonalData from "./Tabs/PersonalData/PersonalData";
import Settings from "./Tabs/Settings/Settings";

const Profile = () => {
	const [tabSelected, setTabSelected] = useState(4);

	return (
		<Box className="mx-40 mt-10">
			<p className="title">Meu perfil</p>

			<Box sx={{ display: "flex", width: "100%" }}>
				<BoxLeftColumn>
					<BoxTab
						onClick={() => {
							setTabSelected(0);
						}}
					>
						{tabSelected == 0 ? (
							<p style={{ color: "#004AAD" }}>Dados pessoais</p>
						) : (
							<p>Dados pessoais</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTabSelected(1);
						}}
					>
						{tabSelected == 1 ? (
							<p style={{ color: "#004AAD" }}>Deficiência</p>
						) : (
							<p>Deficiência</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTabSelected(2);
						}}
					>
						{tabSelected == 2 ? (
							<p style={{ color: "#004AAD" }}>Endereço</p>
						) : (
							<p>Endereço</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTabSelected(3);
						}}
					>
						{tabSelected == 3 ? (
							<p style={{ color: "#004AAD" }}>Currículo</p>
						) : (
							<p>Currículo</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTabSelected(4);
						}}
					>
						{tabSelected == 4 ? (
							<p style={{ color: "#004AAD" }}>Configurações</p>
						) : (
							<p>Configurações</p>
						)}
					</BoxTab>
				</BoxLeftColumn>

				<BoxRightColumn>
					{tabSelected == 0 && <PersonalData />}
					{tabSelected == 1 && <Disability />}
					{tabSelected == 2 && <Address />}
					{tabSelected == 3 && <Curriculum />}
					{tabSelected == 4 && <Settings />}
				</BoxRightColumn>
			</Box>
		</Box>
	);
};

export default Profile;
