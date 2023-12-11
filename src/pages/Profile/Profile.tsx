import React, { useState } from "react";

import { Box, Container } from "@mui/material";
import { BoxLeftColumn, BoxTab, BoxRightColumn } from "./Profile.styled";

import PersonalData from "./Tabs/PersonalData/PersonalData";
import Disability from "./Tabs/Disability/Disability";
import Address from "./Tabs/Address/Address";
import Curriculum from "./Tabs/Curriculum/Curriculum";
import Settings from "./Tabs/Settings/Settings";

const Profile = () => {
	const [tab, setTab] = useState(PersonalData);
	const [clickedColor, setClickedColor] = useState(0);

	return (
		<Container>
			<p className="title">Meu perfil</p>

			<Box sx={{ display: "flex", width: "100%" }}>
				<BoxLeftColumn>
					<BoxTab
						onClick={() => {
							setTab(PersonalData);
							setClickedColor(0);
						}}
					>
						{clickedColor == 0 ? (
							<p style={{ color: "#004AAD" }}>Dados pessoais</p>
						) : (
							<p>Dados pessoais</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTab(Disability);
							setClickedColor(1);
						}}
					>
						{clickedColor == 1 ? (
							<p style={{ color: "#004AAD" }}>Deficiência</p>
						) : (
							<p>Deficiência</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTab(Address);
							setClickedColor(2);
						}}
					>
						{clickedColor == 2 ? (
							<p style={{ color: "#004AAD" }}>Endereço</p>
						) : (
							<p>Endereço</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTab(Curriculum);
							setClickedColor(3);
						}}
					>
						{clickedColor == 3 ? (
							<p style={{ color: "#004AAD" }}>Currículo</p>
						) : (
							<p>Currículo</p>
						)}
					</BoxTab>

					<BoxTab
						onClick={() => {
							setTab(Settings);
							setClickedColor(4);
						}}
					>
						{clickedColor == 4 ? (
							<p style={{ color: "#004AAD" }}>Configurações</p>
						) : (
							<p>Configurações</p>
						)}
					</BoxTab>
				</BoxLeftColumn>

				<BoxRightColumn>{tab}</BoxRightColumn>
			</Box>
		</Container>
	);
};

export default Profile;
