import { X } from "@phosphor-icons/react";
import { classnames } from "config";
import type { SidebarOptions, UIComponentProps } from "types";

export const Sidebar = ({
  isOpen,
  onClose,
  options,
  children,
}: UIComponentProps) => {
  const opt = options as SidebarOptions;

  const position = opt.position ?? "left";
  const widthFraction = opt.widthFraction ?? "1/3";

  const isLeft = position === "left";

  const [numerator, denominator] = widthFraction.split("/").map(Number);
  const widthPercent = `${(numerator / denominator) * 100}vw`;

  return (
    <aside
      className={classnames(
        "fixed top-0 h-full bg-card shadow-xl transform transition-transform z-50",
        {
          "left-0": isLeft,
          "right-0": !isLeft,
          "translate-x-0": isOpen,
          "-translate-x-full": isLeft && !isOpen,
          "translate-x-full": !isLeft && !isOpen,
        }
      )}
      style={{ width: widthPercent }}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div
          className={classnames(
            "flex items-center justify-between p-4 border-b",
            {
              "flex-row-reverse": !isLeft,
              "flex-row": isLeft,
            }
          )}
        >
          <h2 className="text-xl font-semibold text-foreground">
            {opt.titulo}
          </h2>
          <button
            className="top-3 text-foreground hover:text-red-600"
            onClick={onClose}
            aria-label="Fechar sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-screen">
          <div className="h-[95%] overflow-y-auto">{children}</div>
        </div>
      </div>
    </aside>
  );
};
