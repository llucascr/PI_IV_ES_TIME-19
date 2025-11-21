// src/pages/Cliente.tsx
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass, PlusCircleIcon } from "@phosphor-icons/react";
import { Button } from "components";
import { useUI } from "context";
import { FormCliente } from "./form";
import { apiFetch } from "utils";
import { config } from "config";

type Lote = {
  nome: string;
  areaKm2: number;
};

type ClienteRow = {
  id: string;
  nome: string;
  email: string;
  status: "Ativo" | "Inativo";
  lotes?: Lote[];
};

const ORG_ID = "4b3fe7de-1c28-4fb0-80c3-427ee7d0627e";

export function Cliente() {
  const ui = useUI();
  const [q, setQ] = useState("");
  const [clientes, setClientes] = useState<ClienteRow[]>([]);
  const [selecionado, setSelecionado] = useState<ClienteRow | null>(null);
  const [loadingLotes, setLoadingLotes] = useState(false);

  async function loadClientes() {
    const res: any = await apiFetch({
      url: config.apiUrl + "/client/listByOrg",
      options: {
        method: "GET",
        params: {
          idOrganization: ORG_ID,
          active: true,
          page: 0,
          size: 10,
        },
      },
    });

    const data = res.data;
    const error = res.error;

    if (!error && Array.isArray(data)) {
      const rows: ClienteRow[] = data.map((c: any) => ({
        id: c.id,
        nome: c.name,
        email: c.email,
        status: c.active ? "Ativo" : "Inativo",
      }));
      setClientes(rows);
    }
  }

  useEffect(() => {
    loadClientes();
  }, []);

  const refetch = () => {
    loadClientes();
  };

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    const base = clientes;
    if (!s) return base;

    return base.filter(
      (c) =>
        c.nome.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.id.toLowerCase().includes(s)
    );
  }, [q, clientes]);

  const fmt = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  async function handleSelectCliente(cliente: ClienteRow) {
    setSelecionado({ ...cliente, lotes: undefined });
    setLoadingLotes(true);

    const res: any = await apiFetch({
      url: config.apiUrl + "/batch/listByOrgClient",
      options: {
        method: "GET",
        params: {
          clientId: cliente.id,
          organizationId: ORG_ID,
          page: 0,
          numberOfBatches: 10,
        },
      },
    });

    const data = res.data;
    const error = res.error;

    if (!error) {
      const arrayData = Array.isArray(data) ? data : [];

      const lotes: Lote[] = arrayData.map((b: any) => ({
        nome: b.name ?? b.nome ?? `Lote ${b.id ?? ""}`,
        areaKm2: b.areaKm2 ?? b.area ?? 0,
      }));

      setSelecionado((prev) =>
        prev && prev.id === cliente.id ? { ...prev, lotes } : prev
      );
    }

    setLoadingLotes(false);
  }

  return (
    // raiz ocupa 100% da altura do card branco e esconde overflow geral
    <div className="flex h-full overflow-hidden">
      {/* Coluna esquerda: lista de clientes com scroll próprio */}
      <div className="flex-1 p-5 overflow-y-auto">
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
            onClick={() => {
              ui.show({
                id: "create-cliente",
                content: (
                  <FormCliente
                    action="create"
                    refetch={refetch}
                  />
                ),
                type: "modal",
                options: {
                  titulo: "Cadastrar Cliente",
                  position: "right",
                },
              });
            }}
          />
        </div>

        <div className="space-y-3">
          {data.map((c) => (
            <div
              key={c.id}
              className={`flex items-center justify-between rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-100 transition cursor-pointer ${
                selecionado?.id === c.id ? "bg-gray-200" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {c.nome}
                </p>
                <p className="truncate text-xs text-gray-600">{c.email}</p>
              </div>
              <button
                onClick={() => handleSelectCliente(c)}
                className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-white"
              >
                Detalhes
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna direita: mesma altura do card, com scroll interno */}
      <div className="w-1/3 bg-gray-800 rounded-lg text-white p-4 h-full overflow-y-auto">
        {selecionado ? (
          <>
            <h2 className="text-lg font-semibold mb-3">
              {selecionado.nome}
            </h2>
            <p className="text-sm text-gray-300 mb-5">
              {selecionado.email}
            </p>
            <h3 className="text-sm uppercase text-gray-400 mb-2">
              Lotes cadastrados:
            </h3>

            {loadingLotes ? (
              <div className="text-gray-400 text-xs italic">
                Carregando lotes...
              </div>
            ) : (
              <div className="space-y-2">
                {selecionado.lotes?.map((lote, i) => (
                  <div
                    key={i}
                    className="rounded-md bg-gray-700 px-3 py-2 text-sm flex items-center justify-between"
                  >
                    <span>{lote.nome}</span>
                    <span className="text-gray-300">
                      {fmt.format(lote.areaKm2)} km²
                    </span>
                  </div>
                ))}

                {!selecionado.lotes?.length && (
                  <div className="text-gray-400 text-xs italic">
                    Nenhum lote encontrado para este cliente.
                  </div>
                )}
              </div>
            )}
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
