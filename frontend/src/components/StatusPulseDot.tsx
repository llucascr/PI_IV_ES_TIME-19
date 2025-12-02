import recordStatus from "../assets/recordStatus.json";
import { classnames } from "config";
import type { RecordStatusType } from "types/monitoramento";

interface StatusPulseDotProps {
  developmentStatus?: RecordStatusType;
  status: "A" | "ativo" | "I" | "inativo" | "alerta" | "pendente" | string;
  label?: boolean;
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  // Status genéricos
  ativo: { color: "bg-green-600", label: "Ativo" },
  A: { color: "bg-green-600", label: "Ativo" },
  inativo: { color: "bg-red-600", label: "Inativo" },
  I: { color: "bg-red-600", label: "Inativo" },
  alerta: { color: "bg-yellow-500", label: "Alerta" },
  pendente: { color: "bg-blue-500", label: "Pendente" },

  // Fases de desenvolvimento
  seedling: { color: "bg-green-400", label: recordStatus.seedling },
  vegetative_growth: {
    color: "bg-green-500",
    label: recordStatus.vegetative_growth,
  },
  flowering: { color: "bg-pink-400", label: recordStatus.flowering },
  fruiting: { color: "bg-orange-400", label: recordStatus.fruiting },
  ripening: { color: "bg-red-400", label: recordStatus.ripening },
  harvest: { color: "bg-yellow-600", label: recordStatus.harvest },
  post_harvest: { color: "bg-gray-500", label: recordStatus.post_harvest },

  // Status de monitoramento
  scheduled: { color: "bg-blue-400", label: recordStatus.scheduled },
  in_progress: { color: "bg-blue-600", label: recordStatus.in_progress },
  completed: { color: "bg-green-700", label: recordStatus.completed },
  pending_review: { color: "bg-yellow-400", label: recordStatus.pending_review },
  cancelled: { color: "bg-gray-400", label: recordStatus.cancelled },

  // Condições de saúde
  healthy: { color: "bg-green-600", label: recordStatus.healthy },
  at_risk: { color: "bg-yellow-500", label: recordStatus.at_risk },
  infested: { color: "bg-red-600", label: recordStatus.infested },
  under_treatment: { color: "bg-purple-500", label: recordStatus.under_treatment },
  recovered: { color: "bg-blue-500", label: recordStatus.recovered },
  loss: { color: "bg-red-800", label: recordStatus.loss },
};

export function StatusPulseDot({
  developmentStatus,
  status,
  label = true,
}: StatusPulseDotProps) {
  const key = developmentStatus
    ? developmentStatus.toLocaleLowerCase()
    : status;
  const config = STATUS_CONFIG[key] || {
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
