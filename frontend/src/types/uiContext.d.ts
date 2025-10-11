export interface UIContextProps {
  show: (params: UIShowParams) => void;
  hide: (type: UIContextType, id: string) => void;
}

type ModalOptions = { titulo?: string; size?: "small" | "medium" | "large" };
type UIOptions = ModalOptions | SidebarOptions;

type SidebarOptions = {
  titulo?: string;
  position?: "left" | "right";
  widthFraction?: `${number}/${number}`;
};

export interface ModalParams {
  type: "modal";
  id: string;
  content: ReactNode;
  options?: UIOptions;
}

export interface SidebarParams {
  type: "sidebar";
  id: string;
  content: ReactNode;
  options?: UIOptions;
}

export interface UIComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  options?: UIOptions;
}

export type UIShowParams = ModalParams | SidebarParams;
