export interface IToast {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  onClose?: () => void;
}
