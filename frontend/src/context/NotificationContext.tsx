import {
  CheckCircle,
  Info,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type JSX,
} from "react";

type Severity = "success" | "info" | "warn" | "error";

export type Notification = {
  id: string;
  titulo: string;
  mensagem: string;
  severity: Severity;
};

export type NotificationContextType = {
  show: (
    id: string,
    titulo: string,
    severity: Severity,
    mensagem: string
  ) => void;
  hide: (id: string) => void;
};

export const NotificationContext = createContext<
  Partial<NotificationContextType>
>({});

export const useNotification = () =>
  useContext<Partial<NotificationContextType>>(NotificationContext);

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [toasts, setToasts] = useState<Notification[]>([]);

  const show = useCallback(
    (id: string, titulo: string, severity: Severity, mensagem: string) => {
      setToasts((prev) => {
        if (prev.find((t) => t.id === id)) return prev;
        return [...prev, { id, titulo, severity, mensagem }];
      });

      setTimeout(() => hide(id), 3000);
    },
    []
  );

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ show, hide }}>
      {children}
      <ToastContainer toasts={toasts} />
    </NotificationContext.Provider>
  );
};

type ToastContainerProps = {
  toasts: Notification[];
};

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-3 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

const Toast = ({ toast }: { toast: Notification }) => {
  const { severity, titulo, mensagem } = toast;

  const styles: Record<
    Severity,
    { bg: string; icon: JSX.Element; border: string }
  > = {
    success: {
      bg: "bg-green-500",
      border: "border-green-600",
      icon: <CheckCircle size={24} color="#00bc7d" />,
    },
    info: {
      bg: "bg-blue-500",
      border: "border-blue-600",
      icon: <Info size={24} color="#1447e6" />,
    },
    warn: {
      bg: "bg-yellow-500",
      border: "border-yellow-600",
      icon: <WarningCircle size={24} color="#ee9733" />,
    },
    error: {
      bg: "bg-red-500",
      border: "border-red-600",
      icon: <XCircle size={24} color="red" />,
    },
  };

  return (
    <div
      className={`animate-fadeOut top-2 right-6 z-50 max-w-xs min-w-80 flex items-start gap-3 p-4 rounded-xl shadow-lg border-l-4 transition-all duration-300 ease-in-out transform animate-slide-up bg-card ${styles[severity].border}`}
    >
      {styles[severity].icon}

      <div className="flex-1">
        <h4 className="font-semibold text-base leading-tight">{titulo}</h4>
        <p className="text-sm opacity-90 leading-snug">{mensagem}</p>
      </div>
    </div>
  );
};
