import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Button, Input } from "components";
import { config } from "config";
import { useUI } from "context";
import { useState } from "react";
import type { UsuarioType } from "types";
import { apiFetch, getOrganizacao } from "utils";

export const FormUsuario = ({
  action,
  refetch,
  usuario,
}: {
  action: "update" | "create";
  refetch: () => void;
  usuario?: UsuarioType;
}) => {
  const ui = useUI();
  const [viewEye, setViewEye] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>(usuario?.name || "");
  const [email, setEmail] = useState<string>(usuario?.email || "");
  const [password, setPassword] = useState<string>("");
  const [cpf, setCpf] = useState<string>(usuario?.cpf || "");

  async function onSave(e: any) {
    e.preventDefault();

    const { error } = await apiFetch({
      url: `${config.apiUrl}${
        action === "create" ? "/auth/register" : "/user/" + action
      }`,
      options: {
        method: action === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        params: usuario ? { userId: usuario.id } : {},
        data: {
          name,
          email,
          password,
          cpf,
          organizationCnpj: getOrganizacao()?.cnpj,
        },
      },
    });

    if (error) {
      setError(true);
    } else {
      refetch();

      ui.hide("modal", `${action}-usuario`);
    }
  }

  return (
    <form action="" className="flex flex-col gap-4">
      <Input
        title="Nome"
        field="nome"
        id="nome"
        required
        placeholder="Nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        title="Email"
        field="email"
        id="email"
        required
        placeholder="example@safratech.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        title="CPF"
        field="cpf"
        id="cpf"
        required
        placeholder="000.000.000-00"
        type="text"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />

      <Input
        title="Senha"
        field="senha"
        id="senha"
        required={action === "create"}
        placeholder="*********"
        type={viewEye ? "text" : "password"}
        icon={
          <span
            className="flex justify-around items-center"
            onClick={() => setViewEye(!viewEye)}
          >
            {viewEye ? <EyeSlash size={22} /> : <Eye size={22} />}
          </span>
        }
        iconPosition="left"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500">Não foi possível salvar a usuario.</p>
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
          disable={
            !name ||
            !email ||
            !cpf ||
            (action === "create" && password.length < 8)
          }
        />
      </div>
    </form>
  );
};
