import React, { FC } from "react";

import { useTranslation } from "react-i18next";

import { Menu } from "@mui/material";

import { Flag, FlagContainer, MenuItemStyled } from "./ModalLangs.styled";

import { LANGS } from "../../../../../constants/LANGS";

type TModalLangsProps = {
	open: boolean;
	handleClose: () => void;
	anchorEl: null | HTMLElement;
};

const ModalLangs: FC<TModalLangsProps> = ({ open, handleClose, anchorEl }) => {
	const { i18n } = useTranslation();

	const switchLang = (lang: string) => {
		i18n.changeLanguage(lang);
	};

	return (
		<Menu
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			onClick={handleClose}
		>
			{LANGS.map((lang, index) => {
				return (
					<MenuItemStyled
						key={index}
						value={lang.key}
						onClick={() => switchLang(lang.key)}
					>
						<FlagContainer>
							<Flag src={lang.flag} alt={lang.key} />
						</FlagContainer>
						{lang.value}
					</MenuItemStyled>
				);
			})}
		</Menu>
	);
};

export default ModalLangs;
