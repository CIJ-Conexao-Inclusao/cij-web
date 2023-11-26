type TToast = {
	open: boolean;
	message: string;
	severity: "success" | "info" | "warning" | "error";
	onClose?: () => void;
};

export default TToast;
