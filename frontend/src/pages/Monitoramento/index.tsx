import {
  ArrowsCounterClockwise,
  CheckCircleIcon,
  Eye,
  NotePencilIcon,
  Trash,
  TrashIcon,
} from "@phosphor-icons/react";
import { Button, DataTable, StatusPulseDot, type Column } from "components";
import { config } from "config";
import { useNotification, useUI } from "context";
import { useFetch } from "hooks";
import { useState } from "react";
import type { RecordType } from "types";
import { apiFetch, getOrganizacao, getRecordStatusDescription } from "utils";
import { FormMonitoramento } from "./form/FormMonitoramento";
import { DetalheMonitoramento } from "./form/DetalheMonitoramento";
import { v4 } from "uuid";

export const Monitoramento = () => {
  const ui = useUI();
  const { show } = useNotification();
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

  async function deletarMonitoramento(id: React.Key) {
    const { error } = await apiFetch({
      url: config.apiUrl + "/record/delete",
      options: {
        method: "DELETE",
        params: {
          recordId: id,
        },
      },
    });

    if (error) {
      show!(
        v4(),
        "Deletar Monitoramento",
        "error",
        "Não foi possível deletar monitoramento."
      );
    } else {
      refetch();

      show!(
        v4(),
        "Deletar Monitoramento",
        "error",
        "Monitoramento deletado com sucesso."
      );
    }

    setSelectedMonitoramento(undefined);
  }

  const columns: Column<RecordType>[] = [
    {
      field: "developmentStatus",
      header: "Status",
      sortable: true,
      body: (rowData) => (
        <StatusPulseDot
          developmentStatus={rowData.developmentStatus}
          status={getRecordStatusDescription(rowData.developmentStatus)}
        />
      ),
    },
    {
      field: "prague",
      header: "Praga",
      sortable: true,
      body: (rowData) =>
        rowData.prague && (
          <div className="first-letter:uppercase italic">
            {rowData.prague?.comumName}
          </div>
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
                content: <DetalheMonitoramento monitoramento={rowData} />,
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
                content: (
                  <FormMonitoramento
                    action="update"
                    refetch={refetch}
                    monitoramento={rowData}
                  />
                ),
                type: "sidebar",
                options: {
                  titulo: "Editar Monitoramento",
                  position: "right",
                },
              })
            }
          />

          <Button
            color="red"
            title=""
            icon={<TrashIcon />}
            positionIcon="left"
            type="button"
            onClick={() => deletarMonitoramento(rowData.id)}
          />

          {rowData.developmentStatus.toLocaleLowerCase() ==
            "pending_review" && (
              <>
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
                              content: (
                                <FormMonitoramento
                                  action="update"
                                  refetch={refetch}
                                  monitoramento={selectedMonitoramento}
                                />
                              ),
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
                              content: (
                                <DetalheMonitoramento
                                  monitoramento={selectedMonitoramento}
                                />
                              ),
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

                        <Button
                          color="red"
                          variant="ghost"
                          title="Deletar"
                          icon={<Trash />}
                          positionIcon="left"
                          type="button"
                          onClick={() =>
                            deletarMonitoramento(selectedMonitoramento.id)
                          }
                        />
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
                          content: (
                            <FormMonitoramento
                              action="create"
                              refetch={refetch}
                            />
                          ),
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
