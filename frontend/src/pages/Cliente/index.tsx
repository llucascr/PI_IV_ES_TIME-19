// src/pages/Cliente.tsx
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

type ClienteRow = {
  id: string;
  nome: string;
  email: string;
  status: "Ativo" | "Inativo";
};

const MOCK: ClienteRow[] = [
  {
    id: "CL-001",
    nome: "Ana Souza",
    email: "ana@example.com",
    status: "Ativo",
  },
  {
    id: "CL-002",
    nome: "Bruno Lima",
    email: "bruno@example.com",
    status: "Ativo",
  },
  {
    id: "CL-003",
    nome: "Carla Paiva",
    email: "carla@example.com",
    status: "Inativo",
  },
  {
    id: "CL-004",
    nome: "Diego Matos",
    email: "diego@example.com",
    status: "Ativo",
  },
  {
    id: "CL-005",
    nome: "Elisa Prado",
    email: "elisa@example.com",
    status: "Ativo",
  },
  {
    id: "CL-006",
    nome: "Felipe Araújo",
    email: "felipe@example.com",
    status: "Ativo",
  },
  {
    id: "CL-007",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
  {
    id: "CL-008",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
  {
    id: "CL-008",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
  {
    id: "CL-008",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
  {
    id: "CL-008",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
  {
    id: "CL-008",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
  {
    id: "CL-008",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
  {
    id: "CL-008",
    nome: "Gabriela Reis",
    email: "gabi@example.com",
    status: "Inativo",
  },
];

export function Cliente() {
  const [q, setQ] = useState("");

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

  return (
    <div className="p-5 bg-white rounded-lg h-screen overflow-aut">
      <div className="mb-5 rounded-xl bg-gray-300 p-3">
        <div className="flex items-center gap-3">
          <div className="mr-auto flex w-full max-w-md items-center rounded-xl bg-white px-3 py-2 ring-1 ring-gray-200">
            <span className="mr-2 text-sm text-gray-400">
              <MagnifyingGlass size={18} />
            </span>
            <input
              className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              placeholder="Pesquisar cliente…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="space-y-3">
        {data.length === 0 && (
          <div className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-6 text-center text-sm text-gray-500">
            Nenhum cliente encontrado.
          </div>
        )}

        {/* Mapeando os clientes */}
        {data.map((c, index) => (
          <div
            key={c.id}
            className={`flex items-center justify-between rounded-xl border border-gray-300 bg-gray-100 px-4 py-4 hover:bg-gray-200 ${
              index === data.length - 1 ? "mb-1" : "" // Aplica margem inferior no último item
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {c.nome}
              </p>
              <p className="truncate text-xs text-gray-600">{c.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-white">
                Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
