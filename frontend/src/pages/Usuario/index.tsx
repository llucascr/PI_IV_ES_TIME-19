import { Button, DataTable, StatusPulseDot, type Column } from "components";
import { config } from "config";
import { useUI } from "context";
import { useFetch } from "hooks";
import { useState } from "react";
import { NotePencilIcon } from "@phosphor-icons/react";
import type { OrganizacaoByIdType, UsuarioType } from "types";
import { FormUsuario } from "./form";
import { getOrganizacao } from "utils";

export const Usuario = () => {
  const ui = useUI();
  const [search, setSearch] = useState<string>("");
  const [selectedUsuario, setSelectedUsuario] = useState<UsuarioType>();

  const { data, error, loaded, refetch } = useFetch<{
    data: OrganizacaoByIdType;
  }>({
    url: config.apiUrl + "/organization/listById",
    options: {
      method: "GET",
      params: {
        organizationId: getOrganizacao()?.id,
      },
    },
  });

  const columns: Column<UsuarioType>[] = [
    {
      field: "active",
      header: "Status",
      sortable: true,
      body: (rowData) =>
        rowData.active ? (
          <StatusPulseDot status="ativo" />
        ) : (
          <StatusPulseDot status="inativo" />
        ),
    },
    {
      field: "name",
      header: "Nome",
      sortable: true,
    },
    {
      field: "email",
      header: "Email",
      sortable: false,
    },
    {
      field: "button",
      header: "",
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            color="blue"
            title=""
            icon={<NotePencilIcon />}
            positionIcon="left"
            type="button"
            onClick={() =>
              ui.show({
                id: "update-usuario",
                content: (
                  <FormUsuario
                    action="update"
                    usuario={rowData}
                    refetch={refetch}
                  />
                ),
                type: "modal",
                options: {
                  titulo: "Editar Usuário",
                  position: "right",
                },
              })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="m-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          Listagem de Usuários
        </h1>
      </div>

      <div className="w-full h-auto border border-gray-300 rounded-2xl cursor-pointer">
        {/* Header */}
        <div className="bg-gray-100 border-b border-gray-300/70 rounded-t-2xl px-6 py-3 text-md font-medium flex justify-start items-center gap-2">
          <strong>Organização: </strong>
          <h3>{data?.name}</h3>
        </div>

        {/* DataTable */}
        <div className="my-8 mx-2">
          {error && <>Mensagem de erro</>}

          {loaded && !error ? (
            <>Carregando Placeholder...</>
          ) : (
            <>
              {data && (
                <DataTable<UsuarioType>
                  dataKey="id"
                  globalFilterValue={search}
                  globalFilterFields={["name", "email"]}
                  paginatorRight={
                    <>
                      {selectedUsuario && (
                        <div className="flex gap-2">
                          <Button
                            color="blue"
                            title="Editar"
                            icon={<NotePencilIcon />}
                            positionIcon="left"
                            type="button"
                            onClick={() =>
                              ui.show({
                                id: "update-usuario",
                                content: (
                                  <FormUsuario
                                    action="update"
                                    usuario={selectedUsuario}
                                    refetch={refetch}
                                  />
                                ),
                                type: "modal",
                                options: {
                                  titulo: "Editar Usuário",
                                  position: "right",
                                },
                              })
                            }
                          />
                        </div>
                      )}
                    </>
                  }
                  header={{
                    btnLeft: [
                      {
                        title: "Cadastrar Usuário",
                        onClick: () => {
                          ui.show({
                            id: "create-usuario",
                            content: (
                              <FormUsuario action="create" refetch={refetch} />
                            ),
                            type: "modal",
                            options: {
                              titulo: "Cadastrar Usuário",
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
                  value={data.users}
                  columns={columns}
                  rows={10}
                  selectionMode="single"
                  onSelectionChange={setSelectedUsuario}
                  selection={selectedUsuario}
                  paginator
                />
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300/70  rounded-b-2xl px-6 py-3 text-md font-medium flex justify-between items-center max-sm:flex-col max-sm:gap-2"></div>
      </div>
    </div>
  );
};
