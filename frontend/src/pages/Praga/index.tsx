import { Button, DataTable, type Column } from "components";
import { config } from "config";
import { useNotification, useUI } from "context";
import { useFetch } from "hooks";
import { useState } from "react";
import { FormPraga } from "./form";
import { NotePencilIcon, TrashIcon } from "@phosphor-icons/react";
import type { PragaType } from "types";
import { apiFetch } from "utils";
import { v4 } from "uuid";

export const Praga = () => {
  const ui = useUI();
  const { show } = useNotification();

  const [search, setSearch] = useState<string>("");
  const [selectedPraga, setSelectedPraga] = useState<PragaType>();

  const { data, error, loaded, refetch } = useFetch<{ data: PragaType[] }>({
    url: config.apiUrl + "/prague/list",
    options: {
      method: "GET",
      params: {
        page: 0,
        numberOfPragues: 100,
      },
    },
  });

  async function deletarPraga(id: React.Key) {
    const { error } = await apiFetch({
      url: config.apiUrl + "/prague/delete",
      options: {
        method: "DELETE",
        params: {
          pragueId: id,
        },
      },
    });

    if (error) {
      show!(
        v4(),
        "Deletar Praga",
        "error",
        "Não foi possível deletar a praga."
      );
    } else {
      refetch();

      show!(v4(), "Deletar Praga", "error", "Praga deletada com sucesso.");
    }
  }

  const columns: Column<PragaType>[] = [
    {
      field: "comumName",
      header: "Nome Comum",
      sortable: true,
    },
    {
      field: "cientificName",
      header: "Nome Científico",
      sortable: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="m-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          Listagem de Pragas
        </h1>
      </div>
      {error && <>Mensagem de erro</>}

      {loaded && !error ? (
        <>Carregando Placeholder...</>
      ) : (
        <>
          {data && (
            <DataTable<PragaType>
              dataKey="id"
              globalFilterValue={search}
              globalFilterFields={["comumName", "cientificName"]}
              paginatorRight={
                <>
                  {selectedPraga && (
                    <div className="flex gap-2">
                      <Button
                        color="blue"
                        title="Editar"
                        icon={<NotePencilIcon />}
                        positionIcon="left"
                        type="button"
                        onClick={() =>
                          ui.show({
                            id: "update-praga",
                            content: (
                              <FormPraga
                                action="update"
                                praga={selectedPraga}
                                refetch={refetch}
                              />
                            ),
                            type: "modal",
                            options: {
                              titulo: "Editar Praga",
                              position: "right",
                            },
                          })
                        }
                      />
                      <Button
                        color="red"
                        title="Deletar"
                        icon={<TrashIcon />}
                        positionIcon="left"
                        type="button"
                        onClick={() => deletarPraga(selectedPraga.id)}
                      />
                    </div>
                  )}
                </>
              }
              header={{
                btnLeft: [
                  {
                    title: "Cadastrar Praga",
                    onClick: () => {
                      ui.show({
                        id: "create-praga",
                        content: (
                          <FormPraga action="create" refetch={refetch} />
                        ),
                        type: "modal",
                        options: {
                          titulo: "Cadastrar Praga",
                          position: "right",
                        },
                      });
                    },
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
              onSelectionChange={setSelectedPraga}
              selection={selectedPraga}
              paginator
            />
          )}
        </>
      )}
    </div>
  );
};
