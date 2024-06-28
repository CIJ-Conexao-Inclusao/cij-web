import React, { useEffect } from "react";
import { useTextReader } from "../../hooks/useTextReader";

const TextReader = () => {
	const { readText, setIsReadActive, isReadActive } = useTextReader();

	const toogle = () => {
		setIsReadActive(!isReadActive);
	};

	useEffect(() => {
		const handleWindowClick = (event: MouseEvent) => {
			console.log("Window clicked!", event);
			readText(event);
		};

		window.addEventListener("click", handleWindowClick);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("click", handleWindowClick);
		};
	}, []);

	return (
		<div>
			<button onClick={toogle}>Toggle</button>
			{isReadActive ? "Ativo" : "Inativo"}

			<div>
				<p onClick={readText}>teste teste dois</p>
			</div>
		</div>
	);
};

export default TextReader;
