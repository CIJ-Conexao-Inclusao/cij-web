import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
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

		const allowedTags = [
			"P",
			"SPAN",
			"H1",
			"H2",
			"H3",
			"H4",
			"H5",
			"H6",
			"A",
			"BUTTON",
		];

		if (!allowedTags.includes(event.target.tagName)) {
			return;
		}

		const msg = new SpeechSynthesisUtterance();
		const voices = window.speechSynthesis.getVoices();

		msg.voice = voices[0];
		msg.text = event.target.innerText;

		window.speechSynthesis.speak(msg);
	};

	useEffect(() => {
		if (!isReadActive) {
			window.speechSynthesis.cancel();
		}
	}, [isReadActive]);

	const contextValue: TextReaderContextData = useMemo(
		() => ({
			readText: readText,
			isReadActive: isReadActive,
			setIsReadActive: setIsReadActive,
		}),
		[readText, isReadActive, setIsReadActive]
	);

	useEffect(() => {
		if (isReadActive) {
			window.addEventListener("click", readText);
		} else {
			window.removeEventListener("click", readText);
		}

		return () => {
			window.removeEventListener("click", readText);
		};
	}, [isReadActive]);

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
