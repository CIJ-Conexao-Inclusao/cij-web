import React, { ReactNode } from "react";

import { Main } from "./Content.styled";
import { SpaceHeader } from "../PageLayout.styled";

const Content: React.FC<{ children: ReactNode; open: boolean }> = ({
	children,
	open,
}) => {
	return (
		<Main open={open}>
			<SpaceHeader />
			{children}
		</Main>
	);
};

export default Content;
