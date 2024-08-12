export interface IFontConfig {
	verySmall: string;
	small: string;
	default: string;
	medium: string;
	big: string;
	veryBig: string;
	smallTitle: string;
	title: string;
}

const FontConfig: IFontConfig = {
	verySmall: "0.625rem",
	small: "0.75rem",
	default: "0.875rem",
	medium: "1rem",
	big: "1.125rem",
	veryBig: "1.25rem",
	smallTitle: "1.875rem",
	title: "2.25rem",
};

export default FontConfig;
