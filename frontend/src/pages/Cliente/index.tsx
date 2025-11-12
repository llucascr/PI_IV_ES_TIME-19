// src/pages/Cliente.tsx
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "components";

type Lote = {
  nome: string;
  areaKm2: number; // área do lote em km²
};

type ClienteRow = {
  id: string;
  nome: string;
  email: string;
  status: "Ativo" | "Inativo";
  lotes?: Lote[];
};

const MOCK: ClienteRow[] = [
  {
    id: "CL-001",
    nome: "Ana Souza",
    email: "ana@example.com",
    status: "Ativo",
    lotes: [
      { nome: "Lote 01", areaKm2: 0.42 },
      { nome: "Lote 02", areaKm2: 1.1 },
      { nome: "Lote 03", areaKm2: 0.05 },
    ],
  },
  {
    id: "CL-002",
    nome: "Bruno Lima",
    email: "bruno@example.com",
    status: "Ativo",
    lotes: [
      { nome: "Lote 1", areaKm2: 0.88 },
      { nome: "Lote 2", areaKm2: 0.37 },
    ],
  },
  {
    id: "CL-003",
    nome: "Carla Paiva",
    email: "carla@example.com",
    status: "Inativo",
    lotes: [{ nome: "Lote 1", areaKm2: 2.5 }],
  },
];

export function Cliente() {
  const [q, setQ] = useState("");
  const [selecionado, setSelecionado] = useState<ClienteRow | null>(null);

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return MOCK;
    return MOCK.filter(
      (c) =>
        c.nome.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.id.toLowerCase().includes(s)
    );
  }, [q]);

  const fmt = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex h-full">
      {/* Coluna esquerda: lista de clientes */}
      <div className="flex mt"></div>
      <div className="flex-1 p-5 overflow-y">
        <div className="">
          <div className="mb-5 flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 ring-1 ring-gray-200">
            <MagnifyingGlass size={18} className="text-gray-400" />
            <input
              className="w-auto bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              placeholder="Pesquisar cliente…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
            <Button color="pink" title="Adicionar Cliente"/>
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
                onClick={() => setSelecionado(c)}
                className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-white"
              >
                Detalhes
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna direita: detalhes e lotes */}
      <div className="w-1/3 bg-gray-800 rounded-lg text-white p-4">
        {selecionado ? (
          <>
            <h2 className="text-lg font-semibold mb-3">{selecionado.nome}</h2>
            <p className="text-sm text-gray-300 mb-5">{selecionado.email}</p>
            <h3 className="text-sm uppercase text-gray-400 mb-2">
              Lotes cadastrados:
            </h3>
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
