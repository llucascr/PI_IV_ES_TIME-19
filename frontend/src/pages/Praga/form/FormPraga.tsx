import { Button, Input } from "components";
import { config } from "config";
import { useUI } from "context";
import { useState } from "react";
import type { PragaType } from "types";
import { apiFetch } from "utils";

export const FormPraga = ({
  action,
  refetch,
  praga,
}: {
  action: "update" | "create";
  refetch: () => void;
  praga?: PragaType;
}) => {
  const ui = useUI();
  const [error, setError] = useState<boolean>(false);
  const [nomeComum, setNomeComum] = useState<string>(praga?.comumName || "");
  const [nomeCientifico, setNomeCientifico] = useState<string>(
    praga?.cientificName || ""
  );

  async function onSave(e: any) {
    e.preventDefault();

    const { error } = await apiFetch({
      url: config.apiUrl + "/prague/" + action,
      options: {
        method: action === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        params: praga ? { pragueId: praga.id } : {},
        data: {
          comumName: nomeComum,
          cientificName: nomeCientifico,
        },
      },
    });

    if (error) {
      setError(true);
    } else {
      refetch();

      ui.hide("modal", `${action}-praga`);
    }
  }

  return (
    <form action="" className="flex flex-col gap-4">
      <Input
        title="Nome Comum"
        field="nomeComum"
        id="nomeComum"
        required
        placeholder="Nome Comum"
        type="text"
        value={nomeComum}
        onChange={(e) => setNomeComum(e.target.value)}
      />

      <Input
        title="Nome Científico"
        field="nomeCientifico"
        id="nomeCientifico"
        required
        placeholder="Nome Científico"
        type="text"
        value={nomeCientifico}
        disabled={action === "update"}
        onChange={(e) => setNomeCientifico(e.target.value)}
      />

      {error && (
        <p className="text-red-500">Não foi possível salvar a praga.</p>
      )}

      <div className="flex justify-end gap-2">
        <Button
          color="yellow"
          title="Cancelar"
          type="button"
          onClick={() => ui.hide("modal", `${action}-praga`)}
        />
        <Button
          color="green"
          title="Salvar"
          type="submit"
          onClick={onSave}
          disable={!nomeComum || !nomeCientifico}
        />
      </div>
    </form>
  );
};
