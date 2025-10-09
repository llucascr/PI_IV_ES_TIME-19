import { useFetch } from "hooks";

type Placeholder = {
  userId: React.Key;
  id: React.Key;
  title: string;
  completed: boolean;
};

export const HomePage = () => {
  // const [placeholder, setPlaceholder] = useState<Placeholder>();

  // Hook aconselhavel para buscar dados API (GET)
  // OBS: Não aconselhavel para metodos POST, PUT...
  const {
    data: placeholder,
    error,
    loaded,
    refetch,
  } = useFetch<{ data: Placeholder }>({
    url: "https://jsonplaceholder.typicode.com/todos/1",
    options: { method: "GET" },
  });

  // Uma opção de buscar ou enviar dados para API (Opção aconselhavel para envio de dados)
  // async function getPlaceholder() {
  //   const { data } = await apiFetch<{ data: Placeholder }>({
  //     url: "https://jsonplaceholder.typicode.com/todos/1",
  //     options: {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   });

  //   setPlaceholder(data);
  // }

  return (
    <div className="flex flex-col items-center">
      <h1>Home Page</h1>

      <button type="button" onClick={refetch}>
        Buscar Placeholder
      </button>

      {/* <div className="flex gap-4">
        <button type="button" onClick={getPlaceholder}>
          Buscar Placeholder
        </button>
        <button type="button" onClick={() => setPlaceholder(undefined)}>
          Limpar Placeholder
        </button>
      </div> */}

      {error && <>Mensagem de erro</>}

      {loaded && !error ? (
        <>Carregando Placeholder...</>
      ) : (
        <pre>{JSON.stringify(placeholder, null, 2)}</pre>
      )}
    </div>
  );
};
