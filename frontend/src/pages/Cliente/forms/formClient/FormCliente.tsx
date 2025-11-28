// src/pages/Cliente/form.tsx
import { Button, Input } from "components";
import { config } from "config";
import { useUI } from "context";
import { useState } from "react";
import type { ClienteType } from "types";
import { apiFetch, getOrganizacao } from "utils";

export const FormCliente = ({
  action,
  refetch,
  cliente,
}: {
  action: "update" | "create";
  refetch: () => void;
  cliente?: ClienteType;
}) => {
  const ui = useUI();
  const [error, setError] = useState<boolean>(false);
  const [nome, setNome] = useState<string>(cliente?.name || "");
  const [email, setEmail] = useState<string>(cliente?.email || "");
  const [endereco, setEndereco] = useState<string>(cliente?.adress || "");
  const [telefone, setTelefone] = useState<string>(cliente?.phonenumber || "");

  async function onSave(e: any) {
    e.preventDefault();

    const { error } = await apiFetch({
      url: config.apiUrl + "/client/" + action,
      options: {
        method: action === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        params: cliente
          ? {
              clientId: cliente.id,
              idOrganization: getOrganizacao()?.id,
            }
          : {
              idOrganization: getOrganizacao()?.id,
            },
        data: {
          name: nome,
          email: email,
          adress: endereco,
          phoneNumber: telefone,
        },
      },
    });

    if (error) {
      setError(true);
    } else {
      refetch();
      ui.hide("modal", `${action}-cliente`);
    }
  }

  return (
    <form action="" className="flex flex-col gap-4">
      <Input
        title="Nome"
        field="nome"
        id="nome"
        required
        placeholder="Nome completo"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <Input
        title="Email"
        field="email"
        id="email"
        required
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        title="Endereco"
        field="endereco"
        id="endereco"
        required
        placeholder="Endereço"
        type="text"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />

      <Input
        title="Telefone"
        field="telefone"
        id="telefone"
        required
        placeholder="Telefone"
        type="text"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      {error && (
        <p className="text-red-500">Não foi possível salvar o cliente.</p>
      )}

      <div className="flex justify-end gap-2">
        <Button
          color="yellow"
          title="Cancelar"
          type="button"
          onClick={() => ui.hide("modal", `${action}-cliente`)}
        />
        <Button
          color="green"
          title="Salvar"
          type="submit"
          onClick={onSave}
          disable={!nome || !email}
        />
      </div>
    </form>
  );
};
