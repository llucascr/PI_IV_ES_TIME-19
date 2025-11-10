import { Button, Input } from "components";
import { config } from "config";
import { useUI } from "context";
import { useCookie } from "hooks";
import { useEffect, useState } from "react";
import { apiFetch, getOrganizacao, saveOrganizacao } from "utils";

export const FormConfiguracao = () => {
  const ui = useUI();
  const { setCookie, getCookie } = useCookie();

  const [token, setToken] = useState<string>(
    getCookie(config.tokenCookieNome) || ""
  );

  const [organizacaoId, setOrganizacaoId] = useState<React.Key>("");

  async function handleBuscarOrganizacao(e: any) {
    e.preventDefault();

    const { data, error } = await apiFetch({
      url: config.apiUrl + "/organization/listById",
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: { organizationId: organizacaoId },
      },
    });

    if (error) {
      console.log(error);
    } else {
      saveOrganizacao(data);

      ui.hide("sidebar", "configuracao-safratech");
    }
  }

  useEffect(() => {
    const org = getOrganizacao();
    if (org) {
      setOrganizacaoId(org.id);
    }
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      <form action="" className="flex flex-col gap-3">
        <Input
          placeholder="Token"
          field="token"
          title="Digite o token"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <Button
          color="blue"
          title="Adicionar Token"
          type="submit"
          onClick={() => {
            setCookie(config.tokenCookieNome, token, 5);
          }}
          disable={!token}
        />
      </form>

      <hr />

      <form action="" className="flex flex-col gap-3">
        <Input
          placeholder="Organização ID"
          field="organizacaoId"
          title="Digite o ID da Organização"
          type="text"
          value={String(organizacaoId)}
          onChange={(e) => setOrganizacaoId(e.target.value)}
        />

        <Button
          color="blue"
          title="Adicionar Organização ID"
          type="submit"
          onClick={handleBuscarOrganizacao}
          disable={!organizacaoId}
        />
      </form>

      <pre>{JSON.stringify(getOrganizacao(), null, 2)}</pre>
    </div>
  );
};
