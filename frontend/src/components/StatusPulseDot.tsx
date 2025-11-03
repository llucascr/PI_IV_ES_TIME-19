import { classnames } from "config";

interface StatusPulseDotProps {
  status: "A" | "ativo" | "I" | "inativo" | "alerta" | "pendente" | string;
  label?: boolean;
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  ativo: { color: "bg-green-600", label: "Ativo" },
  A: { color: "bg-green-600", label: "Ativo" },
  inativo: { color: "bg-red-600", label: "Inativo" },
  I: { color: "bg-red-600", label: "Inativo" },
  alerta: { color: "bg-yellow-500", label: "Alerta" },
  pendente: { color: "bg-blue-500", label: "Pendente" },
};

export function StatusPulseDot({ status, label = true }: StatusPulseDotProps) {
  const config = STATUS_CONFIG[status] || {
    color: "bg-gray-400",
    label: status,
  };

  // const color = isActive ? "bg-green-600" : "bg-red-600";

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-4 w-4">
        <span
          className={`relative inline-flex h-4 w-4 rounded-full ${config.color}`}
        >
          <span
            className={`absolute inline-flex h-4 w-4 rounded-full ${config.color} opacity-75 animate-ping`}
          ></span>
        </span>
      </span>

      {label && (
        <h2
          className={classnames("first-letter:uppercase", {
            "text-green-600": status === "ativo",
            "text-red-600": status === "inativo",
            "text-yellow-500": status === "alerta",
            "text-blue-500": status === "pendente",
          })}
        >
          {config.label}
        </h2>
      )}
    </div>
  );
}
