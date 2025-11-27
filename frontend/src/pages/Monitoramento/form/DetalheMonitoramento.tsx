import { CaretDownIcon, PresentationChart } from "@phosphor-icons/react";
import type { RecordType } from "types";
import { applyMask, getRecordStatusDescription } from "utils";

interface DetalheMonitoramentoProps {
  monitoramento: RecordType;
}

export const DetalheMonitoramento = ({
  monitoramento,
}: DetalheMonitoramentoProps) => {
  return (
    <aside className="">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-primary/50 p-2">
            <PresentationChart size={32} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-text-value text-base font-semibold leading-normal">
              Detalhes do Monitoramento
            </h1>

            {monitoramento.prague && (
              <span className="flex gap-2 text-black text-sm font-normal leading-normal">
                <strong>Praga:</strong>{" "}
                <p className="first-letter:uppercase">
                  {monitoramento.prague.comumName}
                </p>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <div className="flex justify-between gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Data e Hora
            </p>
            <p className="text-text-value text-sm font-medium leading-normal text-right">
              18/07/2024 14:30
            </p>
          </div>
          <div className="flex justify-between items-center gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Status
            </p>
            <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-black font-bold-foreground">
              {getRecordStatusDescription(
                monitoramento.developmentStatus.toLocaleLowerCase()
              )}
            </span>
          </div>
          <div className="flex justify-between gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Contagem de Plantas
            </p>
            <p className="text-text-value text-sm font-medium leading-normal text-right">
              {monitoramento.plantsCount.toString().padStart(2, "0")}
            </p>
          </div>
          <div className="flex justify-between gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Plantas Avaliadas
            </p>
            <p className="text-text-value text-sm font-medium leading-normal text-right">
              {monitoramento.evaluatedPlantsCount.toString().padStart(2, "0")}
            </p>
          </div>
          <div className="flex justify-between gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Plantas Atacadas
            </p>
            <p className="text-text-value text-sm font-medium leading-normal text-right">
              {monitoramento.attackedPlantsCount.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-between items-center">
            <p className="text-black text-sm font-normal leading-normal">
              Porcentagem de Infestação
            </p>
            <p className="text-text-value text-sm font-semibold leading-normal">
              {monitoramento.infestationPercentage}%
            </p>
          </div>
          <div className="rounded-full bg-gray-200 h-2">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${monitoramento.infestationPercentage}%` }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-black text-sm font-normal leading-normal mb-2">
            Observação
          </p>
          <div className="p-3 rounded-lg bg-slate-100 border">
            <p className="text-text-value text-sm font-normal leading-normal">
              {monitoramento.observation}
            </p>
          </div>
        </div>
        <div className="flex flex-col pt-2 space-y-2">
          <details className="flex flex-col group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 text-black font-bold">
              <p className="text-sm font-bold leading-normal">Usuário</p>
              <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                <CaretDownIcon />
              </span>
            </summary>
            <div className="space-y-2 pb-2 pl-2 border-l-2 border-primary/30">
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Nome</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {monitoramento.user.name}
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Email</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {monitoramento.user.email}
                </p>
              </div>
            </div>
          </details>
          <hr />
          <details className="flex flex-col group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 text-black font-bold">
              <p className="text-sm font-bold leading-normal">Cliente</p>
              <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                <CaretDownIcon />
              </span>
            </summary>
            <div className="space-y-2 pb-2 pl-2 border-l-2 border-primary/30">
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Nome</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {monitoramento.client.name}
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Telefone</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {applyMask(
                    monitoramento.client.phoneNumber,
                    "(xx) xxxx-xxxx"
                  )}
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Email</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {monitoramento.client.email}
                </p>
              </div>
            </div>
          </details>
          <hr />
          <details className="flex flex-col group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 text-black font-bold">
              <p className="text-sm font-bold leading-normal">Lote</p>
              <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                <CaretDownIcon />
              </span>
            </summary>
            <div className="space-y-2 pb-2 pl-2 border-l-2 border-primary/30">
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Nome</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {monitoramento.batch.name}
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Área</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {monitoramento.batch.area} ha
                </p>
              </div>
            </div>
          </details>
          <hr />
          <details className="flex flex-col group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 text-black font-bold">
              <p className="text-sm font-bold leading-normal">Organização</p>
              <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
                <CaretDownIcon />
              </span>
            </summary>
            <div className="space-y-2 pb-2 pl-2 border-l-2 border-primary/30">
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Nome</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {monitoramento.organization.name}
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">CNPJ</p>
                <p className="text-text-value text-sm font-medium text-right">
                  {applyMask(
                    monitoramento.organization.cnpj,
                    "xx.xxx.xxx/xxxx-xx"
                  )}
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </aside>
  );
};
