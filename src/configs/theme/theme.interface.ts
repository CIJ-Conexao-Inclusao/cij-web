export interface IPaletteOptions {
	[key: string]: {
		main: string;
		light?: string;
		dark?: string;
		contrastText?: string;
		contrast?: string;
	};
}
