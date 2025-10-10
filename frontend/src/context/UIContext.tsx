import { createContext, useContext, useState, type ReactNode } from "react";
import { config, classnames } from "config";
import type {
  ModalParams,
  SidebarParams,
  UIContextProps,
  UIContextType,
  UIShowParams,
} from "types";
import { Modal, Sidebar } from "components";

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  // Modal state
  const [modal, setModal] = useState<ModalParams[]>([]);
  const closeModal = (id: string) => {
    setModal((prev) => prev.filter((m) => m.id !== id));
  };

  // Sidebar state
  const [sidebars, setSidebars] = useState<SidebarParams[]>([]);
  const closeSidebar = (id: string) => {
    setSidebars((prev) => prev.filter((s) => s.id !== id));
  };

  const show = ({ content, type, options, id }: UIShowParams) => {
    switch (type) {
      case "modal":
        setModal((prev) => {
          const exists = prev.find((s) => s.id === id);
          if (exists) return prev; // já existe
          return [
            ...prev,
            { type, id, content, options: options || config.UIOptions },
          ];
        });

        break;
      case "sidebar":
        setSidebars((prev) => {
          const exists = prev.find((s) => s.id === id);
          if (exists) return prev; // já existe
          return [
            ...prev,
            { type, id, content, options: options || config.UIOptions },
          ];
        });
        break;
      default:
        show({
          content,
          type: config.UIContext,
          options: options || config.UIOptions,
          id,
        });
    }
  };

  const hide = (type: UIContextType, id: string) => {
    switch (type) {
      case "modal":
        closeModal(id);
        break;
      case "sidebar":
        closeSidebar(id);
        break;
      default:
        hide(config.UIContext, id);
    }
  };

  return (
    <UIContext.Provider
      value={{
        show,
        hide,
      }}
    >
      {children}

      {modal.map(({ id, content, options }) => (
        <div
          key={id}
          className={classnames("", {
            hidden: modal[modal.length - 1].id != id,
          })}
        >
          <Modal
            isOpen={modal.length > 0}
            onClose={() => hide("modal", id)}
            options={options}
          >
            {content}
          </Modal>
        </div>
      ))}

      {/* Overlay */}
      {sidebars.length > 0 && (
        <div
          className="fixed inset-0 bg-black opacity-50 transition-opacity z-40 pointer-events-auto"
          onClick={() => {
            const last = sidebars[sidebars.length - 1];
            closeSidebar(last.id);
          }}
        />
      )}

      {sidebars.map(({ id, content, options }) => (
        <Sidebar
          key={id}
          isOpen={sidebars.length > 0}
          onClose={() => hide("sidebar", id)}
          options={options}
        >
          {content}
        </Sidebar>
      ))}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI deve ser usado dentro de um UIProvider");

  return context;
};
