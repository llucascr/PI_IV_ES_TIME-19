import { classnames } from "config";
import type { RecordStatusType } from "types/monitoramento";

interface StatusPulseDotProps {
  developmentStatus: RecordStatusType;
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
  seedling: { color: "bg-green-400", label: "Muda recém-plantada" },
  vegetative_growth: { color: "bg-green-500", label: "Crescimento vegetativo" },
  flowering: { color: "bg-pink-400", label: "Floração" },
  fruiting: { color: "bg-orange-400", label: "Frutificação" },
  ripening: { color: "bg-red-400", label: "Maturação dos frutos" },
  harvest: { color: "bg-yellow-600", label: "Colheita" },
  post_harvest: { color: "bg-gray-500", label: "Pós-colheita" },

  // Status de monitoramento
  scheduled: { color: "bg-blue-400", label: "Agendado" },
  in_progress: { color: "bg-blue-600", label: "Em andamento" },
  completed: { color: "bg-green-700", label: "Finalizado" },
  pending_review: { color: "bg-yellow-400", label: "Aguardando validação" },
  cancelled: { color: "bg-gray-400", label: "Cancelado" },

  // Condições de saúde
  healthy: { color: "bg-green-600", label: "Saudável" },
  at_risk: { color: "bg-yellow-500", label: "Sob risco" },
  infested: { color: "bg-red-600", label: "Infestado" },
  under_treatment: { color: "bg-purple-500", label: "Em tratamento" },
  recovered: { color: "bg-blue-500", label: "Recuperado" },
  loss: { color: "bg-red-800", label: "Perda total" },
};

export function StatusPulseDot({ developmentStatus, status, label = true }: StatusPulseDotProps) {
  const config = STATUS_CONFIG[developmentStatus.toLocaleLowerCase()] || {
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
