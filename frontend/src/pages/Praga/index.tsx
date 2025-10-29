import { DataTable, type Column } from "components";
import { config } from "config";
import { useUI } from "context";
import { useFetch } from "hooks";
import { useState } from "react";
import { apiFetch } from "utils";

type Praga = {
  _id: React.Key;
  id: React.Key;
  comumName: string;
  cientificName: string;
};

export const Praga = () => {
  const ui = useUI();

  const [search, setSearch] = useState<string>("");

  const { data, error, loaded, refetch } = useFetch<{ data: Praga[] }>({
    url: config.apiUrl + "/prague/list",
    options: {
      method: "GET",
      params: {
        page: 0,
        numberOfPragues: 100,
      },
    },
  });

  const columns: Column<Praga>[] = [
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
      <div className="mb-8">
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
            <DataTable<Praga>
              dataKey="id"
              globalFilterValue={search}
              globalFilterFields={["comumName", "cientificName"]}
              header={{
                btnLeft: [
                  {
                    title: "Cadastrar Praga",
                    onClick: () => {
                      ui.show({
                        id: "cadastrar-praga",
                        content: <FormCadastroPraga refetch={refetch} />,
                        type: "sidebar",
                        options: {
                          titulo: "Cadastrar Praga",
                          position: "right"
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
              paginator
            />
          )}
        </>
      )}
    </div>
  );
};

const FormCadastroPraga = ({ refetch }: { refetch: () => void }) => {
  const ui = useUI();
  const [nomeComum, setNomeComum] = useState<string>("");
  const [nomeCientifico, setNomeCientifico] = useState<string>("");

  async function onSave(e: any) {
    e.preventDefault();

    const { data, error } = await apiFetch({
      url: config.apiUrl + "/prague/create",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          comumName: nomeComum,
          cientificName: nomeCientifico,
        },
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      refetch();
    }

    ui.hide("modal", "cadastrar-praga");
  }

  return (
    <form action="" className="flex flex-col gap-4">
      <input
        type="text"
        value={nomeComum}
        onChange={(e) => setNomeComum(e.target.value)}
        placeholder="Nome Comum"
        required
      />

      <input
        type="text"
        value={nomeCientifico}
        onChange={(e) => setNomeCientifico(e.target.value)}
        placeholder="Nome Científico"
        required
      />

      <button type="submit" onClick={onSave}>
        Salvar
      </button>
    </form>
  );
};
