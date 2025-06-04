import { ToastContext } from "@/contexts/toast-context";
import { useContext } from "react";

export const useToast = () => useContext(ToastContext)