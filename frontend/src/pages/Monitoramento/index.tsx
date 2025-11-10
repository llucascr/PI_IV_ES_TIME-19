import {
  ArrowsCounterClockwise,
  CaretDownIcon,
  CheckCircleIcon,
  Eye,
  NotePencilIcon,
  PresentationChart,
  TrashIcon,
} from "@phosphor-icons/react";
import { Button, DataTable, StatusPulseDot, type Column } from "components";
import { config } from "config";
import { useUI } from "context";
import { useFetch } from "hooks";
import { useState } from "react";
import type { RecordType } from "types";
import { getOrganizacao, getRecordStatusDescription } from "utils";

export const Monitoramento = () => {
  const ui = useUI();
  const [search, setSearch] = useState<string>("");
  const [selectedMonitoramento, setSelectedMonitoramento] =
    useState<RecordType>();

  const { data, error, loaded, refetch } = useFetch<{
    data: RecordType[];
  }>({
    url: config.apiUrl + "/record/listByOrg",
    options: {
      method: "GET",
      params: {
        organizationId: getOrganizacao()?.id,
      },
    },
  });

  const columns: Column<RecordType>[] = [
    {
      field: "developmentStatus",
      header: "Status",
      sortable: true,
      body: (rowData) => (
        <StatusPulseDot
          status={getRecordStatusDescription(rowData.developmentStatus)}
        />
      ),
    },
    {
      field: "plantsCount",
      header: "Contagem de Plantas",
      sortable: true,
    },
    {
      field: "evaluatedPlantsCount",
      header: "Plantas Avaliadas",
      sortable: false,
    },
    {
      field: "attackedPlantsCount",
      header: "Plantas Atacadas",
      sortable: true,
    },
    {
      field: "infestationPercentage",
      header: "Porcentagem de Infestação",
      sortable: false,
      body: (rowData) => (
        <div className="rounded-full bg-gray-200 h-2">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${rowData.infestationPercentage}%` }}
          ></div>
        </div>
      ),
    },

    {
      field: "batch",
      header: "Lote Nome",
      body: (rowData) => <div>{rowData.batch.name}</div>,
      sortable: false,
    },
    {
      field: "button",
      header: "",
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            color="green"
            variant="outline"
            title=""
            icon={<Eye />}
            positionIcon="left"
            type="button"
            onClick={() =>
              ui.show({
                id: "detalhes-record",
                content: <DetalheSidebarMonitoramento />,
                type: "sidebar",
                options: {
                  titulo: "Detalhes Monitoramento",
                  position: "right",
                },
              })
            }
          />
          <Button
            color="blue"
            title=""
            icon={<NotePencilIcon />}
            positionIcon="left"
            type="button"
            onClick={() =>
              ui.show({
                id: "update-record",
                content: <></>,
                type: "sidebar",
                options: {
                  titulo: "Editar Monitoramento",
                  position: "right",
                },
              })
            }
          />

          {rowData.developmentStatus.toLocaleLowerCase() ==
            "pending_review" && (
            <>
              <Button
                color="red"
                title=""
                icon={<TrashIcon />}
                positionIcon="left"
                type="button"
                onClick={() => console.log("Cancelar")}
              />

              <Button
                color="green"
                title=""
                icon={<CheckCircleIcon />}
                positionIcon="left"
                type="button"
                onClick={() => console.log("Aprovar")}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="m-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          Monitoramento
        </h1>
      </div>

      {/* DataTable */}
      <div className="mx-2">
        {error && <>Mensagem de erro</>}

        {loaded && !error ? (
          <>Carregando Monitoramento...</>
        ) : (
          <>
            {data && (
              <DataTable<RecordType>
                dataKey="id"
                globalFilterValue={search}
                globalFilterFields={["developmentStatus", "observation"]}
                paginatorRight={
                  <>
                    {selectedMonitoramento && (
                      <div className="flex gap-2">
                        <Button
                          color="blue"
                          title="Editar"
                          icon={<NotePencilIcon />}
                          positionIcon="left"
                          type="button"
                          onClick={() =>
                            ui.show({
                              id: "update-record",
                              content: <></>,
                              type: "sidebar",
                              options: {
                                titulo: "Editar Monitoramento",
                                position: "right",
                              },
                            })
                          }
                        />

                        <Button
                          color="green"
                          variant="outline"
                          title="Detalhes"
                          icon={<Eye />}
                          positionIcon="left"
                          type="button"
                          onClick={() =>
                            ui.show({
                              id: "detalhes-record",
                              content: <DetalheSidebarMonitoramento />,
                              type: "sidebar",
                              options: {
                                titulo: "Detalhes Monitoramento",
                                position: "right",
                              },
                            })
                          }
                        />
                        {selectedMonitoramento.developmentStatus.toLocaleLowerCase() ==
                          "pending_review" && (
                          <>
                            <Button
                              color="red"
                              title="Cancelar"
                              icon={<TrashIcon />}
                              positionIcon="left"
                              type="button"
                              onClick={() => console.log("Cancelar")}
                            />
                            <Button
                              color="green"
                              title="Aprovar"
                              icon={<CheckCircleIcon />}
                              positionIcon="left"
                              type="button"
                              onClick={() => console.log("Aprovar")}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </>
                }
                header={{
                  btnLeft: [
                    {
                      title: "Cadastrar Monitoramento",
                      onClick: () => {
                        ui.show({
                          id: "create-record",
                          content: <></>,
                          type: "sidebar",
                          options: {
                            titulo: "Cadastrar Monitoramento",
                            position: "right",
                          },
                        });
                      },
                    },
                    {
                      icon: <ArrowsCounterClockwise />,
                      onClick: refetch,
                      title: "Reload",
                    },
                  ],
                  inputSearch: {
                    globalFilterValue: search,
                    onGlobalFilterChange: setSearch,
                    placeholder: "Pesquisar",
                  },
                }}
                value={data}
                columns={columns}
                rows={10}
                selectionMode="single"
                onSelectionChange={setSelectedMonitoramento}
                selection={selectedMonitoramento}
                paginator
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const DetalheSidebarMonitoramento = () => {
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

            <span className="flex gap-2 text-black text-sm font-normal leading-normal">
              <strong>Praga:</strong>{" "}
              <p className="first-letter:uppercase">
                bacillus amyloliquefaciens
              </p>
            </span>
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
              Concluído
            </span>
          </div>
          <div className="flex justify-between gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Contagem de Plantas
            </p>
            <p className="text-text-value text-sm font-medium leading-normal text-right">
              5,000
            </p>
          </div>
          <div className="flex justify-between gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Plantas Avaliadas
            </p>
            <p className="text-text-value text-sm font-medium leading-normal text-right">
              4,800
            </p>
          </div>
          <div className="flex justify-between gap-x-4 py-2.5">
            <p className="text-black text-sm font-normal leading-normal">
              Plantas Atacadas
            </p>
            <p className="text-text-value text-sm font-medium leading-normal text-right">
              240
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-between items-center">
            <p className="text-black text-sm font-normal leading-normal">
              Porcentagem de Infestação
            </p>
            <p className="text-text-value text-sm font-semibold leading-normal">
              5%
            </p>
          </div>
          <div className="rounded-full bg-gray-200 h-2">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: "5%" }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-black text-sm font-normal leading-normal mb-2">
            Observação
          </p>
          <div className="p-3 rounded-lg bg-slate-100 border">
            <p className="text-text-value text-sm font-normal leading-normal">
              Infestação concentrada na área norte do lote, com presença de
              pulgões. Recomenda-se monitoramento contínuo e aplicação de
              defensivo específico.
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
                  João Silva
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Email</p>
                <p className="text-text-value text-sm font-medium text-right">
                  joao.silva@email.com
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
                  Fazenda Sol Nascente
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Telefone</p>
                <p className="text-text-value text-sm font-medium text-right">
                  (11) 98765-4321
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Email</p>
                <p className="text-text-value text-sm font-medium text-right">
                  contato@solnascente.com
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
                  Lote 7-B
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">Área</p>
                <p className="text-text-value text-sm font-medium text-right">
                  150 ha
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
                  AgroCorp Brasil
                </p>
              </div>
              <div className="flex justify-between gap-x-4">
                <p className="text-black text-sm">CNPJ</p>
                <p className="text-text-value text-sm font-medium text-right">
                  12.345.678/0001-99
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </aside>
  );
};
