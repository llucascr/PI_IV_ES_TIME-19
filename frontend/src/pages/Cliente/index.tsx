// src/pages/Cliente.tsx
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass, PlusCircleIcon } from "@phosphor-icons/react";
import { Button } from "components";
import { useUI } from "context";
import { FormCliente } from "./forms/formClient";
import { config } from "config";
import { FormBatch } from "./forms/formBatch";
import { useFetch } from "hooks";
import type { ClienteType, LoteType } from "types/cliente";
import { getOrganizacao } from "utils";

const fmt = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function Cliente() {
  const ORG_ID = getOrganizacao()?.id;
  const ui = useUI();

  const [q, setQ] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClienteType | null>(null);

  const {
    data: clientesData,
    error: clientesError,
    loaded: clientesLoading,
    refetch: refetchClientes,
  } = useFetch<{ data: ClienteType[] }>({
    url: `${config.apiUrl}/client/listByOrg`,
    options: {
      method: "GET",
      params: {
        idOrganization: ORG_ID,
        active: true,
        page: 0,
        size: 100,
      },
    },
  });

  const clientes: ClienteType[] = useMemo(
    () => (clientesData ? (clientesData as unknown as ClienteType[]) : []),
    [clientesData]
  );

  const {
    data: lotesData,
    error: lotesError,
    loaded: lotesLoading,
    refetch: refetchLotes,
  } = useFetch<{ data: LoteType[] }>({
    url: `${config.apiUrl}/batch/listBy`,
    options: {
      method: "GET",
      params: {
        organizationId: ORG_ID,
        clientId: selectedClient?.id,
        page: 0,
        numberOfBatches: 10,
      },
    },
  });

  const lotes: LoteType[] = useMemo(
    () => (lotesData ? (lotesData as unknown as LoteType[]) : []),
    [lotesData]
  );

  useEffect(() => {
    if (clientesError) {
      console.error("Erro ao buscar clientes:", clientesError);
    }
  }, [clientesError]);

  useEffect(() => {
    if (lotesError) {
      console.error("Erro ao buscar lotes:", lotesError);
    }
  }, [lotesError]);

  const dataFiltrada = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return clientes;

    return clientes.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s)
    );
  }, [q, clientes]);

  const refetch = refetchClientes;

  useEffect(() => {
    if (selectedClient) {
      refetchLotes();
    }
  }, [selectedClient]);


  const handleClickCliente = (c: ClienteType) => {
    setSelectedClient(c);
  };

  const handleOpenCreateCliente = () => {
    ui.show({
      id: "create-cliente",
      content: <FormCliente action="create" refetch={refetch} />,
      type: "modal",
      options: {
        titulo: "Cadastrar Cliente",
        position: "right",
      },
    });
  };

  const handleOpenCreateLote = () => {
    if (!selectedClient) return;

    ui.show({
      id: "create-lote",
      content: (
        <FormBatch
          action="create"
          clientId={selectedClient.id}
          refetch={refetchLotes}
        />
      ),
      type: "modal",
      options: {
        titulo: "Cadastrar Lote",
        position: "right",
      },
    });
  };

  return (
    <div className="flex min-h-screen pb-5">
      {/* Coluna esquerda: clientes */}
      <div className="flex-1 p-5 bg-white rounded-l-2xl">
        <div className="col-span-2 mb-5 flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 ring-1 ring-gray-200 shadow-md h-10">
            <MagnifyingGlass size={18} className="text-gray-400" />
            <input
              className="w-auto bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              placeholder="Pesquisar cliente…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <Button
            className="border-0 shadow-md h-10"
            color="pink"
            icon={<PlusCircleIcon />}
            positionIcon="left"
            title="Cliente"
            onClick={handleOpenCreateCliente}
          />
        </div>

        {clientesLoading ? (
          <p className="text-xs text-gray-500">Carregando clientes...</p>
        ) : null}

        <div className="space-y-3 mt-2">
          {dataFiltrada.map((c) => (
            <div
              key={c.id}
              className={`flex items-center justify-between rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100 transition cursor-pointer ${selectedClient?.id === c.id ? "bg-gray-200" : ""
                }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {c.name}
                </p>
                <p className="truncate text-xs text-gray-600">{c.email}</p>
                <p className="truncate text-[11px] text-gray-500 mt-1">
                  {c.active ? "Ativo" : "Inativo"}
                </p>
              </div>
              <button
                onClick={() => handleClickCliente(c)}
                className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-white"
              >
                Detalhes
              </button>
            </div>
          ))}

          {!clientesLoading && dataFiltrada.length === 0 ? (
            <p className="text-xs text-gray-500 italic">
              Nenhum cliente encontrado.
            </p>
          ) : null}
        </div>
      </div>

      {/* Coluna direita: lotes */}
      <div className="w-1/3 bg-gray-800 text-white p-4 flex flex-col rounded-r-2xl">
        {selectedClient ? (
          <>
            <h2 className="text-lg font-semibold mb-3">
              {selectedClient.name}
            </h2>
            <p className="text-sm text-gray-300 mb-1">
              {selectedClient.email}
            </p>
            <p className="text-xs text-gray-400 mb-5">
              {selectedClient.active ? "Cliente ativo" : "Cliente inativo"}
            </p>

            <h3 className="text-sm uppercase text-gray-400 mb-2">
              Lotes cadastrados:
            </h3>

            {lotesLoading && (
              <p className="text-xs text-gray-400 mb-2">
                Carregando lotes...
              </p>
            )}

            <div className="space-y-2 mb-10">
              {lotes.map((lote) => (
                <div
                  key={lote.id}
                  className="rounded-md bg-gray-700 px-3 py-2 text-sm flex items-center justify-between"
                >
                  <span>{lote.name}</span>
                  <span className="text-gray-300">
                    {fmt.format(lote.area)} km²
                  </span>
                </div>
              ))}

              {!lotesLoading && lotes.length === 0 ? (
                <p className="text-xs text-gray-400 italic">
                  Nenhum lote cadastrado para este cliente.
                </p>
              ) : null}
            </div>

            <div className="fixed bottom-10 right-12">
              <Button
                className="border-0 shadow-md h-10"
                color="pink"
                icon={<PlusCircleIcon />}
                positionIcon="left"
                title="Lote"
                onClick={handleOpenCreateLote}
              />
            </div>
          </>
        ) : (
          <div className="text-gray-400 text-sm italic">
            Selecione um cliente para ver os lotes.
          </div>
        )}
      </div>
    </div>
  );
}
