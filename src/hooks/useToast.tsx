import React, { createContext, useContext, ReactNode, useState } from "react";

import Toast from "../components/Toast";

import { TToast } from "../types";

interface ToastContextData {
	showToast: (type: TToast["severity"], message: string) => void;
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [feedback, setFeedback] = useState<TToast>({
		open: false,
		message: "",
		severity: "success",
	});

	const showToast = (type: TToast["severity"], message: string) => {
		setFeedback({
			open: true,
			message: message,
			severity: type,
		});
	};

	const closeToast = () => {
		setFeedback({ ...feedback, open: false });
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<Toast
				open={feedback.open}
				message={feedback.message}
				severity={feedback.severity}
				onClose={() => closeToast()}
			/>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error("useToast deve ser usado dentro de um ToastProvider");
	}

	return context;
};
