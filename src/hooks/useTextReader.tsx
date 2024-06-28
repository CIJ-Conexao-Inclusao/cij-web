import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
// import { BoxIcone } from "./TextReaderContext.styles";

interface TextReaderContextData {
	readText: (event: any) => void;
	isReadActive: boolean;
	setIsReadActive: (value: boolean) => void;
}

const TextReaderContext = createContext<TextReaderContextData | undefined>(
	undefined
);

export const TextReaderProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isReadActive, setIsReadActive] = useState<boolean>(false);

	const readText = (event: any) => {
		if (!isReadActive) {
			return;
		}

		console.log("chegou aq", event);

		const msg = new SpeechSynthesisUtterance();
		const voices = window.speechSynthesis.getVoices();

		msg.voice = voices[0];
		msg.text = event.target.innerText;

		window.speechSynthesis.speak(msg);
	};

	const contextValue: TextReaderContextData = useMemo(
		() => ({
			readText: readText,
			isReadActive: isReadActive,
			setIsReadActive: setIsReadActive,
		}),
		[readText, isReadActive, setIsReadActive]
	);

	return (
		<TextReaderContext.Provider value={contextValue}>
			{children}
		</TextReaderContext.Provider>
	);
};

export const useTextReader = () => {
	const context = useContext(TextReaderContext);

	if (!context) {
		throw new Error(
			"useTextReader deve ser usado dentro de um TextReaderProvider"
		);
	}

	return context;
};

// export function TextReaderComponent(props: { filtroAberto: boolean }) {
// 	const { leituraDeSiteAtiva, setLeituraDeSiteAtiva } = useContext(
// 		TextReaderContext
// 	) as any;

// 	return (
// 		<BoxIcone
// 			onClick={() => {
// 				setLeituraDeSiteAtiva(!leituraDeSiteAtiva);
// 			}}
// 			sx={{ right: props.filtroAberto ? "250px" : "10px" }}
// 		>
// 			<BoxIcone
// 				sx={{
// 					backgroundImage: leituraDeSiteAtiva
// 						? "linear-gradient(to right, #006281, #05274c)"
// 						: "linear-gradient(to right, #008db9, #0c529d)",
// 				}}
// 			>
// 				<IconButton>
// 					{leituraDeSiteAtiva ? (
// 						<CloseRoundedIcon sx={{ color: "#fff" }} />
// 					) : (
// 						<SpatialAudioRoundedIcon
// 							sx={{ width: "20px", color: "#fff" }}
// 						/>
// 					)}
// 				</IconButton>
// 			</BoxIcone>
// 		</BoxIcone>
// 	);
// }
