import { Button } from "components";
import { useUI } from "context";
import { FormConfiguracao } from "./form";

export const HomePage = () => {
  const ui = useUI();

  return (
    <div className="p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Button
          color="green"
          title="Configuração"
          onClick={() =>
            ui.show({
              id: "configuracao-safratech",
              content: <FormConfiguracao />,
              type: "sidebar",
              options: {
                titulo: "Configurar Aplicação (dev)",
                position: "right",
              },
            })
          }
        />
      </header>
    </div>
  );
};
